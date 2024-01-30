import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Header from "./components/Header";
import SchoolDetail from "./containers/SchoolDetail";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:uid" element={<SchoolDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
