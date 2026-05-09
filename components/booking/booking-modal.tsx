"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, X } from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  computeStayTotalEUR,
  generateReservationRef,
  getPlanById,
  STAY_PLANS,
} from "@/lib/booking-plans";
import {
  formatCurrencyEUR,
  formatDateDE,
  parseISODateInput,
} from "@/lib/format-de";
import { useBookingModal } from "./booking-context";

const MIN_GUESTS = 1;
const MAX_GUESTS = 12;
const MIN_NIGHTS = 1;
const MAX_NIGHTS = 14;

type WizardStep = "details" | "plan" | "payment" | "processing" | "voucher";

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

function formatCardInput(raw: string) {
  const d = digitsOnly(raw).slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function BookingModalFlow({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const liveId = useId();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const emailPayRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<WizardStep>("details");
  const [dateIso, setDateIso] = useState("");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [planId, setPlanId] = useState(STAY_PLANS[1]!.id);
  const [email, setEmail] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [reservationRef, setReservationRef] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);

  const plan = getPlanById(planId) ?? STAY_PLANS[1]!;
  const parsedDate = parseISODateInput(dateIso);
  const total = useMemo(
    () => computeStayTotalEUR(plan, nights, guests),
    [plan, nights, guests],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, step]);

  useEffect(() => {
    if (step !== "processing") return;
    const t = window.setTimeout(() => setStep("voucher"), 1650);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step === "details") dateInputRef.current?.focus();
    else if (step === "payment") emailPayRef.current?.focus();
  }, [step]);

  const goNext = () => {
    if (step === "details" && parsedDate) setStep("plan");
    else if (step === "plan") setStep("payment");
  };

  const goBack = () => {
    if (step === "plan") setStep("details");
    else if (step === "payment") setStep("plan");
  };

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    const num = digitsOnly(cardNumber);
    const expOk = /^\d{2}\/\d{2}$/.test(expiry);
    const cvcOk = digitsOnly(cvc).length >= 3;
    if (
      !email.trim() ||
      !nameOnCard.trim() ||
      num.length < 15 ||
      !expOk ||
      !cvcOk
    ) {
      return;
    }
    setReservationRef(generateReservationRef());
    setPaidTotal(total);
    setStep("processing");
  };

  const handleExpiryChange = (v: string) => {
    const d = digitsOnly(v).slice(0, 4);
    if (d.length <= 2) setExpiry(d);
    else setExpiry(`${d.slice(0, 2)}/${d.slice(2)}`);
  };

  const panelVariants = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6 md:p-10 lg:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32 }}
    >
      <motion.button
        type="button"
        aria-label="Dialog schließen"
        className="absolute inset-0 bg-kuro-midori/55 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (step !== "processing") onClose();
        }}
        disabled={step === "processing"}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={step !== "processing" ? liveId : undefined}
        className="relative z-10 flex max-h-[min(92dvh,920px)] w-full max-w-lg flex-col border border-white/10 bg-kuro-midori shadow-2xl sm:max-h-[min(90dvh,880px)] sm:rounded-sm lg:max-w-xl"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10 sm:py-6">
          {step !== "processing" && step !== "voucher" ? (
            <nav aria-label="Buchungsschritte">
              <ol className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-gray/45">
                {(["details", "plan", "payment"] as const).map((s, i) => {
                  const n = i + 1;
                  const active =
                    (s === "details" && step === "details") ||
                    (s === "plan" && step === "plan") ||
                    (s === "payment" && step === "payment");
                  const done =
                    (s === "details" &&
                      (step === "plan" || step === "payment")) ||
                    (s === "plan" && step === "payment");
                  return (
                    <li key={s} className="flex items-center gap-3">
                      {i > 0 ? (
                        <span className="text-stone-gray/25" aria-hidden>
                          /
                        </span>
                      ) : null}
                      <span
                        className={
                          active
                            ? "text-brass-gold"
                            : done
                              ? "text-stone-gray/55"
                              : ""
                        }
                        aria-current={active ? "step" : undefined}
                      >
                        {n}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : (
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-gray/40">
              {step === "processing" ? "Zahlung" : "Bestätigung"}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={step === "processing"}
            className="min-h-[44px] min-w-[44px] touch-manipulation rounded-sm p-2 text-stone-gray/70 transition-colors hover:text-stone-gray disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden />
          </button>
        </div>

        <div
          id={liveId}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
          style={{
            paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <AnimatePresence mode="wait">
            {step === "details" ? (
              <motion.div
                key="details"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-brass-gold/90">
                  Schritt 1
                </p>
                <h2
                  id={titleId}
                  className="mt-6 text-2xl font-normal tracking-tight text-stone-gray sm:text-[1.75rem] sm:leading-snug"
                >
                  Reisedaten &amp; Gäste
                </h2>
                <p className="mt-6 text-[15px] leading-[1.75] text-stone-gray/70">
                  Teilen Sie uns Ihr Wunschdatum, die Dauer und die Größe Ihrer
                  Reisegruppe mit — wir halten den Rahmen klar und würdevoll.
                  (Demo ohne Backend; Angaben dienen der Darstellung.)
                </p>

                <div className="mt-12 space-y-10">
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-date"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      Anreise
                    </label>
                    <input
                      ref={dateInputRef}
                      id="riot-date"
                      type="date"
                      required
                      value={dateIso}
                      onChange={(e) => setDateIso(e.target.value)}
                      className="min-h-[48px] w-full touch-manipulation border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-nights"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      Nächte
                    </label>
                    <select
                      id="riot-nights"
                      value={nights}
                      onChange={(e) =>
                        setNights(Number.parseInt(e.target.value, 10))
                      }
                      className="min-h-[48px] w-full touch-manipulation border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    >
                      {Array.from(
                        { length: MAX_NIGHTS - MIN_NIGHTS + 1 },
                        (_, i) => MIN_NIGHTS + i,
                      ).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-guests"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      Gäste
                    </label>
                    <select
                      id="riot-guests"
                      value={guests}
                      onChange={(e) =>
                        setGuests(Number.parseInt(e.target.value, 10))
                      }
                      className="min-h-[48px] w-full touch-manipulation border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    >
                      {Array.from(
                        { length: MAX_GUESTS - MIN_GUESTS + 1 },
                        (_, i) => MIN_GUESTS + i,
                      ).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!parsedDate}
                  onClick={goNext}
                  className="mt-14 min-h-[52px] w-full touch-manipulation bg-brass-gold/90 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-kuro-midori transition-[filter,transform] hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Weiter zur Auswahl
                </button>
              </motion.div>
            ) : null}

            {step === "plan" ? (
              <motion.div
                key="plan"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-8 flex min-h-[44px] items-center gap-2 touch-manipulation text-[12px] font-medium uppercase tracking-[0.18em] text-stone-gray/55 transition-colors hover:text-stone-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Zurück
                </button>
                <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-brass-gold/90">
                  Schritt 2
                </p>
                <h2
                  id={titleId}
                  className="mt-6 text-2xl font-normal tracking-tight text-stone-gray sm:text-[1.75rem]"
                >
                  Paket wählen
                </h2>
                <p className="mt-6 text-[15px] leading-[1.75] text-stone-gray/70">
                  Der Gesamtpreis passt sich an Nächte und Gäste an — in Euro,
                  wie im deutschsprachigen Raum üblich.
                </p>

                <fieldset className="mt-12 space-y-4">
                  <legend className="sr-only">Aufenthaltspaket</legend>
                  {STAY_PLANS.map((p) => {
                    const selected = planId === p.id;
                    const lineTotal = computeStayTotalEUR(p, nights, guests);
                    return (
                      <label
                        key={p.id}
                        className={`flex cursor-pointer touch-manipulation flex-col border px-5 py-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 ${
                          selected
                            ? "border-brass-gold/60 bg-white/[0.04]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="plan"
                            value={p.id}
                            checked={selected}
                            onChange={() => setPlanId(p.id)}
                            className="mt-1 h-4 w-4 shrink-0 border-white/30 text-brass-gold focus:ring-brass-gold/50"
                          />
                          <span>
                            <span className="block text-[16px] text-stone-gray">
                              {p.name}
                            </span>
                            <span className="mt-1 block text-[13px] text-stone-gray/55">
                              {p.subtitle}
                            </span>
                          </span>
                        </div>
                        <span className="mt-4 pl-8 text-[15px] font-medium tabular-nums text-stone-gray sm:mt-0 sm:pl-0">
                          {formatCurrencyEUR(lineTotal)}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                <p className="mt-8 text-[13px] leading-relaxed text-stone-gray/50">
                  {parsedDate
                    ? `Anreise ${formatDateDE(parsedDate)} · ${nights} ${nights === 1 ? "Nacht" : "Nächte"} · ${guests} ${guests === 1 ? "Gast" : "Gäste"}`
                    : null}
                </p>

                <button
                  type="button"
                  onClick={goNext}
                  className="mt-12 min-h-[52px] w-full touch-manipulation bg-brass-gold/90 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-kuro-midori transition-[filter,transform] hover:brightness-105 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Weiter zur Begleichung
                </button>
              </motion.div>
            ) : null}

            {step === "payment" ? (
              <motion.div
                key="payment"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-8 flex min-h-[44px] items-center gap-2 touch-manipulation text-[12px] font-medium uppercase tracking-[0.18em] text-stone-gray/55 transition-colors hover:text-stone-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Zurück
                </button>
                <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-brass-gold/90">
                  Schritt 3
                </p>
                <h2
                  id={titleId}
                  className="mt-6 text-2xl font-normal tracking-tight text-stone-gray sm:text-[1.75rem]"
                >
                  Zahlung
                </h2>
                <p className="mt-6 text-[15px] leading-[1.75] text-stone-gray/70">
                  Ein ruhiger Zahlungsdialog — angelehnt an vertraute
                  Premium-Checkouts. In dieser Demo erfolgt keine echte
                  Abbuchung; Ihre Daten verlassen den Vorführmodus nicht.
                </p>

                <div className="mt-8 rounded-sm border border-white/10 bg-white/[0.03] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-gray/45">
                    Zu zahlen
                  </p>
                  <p className="mt-2 font-display text-3xl font-normal tabular-nums text-stone-gray">
                    {formatCurrencyEUR(total)}
                  </p>
                  <p className="mt-2 text-[12px] text-stone-gray/50">
                    {plan.name} ·{" "}
                    {parsedDate ? formatDateDE(parsedDate) : "—"}
                  </p>
                </div>

                <form onSubmit={handlePay} className="mt-12 space-y-8">
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-email-pay"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      E-Mail
                    </label>
                    <input
                      ref={emailPayRef}
                      id="riot-email-pay"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@beispiel.de"
                      className="min-h-[48px] w-full border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray placeholder:text-stone-gray/35 focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-card-name"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      Name auf der Karte
                    </label>
                    <input
                      id="riot-card-name"
                      autoComplete="cc-name"
                      required
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="min-h-[48px] w-full border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="riot-card-num"
                      className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                    >
                      Kartennummer
                    </label>
                    <input
                      id="riot-card-num"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      required
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardInput(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      className="min-h-[48px] w-full border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray placeholder:text-stone-gray/35 focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label
                        htmlFor="riot-exp"
                        className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                      >
                        Ablauf
                      </label>
                      <input
                        id="riot-exp"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        required
                        placeholder="MM/JJ"
                        value={expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className="min-h-[48px] w-full border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray placeholder:text-stone-gray/35 focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                      />
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor="riot-cvc"
                        className="block text-[11px] font-medium uppercase tracking-[0.28em] text-stone-gray/55"
                      >
                        CVC
                      </label>
                      <input
                        id="riot-cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        required
                        value={cvc}
                        maxLength={4}
                        onChange={(e) =>
                          setCvc(digitsOnly(e.target.value).slice(0, 4))
                        }
                        className="min-h-[48px] w-full border border-white/15 bg-kuro-midori px-4 py-3 text-[16px] text-stone-gray focus:border-brass-gold/50 focus:outline-none focus:ring-1 focus:ring-brass-gold/40"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="min-h-[54px] w-full touch-manipulation bg-urushi-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-stone-gray transition-[filter,transform] hover:brightness-110 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-urushi-red"
                  >
                    {formatCurrencyEUR(total)} — jetzt sichern
                  </button>
                </form>
              </motion.div>
            ) : null}

            {step === "processing" ? (
              <motion.div
                key="processing"
                className="flex flex-col items-center justify-center py-16"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                >
                  <CheckCircle2
                    className="h-20 w-20 text-brass-gold"
                    strokeWidth={1}
                    aria-hidden
                  />
                </motion.div>
                <p
                  id={titleId}
                  className="mt-10 text-center font-display text-2xl text-stone-gray"
                >
                  Ihre Zahlung ist eingegangen
                </p>
                <p className="mt-4 text-center text-[14px] text-stone-gray/55">
                  Wir erstellen Ihren Voucher…
                </p>
              </motion.div>
            ) : null}

            {step === "voucher" ? (
              <motion.div
                key="voucher"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-brass-gold/90">
                  Voucher
                </p>
                <h2 id={titleId} className="sr-only">
                  Reservierungsbestätigung
                </h2>

                <div className="mt-8 border-2 border-brass-gold/45 bg-stone-gray px-8 py-10 text-kuro-midori shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:px-10 sm:py-12">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-kuro-midori/45">
                    Reservierungsbestätigung
                  </p>
                  <p className="mt-6 font-display text-3xl font-normal tracking-tight">
                    RIOT MAISON
                  </p>
                  <dl className="mt-10 space-y-6 text-[14px]">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-kuro-midori/45">
                        Buchungsnummer
                      </dt>
                      <dd className="mt-2 font-mono text-[17px] tracking-wide">
                        {reservationRef}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-kuro-midori/45">
                        Anreise
                      </dt>
                      <dd className="mt-2 text-[16px]">
                        {parsedDate ? formatDateDE(parsedDate) : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-kuro-midori/45">
                        Aufenthalt
                      </dt>
                      <dd className="mt-2 text-[16px]">
                        {nights} {nights === 1 ? "Nacht" : "Nächte"} · {guests}{" "}
                        {guests === 1 ? "Gast" : "Gäste"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-kuro-midori/45">
                        Paket
                      </dt>
                      <dd className="mt-2 text-[16px]">{plan.name}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-kuro-midori/45">
                        Betrag
                      </dt>
                      <dd className="mt-2 font-display text-2xl tabular-nums">
                        {formatCurrencyEUR(paidTotal)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-12 border-t border-kuro-midori/15 pt-10">
                    <p className="font-display text-[1.35rem] font-normal italic leading-snug text-kuro-midori">
                      Wir freuen uns auf Sie.
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-kuro-midori/60">
                      Ihr Haus bestätigt den Aufenthalt separat — mit der
                      gleichen Sorgfalt, mit der wir diese Plattform führen.
                      Bei Rückfragen nennen Sie bitte Ihre Buchungsnummer.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-12 min-h-[52px] w-full touch-manipulation border border-white/20 bg-transparent px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-stone-gray/90 transition-colors hover:border-brass-gold/50 hover:text-stone-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Schließen
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BookingModal() {
  const { isOpen, closeBooking, session } = useBookingModal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <BookingModalFlow key={session} onClose={closeBooking} />
      ) : null}
    </AnimatePresence>
  );
}
