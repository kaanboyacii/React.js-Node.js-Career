import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Joblist from "./pages/joblist/Joblist";
import Job from "./pages/job/Job";
import Aboutus from "./pages/aboutus/Aboutus";
import Events from "./pages/events/Events";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="job-list" element={<Joblist />} />
            <Route path="job" element={<Job />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="events" element={<Events />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
