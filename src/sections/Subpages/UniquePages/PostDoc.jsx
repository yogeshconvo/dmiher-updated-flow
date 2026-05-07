import React from "react";
import {
  Calendar,
  FileText,
  Users,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
} from "lucide-react";
import RichTextRenderer from "../../../components/RichTextRenderer";

const firstOf = (val) => {
  if (Array.isArray(val)) return val[0] || {};
  return val || {};
};

const ICONS = {
  graduation: GraduationCap,
  book: BookOpen,
  clock: Clock,
  file: FileText,
  users: Users,
  check: CheckCircle,
};

const Icon = ({ name, ...rest }) => {
  const Cmp = ICONS[name] || Clock;
  return <Cmp {...rest} />;
};

const PostDoc = ({ data }) => {
  const header = firstOf(data?.header);
  const programs = data?.programs || [];
  const importantDates = data?.important_dates || [];
  const eligibilityPoints = data?.eligibility_points || [];
  const pubReq = firstOf(data?.publication_requirements);
  const pubCols = data?.publication_columns || [];
  const applicationProcess = data?.application_process || [];
  const requiredDocs = data?.required_documents || [];
  const selectionProcedure = data?.selection_procedure || [];
  const contact = firstOf(data?.contact);

  return (
    <div className="min-h-screen bg-gray-50 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
      {/* Header */}
      <div className="bg-[#122E5E] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{header.title}</h1>
              {header.subtitle && (
                <p className="text-blue-100 mt-1">{header.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Programs Overview */}
        {programs.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center mb-4">
                    <Icon
                      name={p.icon || "graduation"}
                      className="text-[#F04E30] mr-3"
                      size={32}
                    />
                    <h3 className="text-2xl font-bold text-gray-800">
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-gray-600 leading-relaxed">
                    <RichTextRenderer html={p.description} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Important Dates */}
        {importantDates.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Calendar className="text-[#F04E30] mr-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-800">
                Important Dates
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {importantDates.map((d, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#122E5E] to-[#1E3A8A] text-white p-6 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <Icon name={d.icon || "clock"} className="mr-2" size={20} />
                    <span className="font-semibold">{d.label}</span>
                  </div>
                  <p className="text-xl font-bold">{d.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Eligibility */}
        {(eligibilityPoints.length > 0 ||
          pubReq.heading ||
          pubCols.length > 0) && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Eligibility Requirements
            </h3>
            <div className="space-y-6">
              {eligibilityPoints.map((p, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-[#F04E30] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    {i + 1}
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    <RichTextRenderer html={p.text} />
                  </div>
                </div>
              ))}

              {(pubReq.heading || pubCols.length > 0) && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  {pubReq.heading && (
                    <h4 className="font-bold text-gray-800 mb-4">
                      {pubReq.heading}
                    </h4>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    {pubCols.map((col, i) => (
                      <div key={i}>
                        <h5
                          className={`font-semibold mb-2 ${
                            i === 0 ? "text-[#F04E30]" : "text-[#122E5E]"
                          }`}
                        >
                          {col.label}
                        </h5>
                        <div className="text-gray-700 text-sm leading-relaxed">
                          <RichTextRenderer html={col.description} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Application Process */}
        {applicationProcess.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Application Process
            </h3>
            <div className="space-y-4">
              {applicationProcess.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center hover:bg-gray-50 p-4 rounded-lg transition-colors"
                >
                  <div className="bg-[#F04E30] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    {i + 1}
                  </div>
                  <div className="text-gray-700">
                    <RichTextRenderer html={step.text} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Required Documents */}
        {requiredDocs.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Required Documents
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requiredDocs.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-[#F04E30]/5 transition-colors"
                >
                  <FileText className="text-[#F04E30] mr-3" size={20} />
                  <span className="text-gray-700 text-sm">{doc.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selection Procedure */}
        {selectionProcedure.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Selection Procedure
            </h3>
            <div className="space-y-4">
              {selectionProcedure.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <p className="text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {(contact.office_name ||
          contact.phone ||
          contact.email ||
          contact.address ||
          contact.website) && (
          <section className="bg-gradient-to-r from-[#122E5E] to-[#1E3A8A] text-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {contact.office_name && (
                  <h4 className="text-xl font-semibold mb-4">
                    {contact.office_name}
                  </h4>
                )}
                {contact.address && (
                  <p className="mb-4 leading-relaxed whitespace-pre-line">
                    {contact.address}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {contact.phone && (
                  <div className="flex items-center">
                    <Phone className="mr-3" size={20} />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center">
                    <Mail className="mr-3" size={20} />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.website && (
                  <div className="flex items-center">
                    <Globe className="mr-3" size={20} />
                    <span>{contact.website}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PostDoc;
