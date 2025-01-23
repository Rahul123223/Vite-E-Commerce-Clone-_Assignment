import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Header onSearch={(query: string) => console.log(query)} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
