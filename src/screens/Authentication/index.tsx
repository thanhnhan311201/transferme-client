import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";

const ScreenAuthentication: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center pt-10">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
    </>
  );
};

export default ScreenAuthentication;
