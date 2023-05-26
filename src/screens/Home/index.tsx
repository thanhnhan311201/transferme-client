import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "./components/Header";

import HomePage from "../../images/home-page.png";

const ScreenHome: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white to-primary-color--tint-1 w-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1 h-auto bg-inherit">
        <div className="flex justify-center">
          <div className="grid grid-cols-2-for-home px-24 pt-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="justify-self-start"
            >
              <h1 className="text-5xl mb-14 text-333 font-bold tracking-tight">
                Transfer and take your files to infinity and beyond
              </h1>
              <p className="text-xl mb-36 text-555">
                TransferMe is a simple, fast and secure way to share your data
              </p>
              <Link
                to="/auth/login"
                className="bg-gradient-to-br from-primary-color--tint-8 to-primary-color--shade inline-block text-white text-xl px-8 py-4 rounded-lg font-medium cursor-pointer"
              >
                Start transfering
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="w-85/100 justify-self-end"
            >
              <img
                src={HomePage}
                alt="Transfer file illustration"
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScreenHome;
