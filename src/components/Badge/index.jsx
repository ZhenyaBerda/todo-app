import React from "react";
import classnames from "classnames";

import "./Badge.scss";

const Badge = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={classnames("badge", { [`badge--${color}`]: color }, className)}
  ></i>
);

export default Badge;
