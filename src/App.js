import "./App.css";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import BarChart from "./components/BarChart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PolicySearch from "./components/PolicySearch";
import Policy from "./components/Policy";
import EditPolicy from "./components/EditPolicy";
import Header from "./components/Header";
import RedirectModal from "./components/RedirectModal";

function App() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    axios
      .get("/policy")
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<PolicySearch />} />
          <Route path="/policy/:id" element={<Policy />} />
          <Route path="/policy/:id/edit" element={<EditPolicy />} />
          <Route path="/redirect" element={<RedirectModal />} />
          <Route path="/" element={<BarChart chartData={chartData} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
