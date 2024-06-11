export class Receiver {
	private static instance: Receiver | null = null;
	private _receiver: string = '';

	private constructor() {}

	public static getInstance() {
		if (Receiver.instance === null) {
			Receiver.instance = new Receiver();
		}

		return Receiver.instance;
	}

	get receiver() {
		return this._receiver;
	}

	set receiver(newDevice: string) {
		this._receiver = newDevice;
	}
}
