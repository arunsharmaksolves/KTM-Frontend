import { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Verify from "./page/Verify";
import Notfound from "./page/Notfound";
import Login from "./page/Login";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import Trigger from "./page/Trigger";
import Home from "./page/Home";
import Cookies from "js-cookie";
import CreateTag from "./components/CreateTag";
import CreateTrigger from "./components/CreateTrigger";
import UpdateTag from "./components/UpdateTag";
import Script from "./components/Script";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />

        <Route path="/home" element={<Home />} />
        <Route path="/createTag" element={<CreateTag />} />
        <Route path="/trigger" element={<Trigger />} />
        <Route path="/createTrigger" element={<CreateTrigger />} />
        <Route path="/updateTag/:id" element={<UpdateTag />} />
        <Route path="/script" element={<Script />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* magic found from medium */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
