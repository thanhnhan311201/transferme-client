export class StreamReceiver {
  // MAP<fileId, Controller>

  constructor(
    private _controller: ReadableStreamDefaultController<Uint8Array> | undefined
  ) {}

  downloadFile = (blob: File) => {
    const url = URL.createObjectURL(blob);

    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = blob.name;

    downloadLink.click();

    URL.revokeObjectURL(url);
  };

  get controller(): ReadableStreamDefaultController<Uint8Array> | undefined {
    return this._controller;
  }

  set controller(
    newController: ReadableStreamDefaultController<Uint8Array> | undefined
  ) {
    this._controller = newController;
  }
}

const streamReceiver = new StreamReceiver(undefined);

export default streamReceiver;
