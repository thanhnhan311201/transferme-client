export class StreamReceiverService {
	// MAP<fileId, Controller>
	private static instance: StreamReceiverService | null = null;
	private _controller: ReadableStreamDefaultController<Uint8Array> | null =
		null;

	private constructor() {}

	public static getInstance(): StreamReceiverService {
		if (!StreamReceiverService.instance) {
			StreamReceiverService.instance = new StreamReceiverService();
		}

		return StreamReceiverService.instance;
	}

	downloadFile = (blob: File) => {
		const url = URL.createObjectURL(blob);

		const downloadLink: HTMLAnchorElement = document.createElement('a');
		downloadLink.href = url;
		downloadLink.download = blob.name;

		downloadLink.click();

		URL.revokeObjectURL(url);
	};

	get controller(): ReadableStreamDefaultController<Uint8Array> | null {
		return this._controller;
	}

	set controller(
		newController: ReadableStreamDefaultController<Uint8Array> | null,
	) {
		this._controller = newController;
	}
}
