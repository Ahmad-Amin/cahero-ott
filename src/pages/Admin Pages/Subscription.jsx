import React from 'react'
import { Box } from '@mui/material'

const drawerWidth = 280;

const Subscription = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#101011",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >

       
      </Box>
    </>
  )
}

export default Subscription
