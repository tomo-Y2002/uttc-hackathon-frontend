import React from "react";
import { PageLinks } from "../PageLinks";
import { LogoName } from "../BaseComponent/LogoName";
import { SignInInfo } from "../SignInInfo";
import "./style.css";

export const HeaderNew = (): JSX.Element => {
  return (
    <div className="kb-header">
      <div className="container-middle">
        <div className="container-logoname">
          <LogoName />
        </div>
        <div className="container-pagelinks">
          <PageLinks/>
        </div>
        <div className="container-signininfo">
          <SignInInfo 
              email="test@test.com"
              state="signed-out"
          />
        </div>
      </div>
    </div>
  );
};