import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InnerCon from "./components/common/InnerCon";
import CreateReportPage from "./pages/report/CreateReportPage";
import SignupPage from "./pages/SignupPage";
import ReportDetailPage from "./pages/report/ReportDetailPage";
import ReportEditPage from "./pages/report/ReportEditPage";
import PinPage from "./pages/report/Pinpage";
import ProtectedRoute from "./ProtectedRoute";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import AlarmPage from "./pages/AlarmPage";


interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => (
  <RecoilRoot>
    <InnerCon>
      {" "}
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/report" element={<Outlet />}>
            <Route path="create" element={<CreateReportPage />} />
            <Route path=":id" element={<ReportDetailPage />} />
            <Route path=":id/edit" element={<ReportEditPage />} />
            <Route path=":id/pin" element={<PinPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
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
    </InnerCon>
  </RecoilRoot>
);

export default App;
