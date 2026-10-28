"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { budgetOptions, services, site } from "@/lib/content";
import { validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";
import { Button } from "./Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

// Point the form somewhere else (e.g. a Formspree URL) without touching code.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

const empty: Inquiry = { name: "", email: "", company: "", services: [], budget: "", message: "", website: "" };

const fieldOrder: (keyof Inquiry)[] = ["name", "email", "company", "services", "budget", "message"];

export function ContactForm() {
  const [data, setData] = useState<Inquiry>(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Inquiry, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched[key]) setErrors(validateInquiry(next));
  };

  const blur = (key: keyof Inquiry) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateInquiry(data));
  };

  const toggleService = (title: string) =>
    set(
      "services",
      data.services.includes(title) ? data.services.filter((s) => s !== title) : [...data.services, title],
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateInquiry(data);
    setErrors(v);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    if (Object.keys(v).length) {
      const first = fieldOrder.find((k) => v[k]);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok !== false) {
        setStatus("success");
        setData(empty);
        setTouched({});
      } else if (json.configured === false) {
        setStatus("unconfigured");
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — check your connection and try again.");
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const err = (k: keyof Inquiry) => (touched[k] ? errors[k] : undefined);

  if (status === "success") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className="flex min-h-[28rem] flex-col justify-between rounded-[1.25rem] bg-lime p-8 text-ink outline-none md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-ink text-lime">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="display-md">Message received.</p>
          <p className="mt-4 max-w-md">
            Thanks for reaching out. Your inquiry was delivered, and we&rsquo;ll reply to you by email.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="eyebrow mt-8 border-b border-ink pb-1"
          >
            Send another inquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="flex flex-col gap-9">
      <p id="form-note" className="sr-only">
        Fields marked with an asterisk are required.
      </p>

      <div className="grid gap-9 md:grid-cols-2 md:gap-x-6">
        <TextField id="name" label="Name" required autoComplete="name" value={data.name} error={err("name")} onChange={(v) => set("name", v)} onBlur={() => blur("name")} />
        <TextField id="email" label="Email" type="email" required autoComplete="email" value={data.email} error={err("email")} onChange={(v) => set("email", v)} onBlur={() => blur("email")} />
      </div>
      <TextField id="company" label="Company" autoComplete="organization" value={data.company} error={err("company")} onChange={(v) => set("company", v)} onBlur={() => blur("company")} />

      <fieldset aria-describedby={err("services") ? "services-error" : undefined}>
        <legend className="eyebrow mb-4 text-paper/70">
          Services needed <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s, i) => {
            const checked = data.services.includes(s.title);
            return (
              <label key={s.title} className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => toggleService(s.title)}
                  onBlur={() => blur("services")}
                  data-field={i === 0 ? "services" : undefined}
                  aria-invalid={!!err("services")}
                />
                <span className="flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-sm transition-colors duration-300 hover:border-paper/70 peer-checked:border-lime peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
                  {checked && <Check className="size-3.5" aria-hidden="true" />}
                  {s.title}
                </span>
              </label>
            );
          })}
        </div>
        <FieldError id="services-error" message={err("services")} />
      </fieldset>

      <fieldset aria-describedby={err("budget") ? "budget-error" : undefined}>
        <legend className="eyebrow mb-4 text-paper/70">
          Estimated budget <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((b, i) => (
            <label key={b} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={b}
                className="peer sr-only"
                checked={data.budget === b}
                onChange={() => set("budget", b)}
                onBlur={() => blur("budget")}
                data-field={i === 0 ? "budget" : undefined}
                aria-invalid={!!err("budget")}
              />
              <span className="block rounded-full border border-paper/25 px-4 py-2.5 text-sm transition-colors duration-300 hover:border-paper/70 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
                {b}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="budget-error" message={err("budget")} />
      </fieldset>

      <TextField id="message" label="Project description" required multiline value={data.message} error={err("message")} onChange={(v) => set("message", v)} onBlur={() => blur("message")} hint="Goals, timing, links — whatever helps us understand." />

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <AnimatePresence>
        {(status === "error" || status === "unconfigured") && (
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden outline-none"
          >
            <div className="flex gap-3 rounded-xl border border-paper/25 p-4 text-sm">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
              {status === "unconfigured" ? (
                <p>
                  Our inquiry form isn&rsquo;t connected yet, so this message <strong>was not sent</strong>.
                  Please email us directly at{" "}
                  <a className="underline decoration-lime underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              ) : (
                <p>
                  {serverError} You can also reach us at{" "}
                  <a className="underline decoration-lime underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-8">
        <p className="max-w-xs text-sm text-paper/60">
          We reply to every serious inquiry. No newsletters, no spam.
        </p>
        <Button type="submit" variant="lime" size="lg" disabled={status === "submitting"} icon={status !== "submitting"}>
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
            </span>
          ) : (
            "Start a Project"
          )}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your inquiry." : ""}
      </p>
    </form>
  );
}

type TextFieldProps = {
  id: keyof Inquiry;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  hint?: string;
};

function TextField({ id, label, value, onChange, onBlur, error, required, type = "text", autoComplete, multiline, hint }: TextFieldProps) {
  const inputId = `f-${id}`;
  const describedBy = [hint ? `${inputId}-hint` : null, error ? `${inputId}-error` : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id: inputId,
    name: id,
    value,
    required,
    autoComplete,
    "data-field": id,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    onBlur,
    className: `peer w-full border-0 border-b bg-transparent pb-3 pt-1 text-lg text-paper outline-none transition-colors duration-300 placeholder:text-paper/30 focus:border-lime md:text-xl ${
      error ? "border-[#ff8a7a]" : "border-paper/25 hover:border-paper/60"
    }`,
  } as const;

  return (
    <div>
      <label htmlFor={inputId} className="eyebrow mb-2 block text-paper/70">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {multiline ? (
        <textarea {...common} rows={4} onChange={(e) => onChange(e.target.value)} className={`${common.className} resize-y`} />
      ) : (
        <input {...common} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && (
        <p id={`${inputId}-hint`} className="mt-2 text-sm text-paper/50">
          {hint}
        </p>
      )}
      <FieldError id={`${inputId}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-sm text-[#ff8a7a]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
