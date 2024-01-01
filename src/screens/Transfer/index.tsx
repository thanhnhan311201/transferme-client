import { AnimatePresence } from "framer-motion";

import { useAppSelector } from "@/states";

import Transfer from "@/modules/transfer/views/Transfer";
import ReceivingWindow from "@/modules/transfer/views/ReceivingWindow";

import { SOCKET_EVENTS } from "@/socket/config.socket";

const ScreenTransfer: React.FC = () => {
  const { transferStatus } = useAppSelector((state) => state.transfer);

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
