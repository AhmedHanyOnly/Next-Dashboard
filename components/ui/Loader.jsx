import { SpinLoader } from "react-loadly";
import "react-loadly/styles.css";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SpinLoader
        color="#ff8080"
        size={100}
        speed={1}
        loadingText="" // خلي نص يظهر
      />
    </div>
  );
};
