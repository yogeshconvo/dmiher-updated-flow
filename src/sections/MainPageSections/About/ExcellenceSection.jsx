
import React from "react";

function ExcellenceSection({ data }) {
  const { title, intro, highlight, pillars = [] } = data || {};

  return (
    <section className="excellence-wrapper">
      <h1 className="excellence-title">
        {title?.split("").map((line, i) => (
          <span key={i}>
            {line.trim()}
            {i === 0 && <br />}
          </span>
        ))}
      </h1>

      <p className="excellence-intro">{intro}</p>

      <div className="excellence-highlight">
        <h2 className="excellence-highlight-title">{highlight?.title}</h2>
        <p className="excellence-highlight-sub">{highlight?.subtitle}</p>
      </div>
      
<div className="excellence-grid">
  {pillars?.map((item, i) => (
    <div key={i} className="excellence-card">
      <h3
        className="excellence-card-title"
        style={{ color: item.color }}
      >
        {item.title}
      </h3>
      <p className="excellence-card-desc">{item.desc}</p>
    </div>
  ))}
</div>

    </section>
  );
}

export default ExcellenceSection;
