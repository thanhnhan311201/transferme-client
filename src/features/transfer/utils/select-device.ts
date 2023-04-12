class DeviceOption {
  constructor(private _device: string) {}

  get device() {
    return this._device;
  }

  set device(newDevice: string) {
    this._device = newDevice;
  }
}

const deviceInstance = new DeviceOption("");

export default deviceInstance;
