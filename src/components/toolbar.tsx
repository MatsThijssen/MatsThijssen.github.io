import { Box, Typography } from "@mui/material";

export function Toolbar() {
  return (
    <Box
    color='secondary.contrastText'
      sx={{
        paddingX: "8vw",
        paddingY: "2vh",
        height: "8vh",
        width: "auto",
        backgroundColor: 'secondary.main',
        marginBottom: "1vh",
      }}
    >
      <Typography variant="h2">Boggle.fun</Typography>
    </Box>
  );
}
