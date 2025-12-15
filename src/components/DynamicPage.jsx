// src/components/DynamicPage.jsx
import { useParams } from "react-router-dom";
import Page from "./Page";

function DynamicPage({ pages }) {
  const { slug } = useParams();

  console.log("URL slug:", slug);
  console.log("pages:", pages);

  const page = pages.find((p) => p.slug === slug);

  return <Page page={page} />;
}

export default DynamicPage;
