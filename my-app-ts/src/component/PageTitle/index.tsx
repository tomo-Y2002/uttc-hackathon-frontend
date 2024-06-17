import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  label: string;
}

export const PageTitle = ({label}: Props): JSX.Element => {
  return (
    <div className="kb">
      <div className="container-middle">
        <div className="container-height">
          <div className="text-wrapper">{label}</div>
        </div>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  label: PropTypes.string,
};
