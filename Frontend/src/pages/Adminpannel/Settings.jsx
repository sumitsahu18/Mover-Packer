import React, { useState } from "react";
import "../panelDynamic.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    email: true,
    booking: true,
    maintenance: false,
  });

  const handleChange = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <section className="panel-page">
      <h1 className="panel-title">Admin Settings</h1>

      <div className="panel-card panel-list">
        <label className="panel-item">
          <span>
            <b>Email Notifications</b>
            <p className="muted">
              Receive important platform notifications.
            </p>
          </span>

          <input
            type="checkbox"
            checked={settings.email}
            onChange={() => handleChange("email")}
          />
        </label>

        <label className="panel-item">
          <span>
            <b>Booking Alerts</b>
            <p className="muted">
              Get notified when a new booking is created.
            </p>
          </span>

          <input
            type="checkbox"
            checked={settings.booking}
            onChange={() => handleChange("booking")}
          />
        </label>

        <label className="panel-item">
          <span>
            <b>Maintenance Mode</b>
            <p className="muted">
              Temporarily disable access to the platform.
            </p>
          </span>

          <input
            type="checkbox"
            checked={settings.maintenance}
            onChange={() => handleChange("maintenance")}
          />
        </label>
      </div>
    </section>
  );
}