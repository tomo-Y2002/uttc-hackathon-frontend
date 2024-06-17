import React from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";
import "./style.css";

interface Props {
  label: string;
  type: "primary" | "secondary";
  size: "md" | "sm";
  stateProp: "enabled" | "focused" | "pressed" | "hovered" | "disabled";
  onClick?: () => void;
  role?: "button" | "submit"; // submitかどうか
}

interface SwitchState {
  type: string;
  size: string;
  state: string;
}

export const Switch = ({ label = "スイッチラベル", type, size, stateProp, onClick, role}: Props): JSX.Element => {
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
      onClick={onClick}
      type={role? role: "button"}
    >
      <div className={"label"}>
        {label}
      </div>
    </button>
  );
};

function reducer(state: SwitchState, action: string) {
  switch (action) {
    case "mouse_enter":
      if (state.state === "enabled") {
        return { ...state, state: "hovered" };
      }
      else {
        return { ...state};
      }
    case "mouse_leave":
      if (state.state === "hovered") {
        return { ...state, state: "enabled" };
      }
      else {
        return { ...state};
      }
    default:
      return state;
  }
}

Switch.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["md", "sm"]),
  stateProp: PropTypes.oneOf(["enabled", "focused", "pressed", "hovered", "disabled"]),
};
