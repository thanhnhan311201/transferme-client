export class StreamReceiver {
  // MAP<fileId, Controller>

  constructor(
    private controller: ReadableStreamDefaultController | undefined
  ) {}

  download = (blob: File) => {
    const url = URL.createObjectURL(blob);

    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = blob.name;

    downloadLink.click();

    URL.revokeObjectURL(url);
  };

  concatChunkAndDownloadFile(file: {
    fileData: ArrayBuffer;
    fileName: string;
    fileType: string;
    fileSize: number;
    countChunkId: number;
    totalChunk: number;
  }) {
    if (this.controller) {
      this.controller.enqueue(new Uint8Array(file.fileData));
      if (file.countChunkId === file.totalChunk) {
        this.controller.close();
        this.controller = undefined;
      }
    } else {
      (async () => {
        const newStream = new ReadableStream<Uint8Array>({
          start: (_controller) => {
            this.controller = _controller;
            _controller.enqueue(new Uint8Array(file.fileData));

            if (file.countChunkId === file.totalChunk) {
              this.controller.close();
              this.controller = undefined;
            }
          },
        });

        const headers = new Headers();
        headers.set("content-type", file.fileType);
        headers.set("content-length", file.fileSize.toString());
        const response = new Response(newStream, { headers });
        const blob = await response.blob();
        const newFile = new File([blob], file.fileName, {
          type: file.fileType,
        });

        this.download(newFile);
      })();
    }
  }
}

const streamReceiver = new StreamReceiver(undefined);

export default streamReceiver;
