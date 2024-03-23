import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SchoolDetail from "./containers/SchoolDetail";
import CompareSchools from "./containers/CompareSchools";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:uid" element={<SchoolDetail />} />
          <Route path="/compare/:query" element={<CompareSchools />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
