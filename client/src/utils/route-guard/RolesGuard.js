import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// project imports
import config from "../../config";

const RoleGuard = ({ children, requiredRole }) => {
  const account = useSelector((state) => state.account);
  const { isLoggedIn, roles } = account;

  const hasRequiredRole = roles.includes(requiredRole);

  if (!isLoggedIn || !hasRequiredRole) {
    return <Redirect to={config.defaultPath} />;
  }

  return children;
};

RoleGuard.propTypes = {
  children: PropTypes.node,
  requiredRole: PropTypes.string.isRequired,
};

export default RoleGuard;
