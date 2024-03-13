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

interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => (
  <RecoilRoot>
    <InnerCon>
      {" "}
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/report" element={<Outlet />}>
            <Route path="create" element={<CreateReportPage />} />
            <Route path=":id" element={<ReportDetailPage />} />
            <Route path=":id/edit" element={<ReportEditPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          {/* 404 처리 */}
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Route>
      </Routes>
      {children}
    </InnerCon>
  </RecoilRoot>
);

export default App;
