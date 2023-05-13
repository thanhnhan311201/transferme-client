import { useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";

import { RootState } from "../../states";

import { SOCKET_EVENTS } from "../../socket/config.socket";

import Transfer from "../../features/transfer/views/Transfer";
import ReceivingWindow from "../../features/transfer/views/ReceivingWindow";

const ScreenTransfer: React.FC = () => {
  const transferStatus = useSelector(
    (state: RootState) => state.transfer.transferStatus
  );

  return (
    <div>
      <AnimatePresence>
        {transferStatus !== SOCKET_EVENTS.AVAILABLE &&
          transferStatus !== SOCKET_EVENTS.REFUSE_REQUEST && (
            <ReceivingWindow />
          )}
      </AnimatePresence>
      <Transfer />
    </div>
  );
};

export default ScreenTransfer;
