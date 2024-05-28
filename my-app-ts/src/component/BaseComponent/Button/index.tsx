import React from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";
import "./style.css";

interface Props {
  label: string;
  type: "primary" | "secondary";
  size: "md" | "sm";
  stateProp: "enabled" | "focused" | "pressed" | "hovered" | "disabled";
}

export const Button = ({ label = "ボタンラベル", type, size, stateProp }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "primary",
    size: size || "md",
    state: stateProp || "enabled",
  });

  return (
    <button
      className={`button ${state.size} ${state.state} ${state.type}`}
      onMouseEnter={() => dispatch("mouse_enter")}
      onMouseLeave={() => dispatch("mouse_leave")}
      type="button"
    >
      {label}
    </button>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return { ...state, state: "hovered" };
    case "mouse_leave":
      return { ...state, state: "enabled" };
    default:
      return state;
  }
}

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["md", "sm"]),
  stateProp: PropTypes.oneOf(["enabled", "focused", "pressed", "hovered", "disabled"]),
};
