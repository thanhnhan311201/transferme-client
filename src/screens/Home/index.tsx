import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "./components/Header";

import illustration from "../../images/5568482_2879879.jpg";

const ScreenHome: React.FC = () => {
  return (
    <div className="bg-primary-color--tint w-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1 h-auto bg-inherit">
        <div className="flex justify-center pt-32">
          <div className="max-w-7xl grid grid-cols-2 gap-24 px-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl mb-8 text-333 font-bold tracking-tight pr-28">
                Transfer and take your files to infinity and beyond
              </h1>
              <p className="text-xl mb-12 text-555 pr-28">
                TransferMe is a simple, fast and secure way to share your data
              </p>
              <Link
                to="/auth/login"
                className="bg-primary-color--shade inline-block text-white text-xl px-8 py-4 rounded-lg font-medium cursor-pointer"
              >
                Start transfering
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={illustration}
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
