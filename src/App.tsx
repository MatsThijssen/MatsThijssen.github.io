import "./App.css";
import { Boggle } from "./components/game";
import { Layout } from "./components/layout";

function App() {
  return (
    <>
      <Layout>
        <Boggle />
      </Layout>
    </>
  );
}

export default App;
