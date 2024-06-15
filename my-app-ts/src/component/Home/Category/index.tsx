import React from "react";
import { Switch } from "../../BaseComponent/Switch";
import "./style.css";


export const Category = (): JSX.Element => {
  return (
    <div className="div-wrapper">
      <div className="text-wrapper">カテゴリ</div>
      <div className="frame">
        <Switch
          label="Blog"
          size="md"
          stateProp="pressed"
          type="secondary"
        />
        <Switch
          label="Book"
          size="md"
          stateProp="enabled"
          type="secondary"
        />
        <Switch
          label="Video"
          size="md"
          stateProp="enabled"
          type="secondary"
        />
      </div>
    </div>
  );
};