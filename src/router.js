import Dashboard from "./modules/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Playground from "./modules/playground";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/playground/:id" element={<Playground />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
