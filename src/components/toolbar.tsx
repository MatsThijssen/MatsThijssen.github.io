import { Box, Typography } from "@mui/material";

export function Toolbar() {
  return (
    <Box
    color='secondary.contrastText'
      sx={{
        paddingX: "8rem",
        paddingY: "1rem",
        height: "4rem",
        width: "auto",
        backgroundColor: 'secondary.main',
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h2">Boggle.fun</Typography>
    </Box>
  );
}
