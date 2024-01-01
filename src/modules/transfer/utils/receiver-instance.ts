class Receiver {
  constructor(private _receiver: string) {}

  get receiver() {
    return this._receiver;
  }

  set receiver(newDevice: string) {
    this._receiver = newDevice;
  }
}

const receiverInstance = new Receiver("");

export default receiverInstance;
