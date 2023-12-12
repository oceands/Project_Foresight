import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const RoleGuard = ({ children, requiredRole }) => {
  const { isLoggedIn, Role } = useSelector((state) => state.account);

  // Ensure requiredRoles is an array
  const validRequiredRoles = Array.isArray(requiredRole) ? requiredRole : [];
  console.log(validRequiredRoles);

  // Check if the user's role matches any of the required roles
  const hasRequiredRole = validRequiredRoles.includes(Role);

  if (!isLoggedIn || !hasRequiredRole) {
    return <Redirect to="/401" />;
  }

  return children;
};

RoleGuard.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleGuard;
