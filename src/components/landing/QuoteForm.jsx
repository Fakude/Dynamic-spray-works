import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const STEPS = ["Project", "Contact", "Review"];
const SERVICES = [
  { value: "pavement_painting", label: "Pavement Painting" },
  { value: "roof_painting", label: "Roof Painting" },
  { value: "boundary_wall_painting", label: "Boundary Wall Painting" },
  { value: "site_preparation", label: "Site Preparation" },
  { value: "other", label: "Other" },
];
const WHATSAPP_NUMBER = "27676244130";

const initialForm = {
  service: "",
  location: "",
  area: "",
  message: "",
  full_name: "",
  phone: "",
  email: "",
  consent: false,
};

const serviceLabel = (value) =>
  SERVICES.find((service) => service.value === value)?.label ?? "Not selected";

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 0) {
      if (!form.service) nextErrors.service = "Choose the service you need.";
      if (!form.location.trim()) nextErrors.location = "Enter your suburb or town.";
    }

    if (step === 1) {
      if (!form.full_name.trim()) nextErrors.full_name = "Enter your full name.";
      if (form.phone.replace(/\D/g, "").length < 9) {
        nextErrors.phone = "Enter a valid phone number.";
      }
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
      if (!form.consent) nextErrors.consent = "Consent is required to continue.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goForward = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      goForward();
      return;
    }

    const message = [
      "Hello Dynamic Spray Works, I would like a free quotation.",
      "",
      `Service: ${serviceLabel(form.service)}`,
      `Location: ${form.location.trim()}`,
      form.area ? `Approximate area: ${form.area} m²` : null,
      `Name: ${form.full_name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email ? `Email: ${form.email.trim()}` : null,
      form.message ? `Project details: ${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setWhatsAppUrl(url);
    trackEvent("quote_whatsapp_handoff", { service: form.service });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (whatsAppUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-10 text-center"
        role="status"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Request prepared
        </p>
        <h3 className="mb-3 font-heading text-2xl font-bold text-foreground">
          Continue in WhatsApp
        </h3>
        <p className="mx-auto mb-7 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
          Your details have not been stored on this website. Send the prepared WhatsApp
          message to deliver your request to our team.
        </p>
        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
          <Button className="h-12 rounded-full px-7 font-heading font-bold">
            <MessageCircle className="h-5 w-5" />
            Open WhatsApp
          </Button>
        </a>
        <button
          type="button"
          className="mt-5 block w-full text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => {
            setForm(initialForm);
            setStep(0);
            setWhatsAppUrl("");
          }}
        >
          Start another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-8" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        <div className="mb-3 flex items-center justify-between text-xs font-medium">
          <span className="text-primary">Step {step + 1} of {STEPS.length}</span>
          <span className="text-muted-foreground">{STEPS[step]}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {STEPS.map((label, index) => (
            <div key={label}>
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  index <= step ? "bg-primary" : "bg-secondary"
                }`}
              />
              <span className="mt-2 hidden text-[11px] text-muted-foreground sm:block">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="quote-service">Service needed *</Label>
                <Select value={form.service} onValueChange={(value) => handleChange("service", value)}>
                  <SelectTrigger
                    id="quote-service"
                    aria-invalid={Boolean(errors.service)}
                    className="h-12 rounded-xl bg-secondary/50"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quote-location">Suburb or town *</Label>
                  <Input
                    id="quote-location"
                    autoComplete="address-level2"
                    value={form.location}
                    onChange={(event) => handleChange("location", event.target.value)}
                    placeholder="e.g. Centurion"
                    aria-invalid={Boolean(errors.location)}
                    className="h-12 rounded-xl bg-secondary/50"
                  />
                  {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-area">Approximate area (m²)</Label>
                  <Input
                    id="quote-area"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={form.area}
                    onChange={(event) => handleChange("area", event.target.value)}
                    placeholder="Optional"
                    className="h-12 rounded-xl bg-secondary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-details">Project details</Label>
                <Textarea
                  id="quote-details"
                  maxLength={1000}
                  value={form.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  placeholder="Surface condition, preferred colour, access requirements, or timing..."
                  className="min-h-[120px] rounded-xl bg-secondary/50"
                />
                <p className="text-right text-[11px] text-muted-foreground">
                  {form.message.length}/1000
                </p>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="quote-name">Full name *</Label>
                <Input
                  id="quote-name"
                  autoComplete="name"
                  value={form.full_name}
                  onChange={(event) => handleChange("full_name", event.target.value)}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.full_name)}
                  className="h-12 rounded-xl bg-secondary/50"
                />
                {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quote-phone">Phone number *</Label>
                  <Input
                    id="quote-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    placeholder="+27 67 123 4567"
                    aria-invalid={Boolean(errors.phone)}
                    className="h-12 rounded-xl bg-secondary/50"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-email">Email address</Label>
                  <Input
                    id="quote-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    placeholder="Optional"
                    aria-invalid={Boolean(errors.email)}
                    className="h-12 rounded-xl bg-secondary/50"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => handleChange("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  I agree to share these details with Dynamic Spray Works on WhatsApp for
                  the purpose of preparing and following up on this quotation.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
            </>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Quote request
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-bold text-foreground">
                      Review your details
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <dl className="space-y-3 text-sm">
                  {[
                    ["Service", serviceLabel(form.service)],
                    ["Location", form.location],
                    ["Area", form.area ? `${form.area} m²` : "To be assessed"],
                    ["Customer", form.full_name],
                    ["Phone", form.phone],
                    ["Email", form.email || "Not provided"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-5 border-b border-border/70 pb-3 last:border-0 last:pb-0">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="max-w-[65%] text-right font-medium text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This is a free request, not a payment. No card or banking details are
                  collected. Final pricing follows a project assessment.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex gap-3">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-5"
            onClick={() => setStep((current) => current - 1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          type="submit"
          size="lg"
          className="h-12 flex-1 rounded-full font-heading font-bold"
        >
          {step === STEPS.length - 1 ? (
            <>
              <MessageCircle className="h-5 w-5" />
              Continue to WhatsApp
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        Your information stays in this browser until you choose to send it via WhatsApp.
      </p>
    </form>
  );
}
