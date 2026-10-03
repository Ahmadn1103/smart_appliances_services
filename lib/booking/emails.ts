import type { BookingRequest } from "./validate";

export type EmailContent = { subject: string; html: string; text: string };

const BUSINESS_NAME = "Smart Appliance Services";
const PRIMARY_PHONE = "(571) 899-2995";
const SECONDARY_PHONE = "(571) 992-4222";

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Row = { label: string; value?: string; href?: string };

function renderRows(rows: Row[]): string {
  return rows
    .filter((row) => row.value)
    .map(({ label, value, href }) => {
      const safe = escapeHtml(value!);
      const cell = href
        ? `<a href="${escapeHtml(href)}" style="color:#1053b8;">${safe}</a>`
        : safe.replace(/\n/g, "<br>");
      return `<tr><td style="padding:8px 16px 8px 0;color:#64748b;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-weight:600;">${cell}</td></tr>`;
    })
    .join("");
}

function renderText(rows: Row[]): string {
  return rows
    .filter((row) => row.value)
    .map(({ label, value }) => `${label}: ${value}`)
    .join("\n");
}

function layout(bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px;"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;"><tr><td style="background:#092c68;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:700;">${escapeHtml(BUSINESS_NAME)}</td></tr><tr><td style="padding:28px;color:#0f172a;font-size:15px;line-height:1.55;">${bodyHtml}</td></tr></table></td></tr></table></body></html>`;
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function buildBusinessEmail(request: BookingRequest, reference: string): EmailContent {
  const rows: Row[] = [
    { label: "Reference", value: reference },
    { label: "Service", value: request.service },
    { label: "Name", value: request.name },
    { label: "Phone", value: request.phone, href: telHref(request.phone) },
    { label: "Email", value: request.email, href: `mailto:${request.email}` },
    { label: "Address / ZIP", value: request.address },
    { label: "Preferred date", value: request.date },
    { label: "Time window", value: request.timeSlot },
    { label: "Brand", value: request.brand },
    { label: "Notes", value: request.notes },
  ];

  const html = layout(
    `<h1 style="margin:0 0 4px;font-size:22px;color:#092c68;">New booking request</h1>` +
      `<p style="margin:0 0 16px;color:#475569;">Call the customer to confirm the arrival window.</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0">${renderRows(rows)}</table>`,
  );

  const text = `New booking request\nCall the customer to confirm the arrival window.\n\n${renderText(rows)}`;

  return {
    subject: oneLine(`New booking ${reference} — ${request.service} — ${request.name}`),
    html,
    text,
  };
}

export function buildCustomerEmail(request: BookingRequest, reference: string): EmailContent {
  const rows: Row[] = [
    { label: "Service", value: request.service },
    { label: "Address / ZIP", value: request.address },
    { label: "Preferred date", value: request.date },
    { label: "Time window", value: request.timeSlot },
    { label: "Appliance brand", value: request.brand },
  ];

  const html = layout(
    `<h1 style="margin:0 0 8px;font-size:22px;color:#092c68;">Thanks, ${escapeHtml(request.name)}. We got your request.</h1>` +
      `<p style="margin:0 0 16px;">Our dispatch team will call you shortly to confirm your arrival window.</p>` +
      `<p style="margin:0 0 16px;padding:12px 16px;background:#eff6ff;border-left:4px solid #00b4d8;border-radius:6px;">Your reference: <strong style="color:#1053b8;">${escapeHtml(reference)}</strong></p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0">${renderRows(rows)}</table>` +
      `<p style="margin:16px 0 0;">The $89 diagnostic fee is credited 100% toward your approved repair, and our repairs are backed by a 30-day labor &amp; parts warranty.</p>` +
      `<p style="margin:16px 0 0;">Questions? Call <a href="${telHref(PRIMARY_PHONE)}" style="color:#1053b8;">${PRIMARY_PHONE}</a> or <a href="${telHref(SECONDARY_PHONE)}" style="color:#1053b8;">${SECONDARY_PHONE}</a>, or just reply to this email.</p>`,
  );

  const text = [
    `Thanks, ${request.name}. We got your request.`,
    "Our dispatch team will call you shortly to confirm your arrival window.",
    "",
    `Your reference: ${reference}`,
    renderText(rows),
    "",
    "The $89 diagnostic fee is credited 100% toward your approved repair, and our repairs are backed by a 30-day labor & parts warranty.",
    "",
    `Questions? Call ${PRIMARY_PHONE} or ${SECONDARY_PHONE}, or just reply to this email.`,
    `— ${BUSINESS_NAME}`,
  ].join("\n");

  return { subject: `Your appointment request ${reference}`, html, text };
}
