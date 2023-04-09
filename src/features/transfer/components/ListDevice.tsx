import React from "react";
import { IconContext } from "react-icons";
import { BsCircleFill } from "react-icons/bs";

const ListDevice: React.FC<{
  devices: { picture: string; socketId: string }[];
}> = (props) => {
  return (
    <div className="overflow-hidden p-4 pt-0">
      <div className="w-full rounded-xl p-4 bg-edf2fc">
        <div className="flex flex-col w-full gap-3">
          <div className="border-b border-solid border-3c4043">
            <span className="text-3c4043 font-medium text-xl">List Device</span>
          </div>
          <div>
            {props.devices.length === 0 ? (
              <p className="text-sm">No device found.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {props.devices.map((device) => (
                  <li key={device.socketId}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 relative">
                        <img
                          className="rounded-full w-full z-0"
                          src={device.picture}
                          alt="User avatar"
                          referrerPolicy="no-referrer"
                        />
                        <IconContext.Provider
                          value={{
                            style: {
                              position: "absolute",
                              width: "0.75rem",
                              height: "0.75rem",
                              color: "#46ab5e",
                              bottom: -2,
                              right: -2,
                              zIndex: 100,
                              border: "2px solid #fff",
                              borderRadius: "50%",
                            },
                          }}
                        >
                          <BsCircleFill />
                        </IconContext.Provider>
                      </div>
                      <div className="text-3c4043 font-medium text-sm py-2">
                        <span>{device.socketId}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDevice;
