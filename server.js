const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");
const { Pool } = require("pg");

const app = express();
const port = Number(process.env.PORT || 3000);
const leadsDir = path.join(__dirname, "data");
const leadsFile = path.join(leadsDir, "leads.ndjson");
const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || "jonathan@layer3labs.io";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false
    })
  : null;

const transporter = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  : null;

async function ensureDatabase() {
  if (!pool) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      country TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `);
}

async function saveLead(lead) {
  if (pool) {
    await ensureDatabase();
    await pool.query(
      `
        INSERT INTO leads (name, company, country, email, message)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [lead.name, lead.company, lead.country, lead.email, lead.message]
    );
    return;
  }

  await fs.mkdir(leadsDir, { recursive: true });
  await fs.appendFile(leadsFile, JSON.stringify({
    ...lead,
    createdAt: new Date().toISOString()
  }) + "\n", "utf8");
}

async function emailLead(lead) {
  const lines = [
    "A new lead was submitted on l3ltrading.com.",
    "",
    `Name: ${lead.name}`,
    `Company / Hospital: ${lead.company}`,
    `Target Market: ${lead.country}`,
    `Email: ${lead.email}`,
    "",
    "Products or documentation requested:",
    lead.message
  ];

  const html = `
    <h2>New L3L Medical Trading lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Company / Hospital:</strong> ${escapeHtml(lead.company)}</p>
    <p><strong>Target Market:</strong> ${escapeHtml(lead.country)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Products or documentation requested:</strong></p>
    <p>${escapeHtml(lead.message).replace(/\n/g, "<br />")}</p>
  `;

  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [notificationEmail],
        reply_to: lead.email,
        subject: `New L3L Medical Trading lead from ${lead.name}`,
        text: lines.join("\n"),
        html
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend request failed: ${response.status} ${errorText}`);
    }

    return;
  }

  if (!transporter) {
    throw new Error("No email provider is configured");
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: notificationEmail,
    replyTo: lead.email,
    subject: `New L3L Medical Trading lead from ${lead.name}`,
    text: lines.join("\n"),
    html
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.post("/api/leads", async (req, res) => {
  const lead = {
    name: String(req.body.name || "").trim(),
    company: String(req.body.company || "").trim(),
    country: String(req.body.country || "").trim(),
    email: String(req.body.email || "").trim(),
    message: String(req.body.message || "").trim()
  };

  if (!lead.name || !lead.company || !lead.country || !lead.email || !lead.message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await saveLead(lead);
    await emailLead(lead);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("Lead submission failed", error);
    return res.status(500).json({ error: "Lead submission failed" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`L3L Medical Trading server listening on port ${port}`);
});
