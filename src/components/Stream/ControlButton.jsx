// ControlButton.js
import React from 'react';
import { Button } from '@mui/material';
import { Icon } from '@mui/material'; // Import Icon component for Material Icons

const ControlButton = ({ onClick, label, icon, isActive }) => {
  return (
    <Button
    className="h-16"
      variant="contained"
      color={isActive ? 'primary' : 'secondary'}
      onClick={onClick}
      sx={{
        margin: '0 5px',
        padding: '10px 15px',
        display: 'flex', // Use flex to align icon and text
        alignItems: 'center', // Center items vertically
      }}
    >
      {icon && <Icon sx={{ marginRight: '5px' }}>{icon}</Icon>} {/* Display icon */}
      {label} {/* Display button label */}
    </Button>
  );
};

export default ControlButton;
