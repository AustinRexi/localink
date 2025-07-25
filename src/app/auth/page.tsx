"use client";
import React from "react";
import NewspaperDiscover from "@/views/login/NewspaperDiscover";
import Home from "@/views/login";
import RegisterForm from "@/views/login/RegistrationForm";
import RegistrationForm2 from "@/views/login/RegistrationForm2";
import { redirect } from "next/navigation";

import { useState } from "react";
enum Views {
  home = "home",
  form1 = "form1",
  form2 = "form2",
  form3 = "form3",
}
export default function AuthPage() {
  const [view, setView] = useState(Views.home);

  const handleViewChange = () => {
    if (view == Views.home) {
      setView(Views.form1);
    }
    if (view == Views.form1) {
      setView(Views.form2);
    }
    if (view == Views.form2) {
      setView(Views.form3);
    }
    if (view == Views.form3) {
      redirect("/app");
    }
  };
  const renderview = () => {
    switch (view) {
      case Views.home:
        return <Home onContinueButton={handleViewChange} />;

      case Views.form1:
        return <RegisterForm onContinueButton={handleViewChange} />;

      case Views.form2:
        return <RegistrationForm2 onContinueButton={handleViewChange} />;

      case Views.form3:
        return <NewspaperDiscover onContinueButton={handleViewChange} />;

      default:
        return <Home onContinueButton={handleViewChange} />;
    }
  };
  return <div>{renderview()}</div>;
}
