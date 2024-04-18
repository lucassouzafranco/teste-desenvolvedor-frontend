import "./App.css";
import Menu from "./components/Menu/Menu";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";
import { PaginationProvider } from "../src/page/PaginationContext";

function App() {
  return (
    <PaginationProvider>
      <div>
        <Menu />
        <ComponentWrapper />
      </div>
    </PaginationProvider>
  );
}

export default App;
