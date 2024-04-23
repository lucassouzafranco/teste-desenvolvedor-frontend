import "./App.css";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";
import { PaginationProvider } from "./contexts/PaginationContext";
import { DataProvider } from "./contexts/DataContext";

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
