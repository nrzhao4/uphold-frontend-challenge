import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

ErrorMessage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footerMessage: PropTypes.string,
};

function ErrorMessage({ title, subtitle, footerMessage }) {
  return (
    <div className="error-message-container">
      {title && <h4 className="title">{title}</h4>}
      {subtitle && <strong>{subtitle}</strong>}
      {footerMessage && <p className="footer-message">{footerMessage}</p>}
    </div>
  );
}

export default ErrorMessage;
