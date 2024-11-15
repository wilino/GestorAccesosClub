import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#b2a429' : '#ffffff',
      })}
    >
      <Typography variant="button" display="block">
        {label}
      </Typography>
    </NavLink>
  );
};

export default NavItem;