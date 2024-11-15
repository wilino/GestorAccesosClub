import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ label, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        sx={{ color: '#ffffff', textTransform: 'none' }}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              navigate(item.to);
              handleMenuClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;