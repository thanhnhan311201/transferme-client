class StreamSlicer implements Transformer<Uint8Array, Uint8Array> {
	private chunkSize: number;
	private offset: number;
	private partialChunk: Uint8Array;

	constructor(chunkSize: number) {
		this.chunkSize = chunkSize;
		this.partialChunk = new Uint8Array(this.chunkSize); //where partial chunks are saved
		this.offset = 0;
	}

	private send(
		buffer: Uint8Array,
		controller: TransformStreamDefaultController
	) {
		controller.enqueue(buffer);
		this.partialChunk = new Uint8Array(this.chunkSize);
		this.offset = 0;
	}

	//reslice input into record sized chunks
	transform(chunk: Uint8Array, controller: TransformStreamDefaultController) {
		let i = 0;

		if (this.offset > 0) {
			const len = Math.min(chunk.byteLength, this.chunkSize - this.offset);
			this.partialChunk.set(chunk.slice(0, len), this.offset);
			this.offset += len;
			i += len;

			if (this.offset === this.chunkSize) {
				this.send(this.partialChunk, controller);
			}
		}

		while (i < chunk.byteLength) {
			const remainingBytes = chunk.byteLength - i;
			if (remainingBytes >= this.chunkSize) {
				const record = chunk.slice(i, i + this.chunkSize);
				i += this.chunkSize;
				this.send(record, controller);
			} else {
				const end = chunk.slice(i, i + remainingBytes);
				i += end.byteLength;
				this.partialChunk.set(end);
				this.offset = end.byteLength;
			}
		}
	}

	flush(controller: TransformStreamDefaultController) {
		if (this.offset > 0) {
			controller.enqueue(this.partialChunk.slice(0, this.offset));
		}
	}
}

export default StreamSlicer;

// FILE: Bình
// File.stream => rót nước đi
// File.stream().pipe(new StreamSlicer(1MB)).pipe(lọc nước).pipe(pepsi).pipe(dong chai)

//

// 101010101000100001000100000001111100010101010101010100000101010101010
