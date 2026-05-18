import Lottie from "lottie-react";
import loading from "../../public/loading.json";

function Loader() {
  return (
    <div className="flex-center-py">
      <div className="loader-lottie">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
}

export default Loader;
