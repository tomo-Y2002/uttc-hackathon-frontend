import React from "react";
import { PageLinks } from "../PageLinks";
import { LogoName } from "../BaseComponent/LogoName";
import { SignInInfo } from "../SignInInfo";
import { useAuthContext } from '../../feature/auth/provider/AuthProvider';
import "./style.css";

export const Header = (): JSX.Element => {
  const { user } = useAuthContext();

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
          {user ? (
            <SignInInfo 
              email={user.displayName || user.email || '匿名ユーザー'}
              state="signed-in"
            />
          ) : (
            <SignInInfo 
              email="test@test.com"
              state="signed-out"
            />
          )}
        </div>
      </div>
    </div>
  );
};