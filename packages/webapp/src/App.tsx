import React from "react";
import { Routes, Route } from "react-router-dom";
import { BaseLayout } from "./layout/BaseLayout";
import { RequireAuth } from "./layout/RequireAuth";
import { RequireAnonym } from "./layout/RequireAnonym";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { LoggedInLayout } from "./layout/LoggedInLayout";
import { VerifyPage } from "./pages/email/VerifyPage";

const auth = (component: React.ReactElement) => (
  <RequireAuth>
    <LoggedInLayout>{component}</LoggedInLayout>
  </RequireAuth>
);

const anon = (component: React.ReactElement) => (
  <RequireAnonym>{component}</RequireAnonym>
);

export default function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={auth(<HomePage />)} />
        <Route path="/test" element={auth(<TestPage />)} />
        <Route path="/login" element={anon(<LoginPage />)} />
        <Route path="/register" element={anon(<RegisterPage />)} />
        <Route path="/email/verify" element={<VerifyPage />} />
      </Route>
    </Routes>
  );
}
