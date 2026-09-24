import nodemailer, { type Transporter } from 'nodemailer';

interface SendContactEmailParams {
  ticketId: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: string;
  subject: string;
  message: string;
}

const SMTP_HOST = process.env.SMTP_HOST || 'in10.fastwebhost.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE !== 'false';
const SMTP_USER = process.env.SMTP_USER || 'salam@nooreilahi.com';
const SMTP_PASS = process.env.SMTP_PASS || 'Majid5426!@';
const SMTP_FROM = process.env.SMTP_FROM || `"Noor-e-ilahi" <${SMTP_USER}>`;

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });
  }
  return transporter;
}

export async function sendContactInquiryEmails(params: SendContactEmailParams): Promise<{
  adminSent: boolean;
  userSent: boolean;
  error?: string;
}> {
  const mailer = getTransporter();
  let adminSent = false;
  let userSent = false;

  const categoryLabels: Record<string, string> = {
    business: '💼 Business & Strategic Partnership',
    feedback: '💡 Feedback & Enhancement Suggestion',
    complaint: '⚠️ Scholarly Complaint & Correction',
    general: '✉️ General Spiritual Inquiry',
  };
  const categoryLabel = categoryLabels[params.category] || params.category;

  // 1. Send Notification to salam@nooreilahi.com
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #031712; color: #ffffff; margin: 0; padding: 24px; }
    .card { background-color: #04231b; border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 16px; padding: 28px; max-width: 640px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 18px; margin-bottom: 20px; }
    .title { color: #f59e0b; font-size: 22px; font-weight: bold; margin: 0; }
    .badge { display: inline-block; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fde68a; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: bold; margin-top: 8px; }
    .field-row { margin-bottom: 12px; }
    .field-label { color: #6ee7b7; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
    .field-value { color: #ffffff; font-size: 15px; margin-top: 2px; }
    .message-box { background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 16px; color: #ecfdf5; line-height: 1.6; white-space: pre-wrap; font-size: 14px; margin-top: 6px; }
    .footer { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; margin-top: 24px; font-size: 12px; color: rgba(110, 231, 183, 0.7); text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="title">New Inquiry Received [${params.ticketId}]</h1>
      <div class="badge">${categoryLabel}</div>
    </div>

    <div class="field-row">
      <div class="field-label">Sender Name</div>
      <div class="field-value">${params.name}</div>
    </div>

    <div class="field-row">
      <div class="field-label">Sender Email</div>
      <div class="field-value"><a href="mailto:${params.email}" style="color: #f59e0b; text-decoration: none;">${params.email}</a></div>
    </div>

    ${params.phone ? `
    <div class="field-row">
      <div class="field-label">Contact Phone</div>
      <div class="field-value">${params.phone}</div>
    </div>` : ''}

    ${params.organization ? `
    <div class="field-row">
      <div class="field-label">Organization / Business Entity</div>
      <div class="field-value">${params.organization}</div>
    </div>` : ''}

    <div class="field-row">
      <div class="field-label">Subject</div>
      <div class="field-value" style="font-weight: bold; color: #fde68a;">${params.subject}</div>
    </div>

    <div class="field-row">
      <div class="field-label">Detailed Message</div>
      <div class="message-box">${params.message}</div>
    </div>

    <div class="footer">
      Noor-e-ilahi Classical Islamic Platform • Direct SMTP Routing to salam@nooreilahi.com
    </div>
  </div>
</body>
</html>
  `;

  try {
    await mailer.sendMail({
      from: SMTP_FROM,
      to: 'salam@nooreilahi.com',
      replyTo: `${params.name} <${params.email}>`,
      subject: `[${params.ticketId}] [${params.category.toUpperCase()}] ${params.subject}`,
      html: adminHtml,
      text: `New Inquiry from ${params.name} (${params.email}) [${params.ticketId}]:\n\nCategory: ${categoryLabel}\nSubject: ${params.subject}\n\nMessage:\n${params.message}`,
    });
    adminSent = true;
    console.log(`[SMTP SUCCESS] Notification sent to salam@nooreilahi.com for ticket ${params.ticketId}`);
  } catch (err: any) {
    console.error(`[SMTP ERROR] Failed to send admin email to salam@nooreilahi.com:`, err.message);
  }

  // 2. Send Auto-Acknowledgement to Sender
  const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #031712; color: #ffffff; margin: 0; padding: 24px; }
    .card { background-color: #04231b; border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 16px; padding: 28px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .logo { color: #f59e0b; font-size: 24px; font-weight: 900; letter-spacing: 1px; margin: 0; }
    .arabic { color: #fde68a; font-size: 14px; margin-top: 4px; }
    .greeting { font-size: 18px; color: #ffffff; margin-top: 20px; font-weight: 600; }
    .text { color: #d1fae5; line-height: 1.6; font-size: 14px; margin-top: 10px; }
    .ticket-box { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 14px 18px; margin: 20px 0; }
    .ticket-label { font-size: 11px; text-transform: uppercase; color: #fde68a; font-weight: 700; }
    .ticket-id { font-size: 18px; font-family: monospace; font-weight: bold; color: #ffffff; margin-top: 4px; }
    .footer { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; margin-top: 24px; font-size: 12px; color: rgba(110, 231, 183, 0.7); text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div style="text-align: center; border-bottom: 1px solid rgba(52, 211, 153, 0.15); padding-bottom: 16px;">
      <h1 class="logo">Noor-e-ilahi</h1>
      <div class="arabic">نُورِ اِلٰہی • Your Deen. Your Daily Companion.</div>
    </div>

    <div class="greeting">Assalamu Alaikum wa Rahmatullahi wa Barakatuh, ${params.name}</div>

    <p class="text">
      Thank you for reaching out to <strong>Noor-e-ilahi</strong>. We have successfully received your inquiry regarding <em>"${params.subject}"</em>.
    </p>

    <div class="ticket-box">
      <div class="ticket-label">Your Tracking Ticket Reference</div>
      <div class="ticket-id">${params.ticketId}</div>
    </div>

    <p class="text">
      Our executive and scholarly support team reviews all inquiries delivered to <strong>salam@nooreilahi.com</strong> and will get back to you within <strong>24 business hours</strong>.
    </p>

    <p class="text" style="margin-top: 18px;">
      May Allah bless you and grant peace and barakah to you and your loved ones.
    </p>

    <div class="footer">
      Noor-e-ilahi Support Desk • <a href="mailto:salam@nooreilahi.com" style="color: #f59e0b; text-decoration: none;">salam@nooreilahi.com</a><br/>
      Global Classical Islamic Platform
    </div>
  </div>
</body>
</html>
  `;

  try {
    await mailer.sendMail({
      from: SMTP_FROM,
      to: params.email,
      subject: `Inquiry Received [${params.ticketId}] - Noor-e-ilahi`,
      html: userHtml,
      text: `Assalamu Alaikum ${params.name},\n\nThank you for reaching out to Noor-e-ilahi. Your inquiry regarding "${params.subject}" has been received with Ticket ID: ${params.ticketId}.\n\nOur team will respond within 24 hours at salam@nooreilahi.com.\n\nWas-salam,\nNoor-e-ilahi Support Desk`,
    });
    userSent = true;
    console.log(`[SMTP SUCCESS] Acknowledgement sent to ${params.email} for ticket ${params.ticketId}`);
  } catch (err: any) {
    console.error(`[SMTP ERROR] Failed to send user acknowledgement to ${params.email}:`, err.message);
  }

  return { adminSent, userSent };
}
