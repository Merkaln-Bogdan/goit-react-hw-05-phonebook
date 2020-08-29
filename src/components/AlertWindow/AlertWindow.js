import React from "react";
import styleAlert from "./AlertWindow.module.css";
import PropTypes from "prop-types";
const AlertWindow = ({ alert }) => {
  return (
    <div className={styleAlert.Alert}>
      <span className={styleAlert.AlertMessage}>{alert}</span>
    </div>
  );
};

export default AlertWindow;
AlertWindow.propTypes = {
  alert: PropTypes.string,
};
