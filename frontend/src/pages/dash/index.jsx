import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function DashboardPage({ title }) {
  const [pageTitle, setPageTitle] = useOutletContext();
  useEffect(() => {
    setPageTitle(title);
  });
  return (
    <>
      <ul>
        <li>
          <a href="/api/auth/login">Sign in</a>
        </li>
        <li>
          <a href="/api/auth/logout">logout</a>
        </li>
        <li>
          <a href="/api/auth/me">me</a>
        </li>
      </ul>
    </>
  );
}
