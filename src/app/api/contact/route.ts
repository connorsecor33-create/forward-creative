import { NextResponse } from "next/server";
import { validateInquiry, type Inquiry } from "@/lib/inquiry";
import { services, budgetOptions } from "@/lib/content";

/**
 * Receives project inquiries and forwards them to CONTACT_WEBHOOK_URL as JSON.
 *
 * If no webhook is configured this returns 503 with `configured: false`, and
 * the form tells the visitor plainly that it isn't connected yet. Nothing is
 * ever reported as "sent" unless the downstream endpoint accepted it.
 */
export async function POST(request: Request) {
  let body: Partial<Inquiry>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: quietly accept and drop bot submissions.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateInquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const allowedServices = new Set(services.map((s) => s.title));
  const allowedBudgets = new Set<string>(budgetOptions);
  const inquiry = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    company: (body.company ?? "").trim(),
    services: (body.services ?? []).filter((s) => allowedServices.has(s)),
    budget: allowedBudgets.has(body.budget ?? "") ? body.budget : "Not specified",
    message: body.message!.trim(),
    submittedAt: new Date().toISOString(),
    source: "forwardtheory.co contact form",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Inquiry delivery is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't deliver your message. Please email us instead." },
      { status: 502 },
    );
  }
}
