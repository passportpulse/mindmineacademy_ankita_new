import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/home/HomePage";
import AboutUsPage from "../pages/about/AboutUsPage";
import CompetitiveExamsPage from "../pages/competitive-exams/CompetitiveExamsPage";
import AdmissionGuidancePage from "../pages/admission-guidance/AdmissionGuidancePage";
import JointEntrance from "../pages/tutorials/tutorial-pages/JointEntrance";
import ForeignLanguage from "../pages/tutorials/tutorial-pages/ForeignLanguage";
import MockTest from "../pages/tutorials/tutorial-pages/MockTest";
import GeneralStudies from "../pages/tutorials/tutorial-pages/GeneralStudies";
import ProcessPage from "../pages/process/ProcessPage";
import CampusesPage from "../pages/campuses/CampusesPage";
import ContactPage from "../pages/contact/ContactPage";
import ApplyNowPage from "../pages/apply-now/ApplyNowPage";
import CourseDetailsPage from "../pages/home/CourseDetailsPage";

import Notices from "../pages/student-zone/Notices";
import Payment from "../pages/student-zone/Payment";
import Enquiry from "../components/Enquiry";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import ApplyForm from "../components/ApplyForm";
import CheckStatus from "../pages/student-zone/CheckStatus";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Applications from "../pages/admin/Applications";
import AdminLogin from "../pages/admin/AdminLogin";
import Enquiries from "../pages/admin/Enquiries";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:slug" element={<CourseDetailsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/competitive-exams" element={<CompetitiveExamsPage />} />
        <Route path="/admission-guidance" element={<AdmissionGuidancePage />} />
        <Route path="/tutorials/joint-entrance" element={<JointEntrance />} />
        <Route
          path="/tutorials/foreign-language"
          element={<ForeignLanguage />}
        />
        <Route path="/tutorials/mock-test" element={<MockTest />} />
        <Route path="/tutorials/general-studies" element={<GeneralStudies />} />
        {/* Admin Panel */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="applications" element={<Applications />} />
          </Route>
        </Route>
        <Route path="/student-zone/enquiry" element={<Enquiry />} />
        <Route path="/student-zone/apply" element={<ApplyForm />} />
        <Route path="/student-zone/notices" element={<Notices />} />
        <Route path="/student-zone/check-status" element={<CheckStatus />} />
        <Route path="/student-zone/payment" element={<Payment />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/campuses" element={<CampusesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply-now" element={<ApplyNowPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
