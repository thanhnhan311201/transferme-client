class CacheFile {
	constructor(private _file: File | null) {}

	get file(): File | null {
		return this._file;
	}

	set file(newFile: File | null) {
		this._file = newFile;
	}
}

const fileInstance = new CacheFile(null);

export default fileInstance;

export class CacheStream {
	private static _instance: CacheStream;
	private controller?: TransformStreamDefaultController;

	private constructor() {}

	static get instance() {
		if (!CacheStream._instance) {
			CacheStream._instance = new CacheStream();
		}

		return CacheStream._instance;
	}

	setController(controller: TransformStreamDefaultController) {
		this.controller = controller;
	}

	getController() {
		return this.controller;
	}
}
