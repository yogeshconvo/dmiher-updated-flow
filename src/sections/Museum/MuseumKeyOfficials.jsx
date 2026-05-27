import React from "react";
import SafeImage from "../../components/SafeImage";
import { resolveImage } from "../../utils/resolveImage";

/**
 * Museum — Key Officials cards.
 *
 * Data shape (section_key: museum_key_officials)
 *   {
 *     heading: "Key Officials",
 *     officials: [
 *       { image, name, designation, institution, email }
 *     ]
 *   }
 */
export default function MuseumKeyOfficials({ data }) {
  if (!data) return null;
  const { heading, officials = [] } = data;
  if (!officials.length) return null;

  return (
    <section className="museum-key-officials">
      <div className="container">
        {heading && (
          <h2 className="museum-key-officials-heading">
            <hr className="museum-key-officials-line" />
            {heading}
          </h2>
        )}

        <div className="museum-key-officials-grid">
          {officials.map((o, idx) => (
            <div key={idx} className="museum-key-officials-card">
              {o.image && (
                <SafeImage
                  src={resolveImage(o.image)}
                  alt={o.name || "official"}
                  className="museum-key-officials-img"
                />
              )}
              {o.name && (
                <h3 className="museum-key-officials-name">{o.name}</h3>
              )}
              {(o.designation || o.institution) && (
                <p className="museum-key-officials-meta">
                  {o.designation}
                  {o.designation && o.institution && <br />}
                  {o.institution}
                </p>
              )}
              {o.email && (
                <p className="museum-key-officials-email">
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
