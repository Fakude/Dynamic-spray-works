import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <CookieConsent />
    </>
  );
}

export default App;
