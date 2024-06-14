import PropTypes from "prop-types";
import React from "react";
import { Button } from "../BaseComponent/Button";
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
          />
        </>
      )}

      {state === "signed-out" && (
        <>
          <Button
            label="SignIn"
            size="md"
            stateProp="enabled"
            type="primary"
          />
          <Button
            label="SignUp"
            size="md"
            stateProp="enabled"
            type="secondary"
          />
        </>
      )}

      {state === "signing-in" && (
        <>
          <Button
            label="SignUp"
            size="md"
            stateProp="enabled"
            type="secondary"
          />
        </>
      )}
      
      {state === "signing-up" && (
        <>
          <Button
            label="SignIn"
            size="md"
            stateProp="enabled"
            type="primary"
          />
        </>
      )}

     
    </div>
  );
};

SignInInfo.propTypes = {
  email: PropTypes.string,
  state: PropTypes.oneOf(["signed-out", "signing-in", "signing-up", "signed-in"]),
};
