import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashbaord";
import ApplicantView from "./Pages/ApplicantsView";
import MainLayout from "./Layout/MainLayout";
import ApplicationPage from "./Pages/ApplicationPage";
import ReviewPage from "./Components/ReviewPage";
import Reports from "./Pages/Reports";
import LandingPage from "./Pages/LandingPage";
import CheckStatusPage from "./Pages/ApplicantsView";
import ApplyPage from "./Pages/ApplicationPage";
import AdminLoginPage from "./Pages/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applicant/:id" element={<ReviewPage />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
          <Route path="/status" element={<CheckStatusPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
      </Routes>
    </>
  );
}

export default App;
