import React from "react";
import { Logo } from "../Logo";
import "./style.css";


export const LogoName = (): JSX.Element => {
  return (
    <div className={`logo-name `}>
      <Logo />
      <div data-theme="light" className={`text-wrapper`}>KnowledgeBase</div>
    </div>
  );
};
