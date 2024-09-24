import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function WebinarCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        borderRadius: 6,
        height: isMobile ? 300 : 400,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#1c1c1e",
        color: "white",
        border: "2px solid #7a8995",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/images/image.png`}
        alt="Tokyo Train"
        sx={{
          borderRadius: "8px 8px 0 0",
          height: isMobile ? 180 : "100%",
          objectFit: "cover", // Ensure the image covers the area without distortion
        }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to right, #ffffff 0%, rgba(245, 245, 245, 0) 100%)",
          color: "#000",
          borderRadius: "0 0 8px 8px",
          padding: isMobile ? 1 : 2,
        }}
      >
        <Typography
          gutterBottom
          variant={isMobile ? "body1" : "h6"}
          component="div"
          className="font-semibold"
        >
          Tokyo Train
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: isMobile ? "0.8rem" : "1rem",
          }}
        >
          <Typography className="font-normal text-sm">
            2022 | Webinar Genre
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WebinarCard;
