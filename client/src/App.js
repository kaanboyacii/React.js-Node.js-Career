import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import CompanyProfile from "./pages/companyProfile/CompanyProfile";
import LoadingScreen from "./components/loading/LoadingScreen";
import { useSelector } from "react-redux";
import CompanyPanel from "./pages/companyPages/panel/CompanyPanel/CompanyPanel";
import CompanyPanelProfile from "./pages/companyPages/panel/CompanyPanelProfile";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(true);
  const currentCompany = useSelector((state) => state.company.currentCompany);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };
    return () => {
      window.onload = null;
    };
  }, []);


  if (currentCompany) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/company-panel" replace />}
          />
          <Route path="/company-panel" element={<CompanyPanel />} />
          <Route path="/company-panel/profile" element={<CompanyPanelProfile />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      {isLoading && (
        <LoadingScreen />
      )}
      {!isLoading && (
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
              <Route path="job">
                <Route path=":id" element={<Job />} />
              </Route>
              <Route path="company">
                <Route path=":id" element={<CompanyProfile />} />
              </Route>
              <Route path="events" element={<Events />} />
              <Route path="event">
                <Route path=":id" element={<Event />} />
              </Route>
              <Route path="courses" element={<Courses />} />
              <Route path="aboutus" element={<Aboutus />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
