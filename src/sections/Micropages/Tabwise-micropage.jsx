import React, { useState } from "react";

/* ================= SIMPLE LIGHTWEIGHT JSON ================= */

const data = {
  tabs: [
    {
      slug: "equal-opportunity-cell",
      title: "Equal Opportunity Cell",
      content_flow: [
        {
          type: "heading",
          value: "Equal Opportunity Cell",
        },
        {
          type: "paragraph",
          value:
            "<p>The Equal Opportunity Cell ensures inclusive growth and equal access to opportunities for all students and staff.</p>",
        },
      ],
    },

    {
      slug: "training-placement-cell",
      title: "Training & Placement Cell",
      content_flow: [
        {
          type: "heading",
          value: "Training and Placement Cell",
        },
        {
          type: "dean_section",
          value: {
            name: "Dr. (Mrs.) Sonali Choudhari Deshmukh",
            designation: "Dean, JNMC & AVBRH, DMIHER",
            qualifications: "MBBS, MD, MPhil (HPE), FAIMER",
            email: "dean.jnmc@dmiher.edu.in",
            image:
              "https://convomax.com/admin_dmiher/storage/micropages/9503a50c-97c8-4995-a354-12ebb8e3513c.jpg",
            message:
              "<p>The Training and Placement Cell prepares students for professional careers and ensures strong industry interaction.</p>",
          },
        },
      ],
    },

    {
      slug: "anti-ragging-cell",
      title: "Anti Ragging Cell",
      content_flow: [
        {
          type: "heading",
          value: "Anti Ragging Cell",
        },
        {
          type: "paragraph",
          value:
            "<p>The Anti Ragging Cell ensures a safe and harassment-free campus environment.</p>",
        },
        {
          type: "table",
          value: {
            thead: ["Name", "Role"],
            tbody: [
              ["Dr. A. Kumar", "Chairperson"],
              ["Prof. S. Sharma", "Member"],
            ],
          },
        },
      ],
    },
  ],
};

/* ================= MAIN COMPONENT ================= */

const TabwiseMicropage = () => {
  const [activeSlug, setActiveSlug] = useState(data.tabs[0].slug);

  const activeTab = data.tabs.find((tab) => tab.slug === activeSlug);

  return (
    <div className="py-10">

      {/* ================= TABS ================= */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center px-4 mb-8">
        {data.tabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setActiveSlug(tab.slug)}
            className={`text-sm font-medium px-4 py-2 rounded-md border transition-all duration-200 ${
              activeSlug === tab.slug
                ? "bg-[#F04E30] text-white border-[#F04E30]"
                : "bg-gray-100 text-black border-gray-300 hover:bg-[#112a62] hover:text-white"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-4">
        {activeTab?.content_flow.map((item, index) => {
          const key = `${item.type}-${index}`;

          switch (item.type) {
            case "heading":
              return (
                <h2 key={key} className="text-2xl font-semibold mb-4">
                  {item.value}
                </h2>
              );

            case "paragraph":
              return (
                <div
                  key={key}
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              );

            case "dean_section":
              return (
                <div
                  key={key}
                  className="grid md:grid-cols-2 gap-8 mb-10"
                >
                  <div>
                    <img
                      src={item.value.image}
                      alt={item.value.name}
                      className="rounded-lg mb-4 w-full"
                    />
                    <h3 className="font-semibold text-lg">
                      {item.value.name}
                    </h3>
                    <p>{item.value.designation}</p>
                    <p>{item.value.qualifications}</p>
                    <p>{item.value.email}</p>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.value.message,
                    }}
                  />
                </div>
              );

            case "table":
              return (
                <div key={key} className="overflow-x-auto mb-8">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr>
                        {item.value.thead.map((head, i) => (
                          <th
                            key={i}
                            className="border px-4 py-2 bg-gray-100"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.value.tbody.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className="border px-4 py-2"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default TabwiseMicropage;