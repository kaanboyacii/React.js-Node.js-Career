import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/userAuth/login/Login";
import CompanyLogin from "./pages/companyAuth/login/Login";
import CompanySignup from "./pages/companyAuth/signup/Signup";
import Signup from "./pages/userAuth/signup/Signup";
import Joblist from "./pages/joblist/Joblist";
import Job from "./pages/job/Job";
import Aboutus from "./pages/aboutus/Aboutus";
import Events from "./pages/events/Events";
import Event from "./pages/event/Event";
import Courses from "./pages/courses/Courses";
import Panel from "./pages/panel/Panel";
import ContactPage from "./pages/contactPage/ContactPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="panel" element={<Panel />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="company-login" element={<CompanyLogin />} />
            <Route path="company-signup" element={<CompanySignup />} />
            <Route path="job-list" element={<Joblist />} />
            <Route path="job" element={<Job />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="event" element={<Event />} />
            <Route path="events" element={<Events />} />
            <Route path="courses" element={<Courses />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
