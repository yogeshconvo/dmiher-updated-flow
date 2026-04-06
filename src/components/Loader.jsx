import Lottie from "lottie-react";
import loading from "../../public/loading.json";

function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-[120px] h-[120px]">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
}

export default Loader;
