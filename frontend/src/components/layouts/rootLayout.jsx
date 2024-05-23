import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import UseSession from "../../stores/session.store";

export default function RouteLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkSession, setCheckSession] = useState(false);
  const onDash = location.pathname.includes("/dash");
  const onOtpSetup = location.pathname.includes("/auth/otp/setup");
  const onOtpValidate = location.pathname.includes("/auth/otp/validate");
  const onLogin = location.pathname.includes("/auth/login");
  const { state, setSession } = UseSession();

  useEffect(() => {
    setSession();
  }, []);

  useEffect(() => {
    if (state.session === "loading" && state.user === "loading") {
      setCheckSession(false);
      return;
    } else {
      setCheckSession(true);
    }

    if (!state.session || !state.user) {
      if (!onLogin) navigate("/auth/login", { replace: true });
      return;
    }

    if (!state.user.data.otp_verified & !state.user.data.otp_enabled) {
      if (!onOtpSetup) navigate("/auth/otp/setup", { replace: true });
      return;
    }

    if (!state.user.data.otp_validated && state.user.data.otp_enabled) {
      if (!onOtpValidate) navigate("/auth/otp/validate", { replace: true });
      return;
    }

    if (state.session && state.user?.data.otp_validated) {
      if (!onDash) navigate("/dash", { replace: true });
      return;
    }
  }, [state]);

  return (
    <>
      {checkSession ? (
        <Outlet />
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin loading />
        </div>
      )}
    </>
  );
}
