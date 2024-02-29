import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InnerCon from "./components/common/InnerCon";
import SignupPage from "./pages/SignupPage";

interface AppProps {
  children: React.ReactNode;
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
          {/* 404 처리 */}
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Route>
      </Routes>
      {children}
    </InnerCon>
  </RecoilRoot>
);

export default App;
