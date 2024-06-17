import React from "react";
import { Logo } from "../Logo";
import { Link } from "react-router-dom"
import "./style.css";


export const LogoName = (): JSX.Element => {
  return (
    <div className={`logo-name `}>
      <Logo />
      <Link to="/">
        <div data-theme="light" className={`text-wrapper`}>KnowledgeBase</div>        
      </Link>
    </div>
  );
};
