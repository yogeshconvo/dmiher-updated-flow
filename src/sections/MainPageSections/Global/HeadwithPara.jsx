import React from "react";
import { Link } from "react-router-dom";

function HeadwithPara({ data }) {
  const { title, description, centres, title2,extra_button=[] } = data;

  return (
    <section className="container">
    {title && <h2 className="heading">
        <hr className="heading-line" />
        {title.toUpperCase()}
      </h2>}

      {description && <p className="center-description">
        {description}
      </p>}

      {centres && <div className="centers-list">
        {centres.map((item, index) => (
          <p key={index} className="centers-item">
            {item}
          </p>
        ))}
      </div>}
      {title2 && <h2 className="heading">
        <hr className="heading-line" />
        {title2.toUpperCase()}
      </h2>}
          {extra_button.length > 0 &&
          <button className="center-extra-btn">
         {extra_button.map((item, index) => (
          <Link key={index} to={item.path}>{item.title}</Link>
         ))}
      
          </button>
          }
    </section>
  );
}

export default HeadwithPara;
