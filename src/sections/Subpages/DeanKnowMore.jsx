import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { API_BASE } from "../../config/api";
import SafeImage from "../../components/SafeImage";

function KnowMore({ data: propData, college: propCollege }) {
  const params = useParams();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Derive pageSlug and cta_key from URL path or props
  const pageSlug = params.college || propCollege || pathSegments[0];
  const cta_key = params.page || pathSegments[1];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState("");

  // If data is passed as prop (from PageView), transform and use it directly
  useEffect(() => {
    if (propData) {
      const formatted = buildFormattedData(propData);
      if (formatted) setData(formatted);
      setLoading(false);
    }
  }, [propData]);

  // Fetch from API only when no prop data is provided
  useEffect(() => {
    if (propData || !pageSlug || !cta_key) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${API_BASE}/api/micropage/${pageSlug}/${cta_key}`
        );

        if (!res.ok) {
          throw new Error("API Error");
        }

        const json = await res.json();
        const sectionData = json?.sections?.[0]?.data || {};
        const formatted = buildFormattedData(sectionData);

        if (formatted) {
          setData(formatted);
        } else {
          setError("No data available");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageSlug, cta_key, propData]);

  function buildFormattedData(raw) {
    // Handle both direct section data and nested micro_pages format
    const page = raw?.micro_pages?.[0] || raw;
    const content = page?.content || page;

    if (!content) return null;

    return {
      heading: page?.title || content?.title || "Know More",
      dean: {
        name: content?.leader?.name || "",
        designation: content?.leader?.designation || "",
        qualifications: content?.leader?.qualification || content?.leader?.designation || "",
        email: content?.leader?.email || "",
        image: content?.leader?.image || "/images/dean.jpg",
      },
      message: (content?.description || []).map((item) => item.text || item.desc || ""),
      managementTeam: (content?.officials || []).map((member) => ({
        name: member.name || "",
        designation: member.designation || "",
        qualification: member.qualification || "",
        email: member.email || "",
        image: member.image || "/images/team.jpg",
      })),
    };
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const { heading, dean, message, managementTeam } = data;

  return (
    <section className="knowmore-container container ">
      {/* ===== Heading ===== */}
      <div className="">
        <h2 className="heading">
          <hr className="heading-line"></hr>
          {heading}
        </h2>
      </div>

      {/* ===== Dean Section ===== */}
      <div className="knowmore-dean-layout">
        {/* Image + Info */}
        <div className="knowmore-dean-profile">
          <SafeImage
            src={dean.image}
            alt={dean.name}
            className="knowmore-dean-image"
          />

          <div className="knowmore-dean-info">
            <p className="knowmore-dean-name">{dean.name}</p>
            <p>
              {dean.designation}
              <br />
              {dean.qualifications}
            </p>
            <p>{dean.email}</p>
          </div>
        </div>

        {/* Message */}
        <div className="knowmore-dean-message">
          {message.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* ===== Management Team ===== */}
      {managementTeam.length > 0 && (
        <div className="knowmore-team-wrapper">
          <div className="knowmore-team-grid">
            {managementTeam.map((member, idx) => (
              <div key={idx} className="knowmore-team-card">
                <SafeImage
                  src={member.image}
                  alt={member.name}
                  className="knowmore-team-image"
                />

                <h3 className="knowmore-team-name">{member.name}</h3>

                <p className="knowmore-team-designation">{member.designation}</p>

                <p className="knowmore-team-qualification">
                  {member.qualification}
                </p>

                <p className="knowmore-team-email">{member.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default KnowMore;
