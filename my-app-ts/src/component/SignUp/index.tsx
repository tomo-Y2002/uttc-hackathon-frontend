import React from "react";
import { Button } from "../BaseComponent/Button";
import { Input } from "../BaseComponent/Input";
import { useSignUp } from "../../hooks/useSignUp";
import "./style.css";

export const SignUp = (): JSX.Element => {
  const {email, setEmail, password, setPassword, handleSubmit} = useSignUp();

  return (
    <div className="kb-body-signin">
      <form onSubmit={handleSubmit} className="container">
        <div className="email-password">
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-in">
          <Button 
            label="SignUp"
            size="md"
            type="primary"
            stateProp="enabled"
            role="submit"
          />
        </div>
      </form>
    </div>
  );
};