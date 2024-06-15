import PropTypes from "prop-types";
import React from "react";
import { Button } from "../../BaseComponent/Button";
import { Link } from "react-router-dom"
import { handleSignOut } from "../../../feature/auth/SignOut";
import "./style.css";

interface Props {
  email: string;
  state: "signed-out" | "signing-in" | "signing-up" | "signed-in";
}

export const SignInInfo = ({
  email,
  state
}: Props): JSX.Element => {
  return (
    <div className={`sign-in-information`}>
      {state === "signed-in" && (
        <>
          <div className={`email`}>{email}</div>
          <Button
            label="SignOut"
            size="md"
            stateProp="pressed"
            type="secondary"
            onClick={handleSignOut}
          />
        </>
      )}

      {state === "signed-out" && (
        <>
          <Link to="/signin">
            <Button
              label="SignIn"
              size="md"
              stateProp="enabled"
              type="primary"
            />
          </Link>
          <Link to="/signup">
            <Button
              label="SignUp"
              size="md"
              stateProp="enabled"
              type="secondary"
            />
          </Link>
        </>
      )}

      {state === "signing-in" && (
        <Link to="/signup">
          <Button
            label="SignUp"
            size="md"
            stateProp="enabled"
            type="secondary"
          />
        </Link>
      )}
      
      {state === "signing-up" && (
        <Link to="/singin">
          <Button
            label="SignIn"
            size="md"
            stateProp="enabled"
            type="primary"
          />
        </Link>
      )}

     
    </div>
  );
};

SignInInfo.propTypes = {
  email: PropTypes.string,
  state: PropTypes.oneOf(["signed-out", "signing-in", "signing-up", "signed-in"]),
};
