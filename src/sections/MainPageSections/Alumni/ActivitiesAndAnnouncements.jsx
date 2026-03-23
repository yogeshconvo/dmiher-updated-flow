import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ActivitiesAndAnnouncements = ({ data }) => {
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  return (
    <section
      className="py-8 sm:py-10"
      style={{ backgroundColor: data?.basic?.bg_color || "#fee8d2" }}
    >
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-[500] text-[#707070] tracking-wider mb-6">
          <hr className="w-12 sm:w-20 border-[#F04E30] mb-3 border-t-4" />
          {data?.basic?.title || "ACTIVITIES AND ANNOUNCEMENTS"}
        </h2>

        <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
          <SwiperSlide>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* News */}
              <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#001c54]">News</h3>
                  <button
                    onClick={() => setIsNewsModalOpen(true)}
                    className="text-[#f2542d] text-sm font-semibold hover:underline"
                  >
                    VIEW ALL
                  </button>
                </div>

                {data?.news?.map((item, idx) => (
                  <div key={idx} className="mb-4 border-b pb-2">
                    <p className="text-sm text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                ))}
              </div>

              {/* Events */}
              <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#001c54]">Events</h3>
                  <button
                    onClick={() => setIsEventsModalOpen(true)}
                    className="text-[#f2542d] text-sm font-semibold hover:underline"
                  >
                    VIEW ALL
                  </button>
                </div>

                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000 }}
                  loop
                >
                  {data?.events?.map((event, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={event.image}
                        alt="event"
                        className="w-full h-60 object-cover rounded-lg mb-3"
                      />
                      <p className="text-sm text-gray-700">
                        {event.description}
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>
          </SwiperSlide>
        </Swiper>

        {/* News Modal */}
        {isNewsModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">All News</h3>
              {data?.news?.map((item, idx) => (
                <div key={idx}>
                  <p>{item.title}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Modal */}
        {isEventsModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">All Events</h3>
              {data?.events?.map((event, idx) => (
                <div key={idx}>
                  <img src={event.image} className="rounded mb-2" />
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ActivitiesAndAnnouncements;