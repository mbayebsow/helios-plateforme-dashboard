import React from "react";
import { Outlet } from "react-router-dom";
import { General } from "../../lib/config";

export default function AuthLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-fill-2)",
        backgroundImage: "url('https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ width: 370, backgroundColor: "white" }}>
        <div>
          <div className="plateforme-logo">
            {General.name}
            <span>[{General.subName}]</span>
          </div>
        </div>
        <div
          style={{
            padding: 30,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
