import { Container, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { Toolbar } from "./toolbar";

export function Layout({ children }: { children?: ReactNode }) {
  const theme = useTheme()
  return (
    <Container disableGutters sx={{ minWidth: "100%", backgroundColor: theme.palette.primary.main, height: '100vh' }}>
      <Toolbar />
      {children}
    </Container>
  );
}
