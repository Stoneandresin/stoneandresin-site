import { ServerClient } from 'postmark';
import { Resend } from 'resend';

type Lead = {
  email: string;
  firstName: string;
  projectType: string;
  blend: string;
  sqft: number;
};

type Quote = {
  total: number;
};

const postmark = process.env.POSTMARK_SERVER_TOKEN
  ? new ServerClient(process.env.POSTMARK_SERVER_TOKEN!)
  : null;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY!) : null;

export async function sendQuoteEmail({
  lead,
  quote,
  pdfUrl,
}: {
  lead: Lead;
  quote: Quote;
  pdfUrl: string;
}) {
  const from = process.env.EMAIL_FROM || 'aaron@stoneandresin.com';
  const bcc = process.env.EMAIL_BCC;
  const to = lead.email;
  const subject = `Your Stone & Resin Quote — ${lead.projectType} (${lead.sqft} sq ft)`;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 8px">Your Quote is Ready</h2>
      <p>Hi ${lead.firstName},</p>
      <p>We’ve prepared your quote for <b>${lead.projectType}</b> using <b>${lead.blend}</b> over <b>${lead.sqft} sq ft</b>.</p>
      <p><a href="${pdfUrl}">Download your PDF quote</a></p>
      <p><b>Total:</b> $${quote.total.toFixed(2)}</p>
      <p>Questions? Reply to this email or call (513) 787‑8798.</p>
      <hr/>
      <p style="color:#777">© 2025 Stone & Resin · stoneandresin.com</p>
    </div>
  `;

  if (postmark) {
    try {
      await postmark.sendEmail({
        From: from,
        To: to,
        Bcc: bcc,
        Subject: subject,
        HtmlBody: html,
      });
      return;
    } catch (error) {
      console.warn('Postmark failed, falling back to Resend:', error);
    }
  }

  if (resend) {
    await resend.emails.send({ from, to, bcc, subject, html });
  } else {
    throw new Error('No email provider configured');
  }
}
