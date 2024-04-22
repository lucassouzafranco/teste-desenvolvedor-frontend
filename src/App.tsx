import "./App.css";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";
import { PaginationProvider } from "./context/PaginationContext";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <PaginationProvider>
          <ComponentWrapper />
      </PaginationProvider>
    </DataProvider>
  );
}

export default App;
