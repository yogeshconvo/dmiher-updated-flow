import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MainMicropage from "./Main-micropage";

const MicropageLoader = () => {

  const { slug } = useParams();

  // backend call here
  return <MainMicropage slug={slug} />;
};

export default MicropageLoader;