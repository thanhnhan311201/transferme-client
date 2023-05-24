import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AlertMessage from "../../features/authentication/views/AlertMessage";

import Header from "./components/Header";

const ScreenAuthentication: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className="relative">
        <AnimatePresence>
          <AlertMessage />
          <div className="flex justify-center items-center pt-10">
            <Outlet />
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ScreenAuthentication;
