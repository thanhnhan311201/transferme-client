export class StreamSender implements Transformer<Uint8Array, Uint8Array> {
	constructor(
		private send: (
			chunk: Uint8Array,
			controller: TransformStreamDefaultController,
		) => void,
	) {}

	//reslice input into record sized chunks
	transform(chunk: Uint8Array, controller: TransformStreamDefaultController) {
		this.send(chunk, controller);
	}

	// flush(controller: TransformStreamDefaultController) {}
}

// FILE: Bình
// File.stream => rót nước đi
// File.stream().pipe(new StreamSlicer(1MB)).pipe(lọc nước).pipe(pepsi).pipe(dong chai)

//

// 101010101000100001000100000001111100010101010101010100000101010101010

// 1> gửi được file
// 2> mã hóa file trước khi gửi/ giãi mã khi nhận
//    A -> B
// key => Server => B
// A <=> Server <=> B
//
// thread secure A <=> B
// PubK
// A1 login => A1 gen (PriA) => upload bundle key (PubK + PriA)

// A2 login => A2 gen (PriB) => upload bundle key (PubK + PriB)
//

// Key chung giữa A vs B: PubK + PriB + PriA => session key
// Key chung giữa B vs A: PubK + PriA + PriB => session key

// Lưu session key cho transfer sau

// key => encrypt key với DH => send
//
// DH - exchange key
//
// End-to-end encryption
// E2ee chat
