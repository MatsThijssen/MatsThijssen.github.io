import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Boggle } from "./components/game";
import { Layout } from "./components/layout";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Boggle />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
