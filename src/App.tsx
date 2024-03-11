import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InnerCon from "./components/common/InnerCon";
import CreateReportPage from "./pages/CreateReportPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import MyPage from "./pages/MyPage";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
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
