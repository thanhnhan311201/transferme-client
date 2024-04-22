import Header from "./Header";

const AuthLayout: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <div className="bg-gradient-to-br from-white to-primary-color--tint-1 min-h-screen flex flex-col">
      <Header />
      <div className="relative">
        <div className="flex justify-center items-center pt-10">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
