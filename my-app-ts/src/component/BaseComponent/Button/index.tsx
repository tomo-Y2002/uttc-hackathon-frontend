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
}

interface ButtonState {
  type: string;
  size: string;
  state: string;
}

export const Button = ({ label = "ボタンラベル", type, size, stateProp, onClick }: Props): JSX.Element => {
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
      onMouseDown={() => dispatch("mouse_down")}
      onMouseUp={() => dispatch("mouse_up")}
      onClick={onClick}
      type="button"
    >
      <div className={"label"}>
        {label}
      </div>
    </button>
  );
};

function reducer(state: ButtonState, action: string) {
  switch (action) {
    case "mouse_enter":
      return { ...state, state: "hovered" }; // 既存のstateを ...stateで読み込む
    case "mouse_leave":
      return { ...state, state: "enabled" };
    case "mouse_down":
      return { ...state, state: "pressed"}
    case "mouse_up":
      return { ...state, state: "hovered"}
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
