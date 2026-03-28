import React from "react";
import Lottie from "lottie-react";
import loading from "../../public/loading.json";

function Loader() {
  return (
    <div style={{
      width: "120px",
      height: "120px",
      margin: "auto"
    }}>
      <Lottie animationData={loading} loop={true} />
    </div>
  );
}

export default Loader;