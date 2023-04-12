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
