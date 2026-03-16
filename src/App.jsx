import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import SubmitWorkflow from "./pages/SubmitWorkflow";
import WorkflowDetails from "./pages/WorkflowDetails";
import WorkflowResults from "./pages/WorkflowResults";
import About from "./pages/About";

function App() {

  return (

    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/submit" element={<SubmitWorkflow />} />

        <Route path="/about" element={<About />} />

        <Route path="/workflows/:name" element={<WorkflowDetails />} />

        <Route path="/workflows/:name/results" element={<WorkflowResults />} />

      </Routes>

    </>

  );

}

export default App;
