import React from 'react'
import { Link } from 'react-router-dom'
function MandatoryDisclosure({data}) {
    const {header,content } = data;
  return (
    <div className=''>
        <div className='container'>
            <h2 className="heading">
              <hr className="heading-line" />
                  {header?.heading}
                  
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex justify-center">
            <Link
              to={content.url}
              className="text-base md:text-xl tracking-wide font-oswald-medium text-gray-600 rounded-md font-[400] hover:bg-blue-100 transition text-center py-2"
            >
              {content.link_text}{" "}
              <span className="font-[400] underline">
                {content.cta_text}
              </span>
            </Link>
          </div>
        </div>
        </div>
    </div>
  )
}

export default MandatoryDisclosure