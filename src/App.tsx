import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InnerCon from "./components/common/InnerCon";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateReportPage from "./pages/report/CreateReportPage";
import SignupPage from "./pages/SignupPage";
import ReportDetailPage from "./pages/report/ReportDetailPage";
import ReportEditPage from "./pages/report/ReportEditPage";
import PinPage from "./pages/report/Pinpage";
import ProtectedRoute from "./ProtectedRoute";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import "./firebase/firebaseConfig";
import AlarmPage from "./pages/AlarmPage";

interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => (
  <RecoilRoot>
    <InnerCon>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/report" element={<Outlet />}>
            <Route path="create" element={<CreateReportPage />} />
            <Route path=":id" element={<ReportDetailPage />} />
            <Route path=":id/edit" element={<ReportEditPage />} />
            <Route path=":id/pin" element={<PinPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/report" element={<CreateReportPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          {/* 404 처리 */}
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Route>
      </Routes>
      {children}
      {/* 토스트 컨테이너 */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </InnerCon>
  </RecoilRoot>
);

export default App;
