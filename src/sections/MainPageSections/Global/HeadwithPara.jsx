import React from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";

function UniversalSection({ data }) {

  const header = data?.header?.[0];

  const title = header?.heading;
  const description = header?.desc;

  return (
    <section className="container">

      {title && (
        <h2 className="heading">
          <hr className="heading-line" />
          {title.toUpperCase()}
        </h2>
      )}

      {description && (
        <RichTextRenderer
          className="center-description"
          html={description}
        />
      )}

    </section>
  );
}

export default UniversalSection;