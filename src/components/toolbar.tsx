import { Box, Typography } from "@mui/material";

export function Toolbar() {
  return (
    <Box
      sx={{
        paddingX: "8rem",
        paddingY: "1rem",
        height: "4rem",
        width: "auto",
        backgroundColor: "gray",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h2">Bogglesss</Typography>
    </Box>
  );
}
