import { useState } from 'react';
import Header from "./components/Header";
import Table from "./components/Table";
import { PatientData } from "./PatientData";

function App() {
  const [data, setData] = useState(PatientData);

  return (
    <div className="app">
      <Header />
      <Table data={data} setData={setData} />
    </div>
  );
}

export default App;
