import "./App.css";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";
import { PaginationProvider } from "./contexts/PaginationContext";
import { DataProvider } from "./contexts/DataContext";

import { Chart, ArcElement } from 'chart.js'; // Adicione esta linha de importação
Chart.register(ArcElement); // Adicione esta linha de registro

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
