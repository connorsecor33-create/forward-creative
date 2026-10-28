/** Shared inquiry schema + validation used by the form and the API route. */

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(data: Partial<Inquiry>): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 120) errors.name = "That name is a little long — 120 characters max.";

  if (!email) errors.email = "We need an email address to reply.";
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "That email doesn't look right.";

  if ((data.company ?? "").length > 160) errors.company = "160 characters max.";

  if (!data.services || data.services.length === 0)
    errors.services = "Pick at least one service — a best guess is fine.";

  if (!data.budget) errors.budget = "Choose a range, or “Not sure yet”.";

  if (message.length < 20)
    errors.message = "A sentence or two about the project helps (20 characters minimum).";
  else if (message.length > 5000) errors.message = "5,000 characters max.";

  return errors;
}
