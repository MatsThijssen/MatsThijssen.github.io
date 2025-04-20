import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Toolbar } from "./toolbar";

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <Container disableGutters sx={{ minWidth: "100%" }}>
      <Toolbar />
      {children}
    </Container>
  );
}
