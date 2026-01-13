import React from "react";

const MainMicropage = ({ data }) => {
    console.log(data);
    return (
        <div>
            <div className="container">
                <h2 className="headings">{data.title}</h2>
                <p>{data.description}</p>
                <div>
                    <img src={data.image} alt="" />
                </div>
                
            </div>
        </div>
    );
};

export default MainMicropage;
