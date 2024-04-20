import "./App.css";
import Menu from "./components/Menu/Menu";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";
import { PaginationProvider } from "./context/PaginationContext";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <PaginationProvider>
          <Menu />
          <ComponentWrapper />
      </PaginationProvider>
    </DataProvider>
  );
}

export default App;
