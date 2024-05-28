import React from "react";
import "./style.css";


export const PageLinks = (): JSX.Element => {
  return (
    <div className={`container`}>
      <div className="links">
        <div className={`text-wrapper`}>Home</div>
        <div className={`text-wrapper`}>Blog</div>
        <div className={`text-wrapper`}>Book</div>
        <div className={`text-wrapper`}>Video</div>
      </div>
    </div>
  );
};
