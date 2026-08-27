'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Building2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from 'lucide-react'

import {
  register,
  verifyOtp,
  checkEmail,
} from '@/lib/api/auth'

const steps = [
  {
    number: '01',
    label: 'Your details',
  },
  {
    number: '02',
    label: 'Your company',
  },
  {
    number: '03',
    label: 'Password',
  },
]

export default function SignupPage() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [emailAvailable, setEmailAvailable] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    otp: '',
  })

  /* ============================================================
     EMAIL VALIDATION
  ============================================================ */

  useEffect(() => {
    if (step !== 1) return

    if (!form.email) {
      setEmailAvailable(false)
      return
    }

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

    if (!validEmail) {
      setEmailAvailable(false)
      return
    }

    const timer = window.setTimeout(async () => {
      setCheckingEmail(true)
      setError('')

      try {
        await checkEmail(form.email)
        setEmailAvailable(true)
      } catch (err: any) {
        setEmailAvailable(false)

        setError(
          err?.message ||
            'This email address cannot be used.'
        )
      } finally {
        setCheckingEmail(false)
      }
    }, 550)

    return () => window.clearTimeout(timer)
  }, [form.email, step])

  /* ============================================================
     PASSWORD STRENGTH
  ============================================================ */

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 8,
      letter: /[A-Za-z]/.test(form.password),
      number: /\d/.test(form.password),
    }),
    [form.password]
  )

  const passwordScore =
    Object.values(passwordChecks).filter(Boolean).length

  /* ============================================================
     HELPERS
  ============================================================ */

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm(current => ({
      ...current,
      [field]: value,
    }))

    setError('')
    setSuccess('')
  }

  const nextStep = () => {
    setError('')
    setSuccess('')
    setStep(current => current + 1)
  }

  const previousStep = () => {
    setError('')
    setSuccess('')
    setStep(current => current - 1)
  }

  /* ============================================================
     FORM SUBMISSION
  ============================================================ */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    /* ---------------- STEP 1 ---------------- */

    if (step === 1) {
      if (!form.name.trim()) {
        setError('Please enter your full name.')
        return
      }

      if (!emailAvailable) {
        setError(
          'Please enter a valid and available work email.'
        )
        return
      }

      nextStep()
      return
    }

    /* ---------------- STEP 2 ---------------- */

    if (step === 2) {
      if (!form.company.trim()) {
        setError('Please enter your company name.')
        return
      }

      nextStep()
      return
    }

    /* ---------------- STEP 3 ---------------- */

    if (step === 3) {
      if (form.password.length < 8) {
        setError(
          'Your password must be at least 8 characters.'
        )
        return
      }

      setLoading(true)

      try {
        const res = await register({
          name: form.name,
          email: form.email,
          companyName: form.company,
          password: form.password,
        })

        if (res.data?.token) {
          localStorage.setItem(
            'registrationToken',
            res.data.token
          )
        }

        setStep(4)
      } catch (err: any) {
        setError(
          err?.message ||
            'We could not create your account. Please try again.'
        )
      } finally {
        setLoading(false)
      }

      return
    }

    /* ---------------- STEP 4 ---------------- */

    if (step === 4) {
      if (!form.otp.trim()) {
        setError('Please enter the verification code.')
        return
      }

      const registrationToken =
        localStorage.getItem('registrationToken')

      if (!registrationToken) {
        setError(
          'Your registration session has expired. Please start again.'
        )
        return
      }

      setLoading(true)

      try {
        const res = await verifyOtp(
          registrationToken,
          form.otp
        )

        if (res.data?.token) {
          localStorage.setItem(
            'token',
            res.data.token
          )

          localStorage.removeItem(
            'registrationToken'
          )
        }

        setSuccess(
          res.message ||
            'Your email has been verified successfully.'
        )

        window.setTimeout(() => {
          router.push('/onboarding')
        }, 900)
      } catch (err: any) {
        setError(
          err?.message ||
            'That verification code is not valid.'
        )
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <style jsx>{`

        /* ==========================================================
           ROOT
        ========================================================== */

        .signup {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;

          animation:
            page-enter
            .65s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes page-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ==========================================================
           HEADER
        ========================================================== */

        .header {
          margin-bottom: 28px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 13px;

          color: #a47f25;

          font-size: 11px;
          font-weight: 800;

          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #b99535;

          box-shadow:
            0 0 0 4px
            rgba(185,149,53,.10);

          animation:
            pulse-dot
            2.5s
            ease-in-out
            infinite;
        }

        @keyframes pulse-dot {
          0%,
          100% {
            box-shadow:
              0 0 0 4px
              rgba(185,149,53,.10);
          }

          50% {
            box-shadow:
              0 0 0 7px
              rgba(185,149,53,.025);
          }
        }

        .title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;
        }

        .title {
          margin: 0;

          color: #10220d;

          font-size: clamp(34px, 4vw, 44px);
          line-height: 1.02;

          font-weight: 650;

          letter-spacing: -.055em;
        }

        .subtitle {
          max-width: 390px;

          margin:
            12px
            0
            0;

          color: #657064;

          font-size: 14px;
          line-height: 1.65;
        }

        .trial {
          flex-shrink: 0;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding:
            9px
            12px;

          border:
            1px solid
            rgba(46,125,82,.20);

          border-radius: 999px;

          color: #28704a;

          background:
            rgba(46,125,82,.055);

          font-size: 9px;
          font-weight: 800;

          letter-spacing: .08em;

          white-space: nowrap;
        }

        /* ==========================================================
           PROGRESS
        ========================================================== */

        .progress {
          position: relative;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 12px;

          margin-top: 30px;
        }

        .progress-item {
          position: relative;

          padding-top: 12px;

          border-top:
            2px solid
            #e3e7e0;

          transition:
            border-color .35s ease;
        }

        .progress-item.active {
          border-color: #10220d;
        }

        .progress-item.done {
          border-color: #b99535;
        }

        .progress-number {
          display: flex;
          align-items: center;

          width: 22px;
          height: 22px;

          margin-bottom: 7px;

          color: #9aa39a;

          font-size: 9px;
          font-weight: 800;

          transition:
            color .3s ease,
            background .3s ease;
        }

        .progress-item.active
        .progress-number {
          color: #10220d;
        }

        .progress-item.done
        .progress-number {
          color: #927326;
        }

        .progress-label {
          color: #9aa39a;

          font-size: 11px;
          font-weight: 600;

          transition:
            color .3s ease;
        }

        .progress-item.active
        .progress-label {
          color: #10220d;
          font-weight: 750;
        }

        .progress-item.done
        .progress-label {
          color: #536052;
        }

        /* ==========================================================
           CARD
        ========================================================== */

        .card {
          position: relative;

          padding:
            34px;

          border:
            1px solid
            rgba(16,34,13,.095);

          border-radius: 24px;

          background:
            rgba(255,255,255,.94);

          box-shadow:
            0 24px 70px
            rgba(16,34,13,.075);

          backdrop-filter: blur(12px);

          animation:
            card-enter
            .7s
            .08s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform:
              translateY(16px)
              scale(.985);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        .card::before {
          content: "";

          position: absolute;

          top: -1px;
          left: 15%;
          right: 15%;

          height: 2px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #b99535 35%,
              #b99535 65%,
              transparent
            );
        }

        /* ==========================================================
           MESSAGES
        ========================================================== */

        .message {
          display: flex;
          align-items: flex-start;

          gap: 11px;

          padding:
            13px
            14px;

          margin-bottom: 22px;

          border-radius: 13px;

          font-size: 12px;
          line-height: 1.55;

          animation:
            message-enter
            .3s
            ease both;
        }

        @keyframes message-enter {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error {
          color: #963f35;

          border:
            1px solid
            rgba(150,63,53,.14);

          background:
            #fff8f7;
        }

        .success {
          color: #27734c;

          border:
            1px solid
            rgba(39,115,76,.15);

          background:
            #f5fbf7;
        }

        .message-icon {
          flex-shrink: 0;

          margin-top: 1px;
        }

        /* ==========================================================
           STEP ANIMATION
        ========================================================== */

        .step-content {
          animation:
            step-enter
            .4s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes step-enter {
          from {
            opacity: 0;
            transform:
              translateX(10px);
          }

          to {
            opacity: 1;
            transform:
              translateX(0);
          }
        }

        /* ==========================================================
           FORM FIELDS
        ========================================================== */

        .field {
          margin-bottom: 22px;
        }

        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 9px;
        }

        .label {
          color: #344032;

          font-size: 11px;
          font-weight: 800;

          letter-spacing: .06em;
        }

        .hint {
          color: #a27d28;

          font-size: 10px;
          font-weight: 700;
        }

        .input-wrap {
          position: relative;
        }

        .icon {
          position: absolute;

          left: 17px;
          top: 50%;

          z-index: 2;

          transform:
            translateY(-50%);

          color: #9aa49a;

          pointer-events: none;

          transition:
            color .2s ease;
        }

        .input-wrap:focus-within
        .icon {
          color: #a27d28;
        }

        .input {
          width: 100%;
          height: 58px;

          padding:
            0
            17px;

          border:
            1px solid
            #d9dfd6;

          border-radius: 14px;

          outline: none;

          background: #fff;

          color: #10220d;

          font-family: inherit;

          font-size: 15px;
          font-weight: 500;

          box-shadow:
            0 1px 2px
            rgba(16,34,13,.02);

          transition:
            border-color .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            transform .22s ease;
        }

        .input:hover {
          border-color: #c5cec2;
        }

        .input:focus {
          border-color: #b99535;

          background: #fff;

          box-shadow:
            0 0 0 4px
            rgba(185,149,53,.09),
            0 4px 14px
            rgba(16,34,13,.035);
        }

        .input::placeholder {
          color: #a7afa6;
          font-weight: 400;
        }

        .input-icon {
          padding-left: 48px;
        }

        .email-valid {
          padding-right: 50px;

          border-color:
            rgba(46,125,82,.40);
        }

        .valid {
          position: absolute;

          right: 17px;
          top: 50%;

          transform:
            translateY(-50%);

          color: #2e7d52;
        }

        /* ==========================================================
           PASSWORD
        ========================================================== */

        .password-toggle {
          position: absolute;

          right: 7px;
          top: 50%;

          width: 42px;
          height: 42px;

          transform:
            translateY(-50%);

          display: grid;
          place-items: center;

          border: 0;

          border-radius: 10px;

          background: transparent;

          color: #929b91;

          cursor: pointer;

          transition:
            color .2s ease,
            background .2s ease;
        }

        .password-toggle:hover {
          color: #10220d;

          background:
            #f0f2ed;
        }

        /* ==========================================================
           PASSWORD METER
        ========================================================== */

        .meter {
          margin-top: 12px;
        }

        .meter-bars {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 5px;
        }

        .meter-bar {
          height: 4px;

          border-radius: 999px;

          background: #e5e9e3;

          transition:
            background .3s ease,
            transform .3s ease;
        }

        .meter-bar.active {
          background: #b99535;

          transform:
            scaleY(1.2);
        }

        .meter-caption {
          display: flex;
          justify-content: space-between;

          margin-top: 7px;

          color: #8f988e;

          font-size: 10px;
        }

        .rules {
          display: flex;
          flex-wrap: wrap;

          gap: 12px;

          margin-top: 10px;
        }

        .rule {
          display: inline-flex;
          align-items: center;

          gap: 5px;

          color: #9aa29a;

          font-size: 10px;
        }

        .rule.valid-rule {
          color: #2e7d52;
        }

        /* ==========================================================
           INFORMATION BOX
        ========================================================== */

        .info {
          display: flex;
          align-items: flex-start;

          gap: 12px;

          padding:
            15px;

          margin:
            4px
            0
            22px;

          border:
            1px solid
            rgba(16,34,13,.075);

          border-radius: 14px;

          background:
            #f7f7f3;
        }

        .info-icon {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border-radius: 10px;

          color: #a27d28;

          background:
            rgba(185,149,53,.10);
        }

        .info-title {
          display: block;

          margin-bottom: 4px;

          color: #263324;

          font-size: 11px;
          font-weight: 750;
        }

        .info-text {
          margin: 0;

          color: #707a6f;

          font-size: 11px;
          line-height: 1.6;
        }

        /* ==========================================================
           BUTTONS
        ========================================================== */

        .button {
          width: 100%;
          height: 56px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          border: 0;

          border-radius: 13px;

          font-family: inherit;

          font-size: 13px;
          font-weight: 750;

          cursor: pointer;

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            opacity .22s ease;
        }

        .primary {
          color: #f8f6ee;

          background:
            #10220d;

          box-shadow:
            0 10px 24px
            rgba(16,34,13,.12);
        }

        .primary:hover:not(:disabled) {
          transform:
            translateY(-2px);

          box-shadow:
            0 15px 32px
            rgba(16,34,13,.17);
        }

        .primary:active:not(:disabled) {
          transform:
            translateY(0);
        }

        .primary:disabled {
          opacity: .40;

          cursor: not-allowed;

          box-shadow: none;
        }

        .secondary {
          color: #263324;

          background:
            #eef1eb;
        }

        .secondary:hover {
          background:
            #e6eae3;
        }

        .actions {
          display: grid;

          grid-template-columns:
            110px
            1fr;

          gap: 10px;
        }

        .back {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;
        }

        /* ==========================================================
           AGREEMENT
        ========================================================== */

        .agreement {
          max-width: 390px;

          margin:
            14px
            auto
            0;

          color: #8b938a;

          font-size: 10px;

          line-height: 1.65;

          text-align: center;
        }

        .agreement a {
          color: #344032;

          font-weight: 700;

          text-decoration: none;
        }

        .agreement a:hover {
          color: #a27d28;
        }

        /* ==========================================================
           LOGIN
        ========================================================== */

        .bottom {
          margin:
            22px
            0
            0;

          color: #697268;

          font-size: 12px;

          text-align: center;
        }

        .bottom a {
          color: #10220d;

          font-weight: 800;

          text-decoration: none;

          transition: color .2s ease;
        }

        .bottom a:hover {
          color: #a27d28;
        }

        /* ==========================================================
           SECURITY FOOTER
        ========================================================== */

        .secure {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          margin-top: 13px;

          color: #a0a79f;

          font-size: 9px;
        }

        .secure svg {
          color: #2e7d52;
        }

        /* ==========================================================
           OTP
        ========================================================== */

        .otp {
          padding:
            8px
            2px
            2px;

          text-align: center;
        }

        .otp-icon {
          position: relative;

          width: 62px;
          height: 62px;

          display: grid;
          place-items: center;

          margin:
            0
            auto
            20px;

          border-radius: 18px;

          color: #a27d28;

          background:
            rgba(185,149,53,.09);

          animation:
            otp-float
            3s
            ease-in-out
            infinite;
        }

        @keyframes otp-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        .otp-title {
          margin:
            0
            0
            9px;

          color: #10220d;

          font-size: 27px;
          line-height: 1.1;

          font-weight: 650;

          letter-spacing: -.045em;
        }

        .otp-text {
          max-width: 370px;

          margin:
            0
            auto;

          color: #687267;

          font-size: 13px;

          line-height: 1.7;
        }

        .otp-text strong {
          color: #263324;
          font-weight: 750;
        }

        .otp-input {
          margin-top: 24px;

          height: 64px;

          text-align: center;

          letter-spacing: .42em;

          font-size: 24px;
          font-weight: 800;

          padding-left: 20px;
        }

        /* ==========================================================
           MOBILE
        ========================================================== */

        @media (max-width: 640px) {

          .signup {
            max-width: none;
          }

          .title {
            font-size: 34px;
          }

          .title-row {
            display: block;
          }

          .trial {
            margin-top: 15px;
          }

          .card {
            padding: 25px 20px;

            border-radius: 20px;
          }

          .progress {
            gap: 7px;
          }

          .progress-label {
            font-size: 10px;
          }

          .actions {
            grid-template-columns: 1fr;
          }

          .secondary {
            order: 2;
          }
        }

        @media (max-width: 420px) {

          .title {
            font-size: 31px;
          }

          .subtitle {
            font-size: 13px;
          }

          .trial {
            font-size: 8px;
          }

          .progress-label {
            font-size: 9px;
          }

          .card {
            padding:
              22px
              17px;
          }

          .input {
            height: 55px;
          }

          .button {
            height: 54px;
          }

          .rules {
            gap: 8px;
          }
        }

        /* ==========================================================
           REDUCED MOTION
        ========================================================== */

        @media (prefers-reduced-motion: reduce) {

          .signup,
          .card,
          .step-content,
          .message,
          .otp-icon,
          .eyebrow-dot {
            animation: none !important;
          }

          * {
            transition: none !important;
          }
        }

        /* ==========================================================
           SPINNER
        ========================================================== */

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

      `}</style>

      <div className="signup">

        {/* ========================================================
            HEADER
        ======================================================== */}

        <header className="header">

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            GET STARTED
          </div>

          <div className="title-row">

            <div>

              <h1 className="title">
                {step === 4
                  ? 'Verify your email'
                  : 'Create your account'}
              </h1>

              {step !== 4 && (
                <p className="subtitle">
                  Get Haelo working for your team
                  in just a few simple steps.
                </p>
              )}

            </div>

            {step !== 4 && (
              <div className="trial">
                <Sparkles size={11} />
                30 DAYS FREE
              </div>
            )}

          </div>

          {/* ======================================================
              PROGRESS
          ====================================================== */}

          {step !== 4 && (
            <div className="progress">

              {steps.map(item => {

                const itemNumber =
                  Number(item.number)

                const isActive =
                  itemNumber === step

                const isDone =
                  itemNumber < step

                return (
                  <div
                    key={item.number}
                    className={[
                      'progress-item',
                      isActive
                        ? 'active'
                        : '',
                      isDone
                        ? 'done'
                        : '',
                    ].join(' ')}
                  >

                    <span className="progress-number">
                      {isDone
                        ? '✓'
                        : item.number}
                    </span>

                    <span className="progress-label">
                      {item.label}
                    </span>

                  </div>
                )
              })}

            </div>
          )}

        </header>

        {/* ========================================================
            FORM CARD
        ======================================================== */}

        <section className="card">

          {/* ERROR */}

          {error && (
            <div
              className="message error"
              role="alert"
            >
              <AlertCircle
                className="message-icon"
                size={16}
              />

              <span>
                {error}
              </span>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div
              className="message success"
              role="status"
            >
              <Check
                className="message-icon"
                size={16}
              />

              <span>
                {success}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div
              className="step-content"
              key={step}
            >

              {/* ==================================================
                  STEP 1 — DETAILS
              ================================================== */}

              {step === 1 && (
                <>

                  <div className="field">

                    <div className="label-row">

                      <label
                        htmlFor="name"
                        className="label"
                      >
                        FULL NAME
                      </label>

                    </div>

                    <div className="input-wrap">

                      <Sparkles
                        className="icon"
                        size={17}
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Adaeze Okonkwo"
                        value={form.name}
                        onChange={e =>
                          updateField(
                            'name',
                            e.target.value
                          )
                        }
                        className="input input-icon"
                        required
                        autoFocus
                      />

                    </div>

                  </div>

                  <div className="field">

                    <div className="label-row">

                      <label
                        htmlFor="email"
                        className="label"
                      >
                        WORK EMAIL
                      </label>

                      {checkingEmail && (
                        <span className="hint">
                          Checking...
                        </span>
                      )}

                      {!checkingEmail &&
                        emailAvailable && (
                          <span className="hint">
                            Email available
                          </span>
                        )}

                    </div>

                    <div className="input-wrap">

                      <Mail
                        className="icon"
                        size={17}
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="adaeze@company.com"
                        value={form.email}
                        onChange={e =>
                          updateField(
                            'email',
                            e.target.value
                          )
                        }
                        className={[
                          'input',
                          'input-icon',
                          emailAvailable
                            ? 'email-valid'
                            : '',
                        ].join(' ')}
                        required
                      />

                      {checkingEmail && (
                        <Loader2
                          className="valid"
                          size={17}
                          style={{
                            animation:
                              'spin 1s linear infinite',
                          }}
                        />
                      )}

                      {!checkingEmail &&
                        emailAvailable && (
                          <Check
                            className="valid"
                            size={18}
                          />
                        )}

                    </div>

                  </div>

                  <div className="info">

                    <div className="info-icon">
                      <ShieldCheck size={17} />
                    </div>

                    <div>

                      <span className="info-title">
                        Your information is secure.
                      </span>

                      <p className="info-text">
                        We&apos;ll use your work email
                        to create your account and
                        verify your identity.
                      </p>

                    </div>

                  </div>

                  <button
                    type="submit"
                    className="button primary"
                    disabled={
                      !form.name.trim() ||
                      !emailAvailable ||
                      checkingEmail
                    }
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>

                </>
              )}

              {/* ==================================================
                  STEP 2 — COMPANY
              ================================================== */}

              {step === 2 && (
                <>

                  <div className="field">

                    <div className="label-row">

                      <label
                        htmlFor="company"
                        className="label"
                      >
                        COMPANY NAME
                      </label>

                    </div>

                    <div className="input-wrap">

                      <Building2
                        className="icon"
                        size={17}
                      />

                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Corporation"
                        value={form.company}
                        onChange={e =>
                          updateField(
                            'company',
                            e.target.value
                          )
                        }
                        className="input input-icon"
                        required
                        autoFocus
                      />

                    </div>

                  </div>

                  <div className="info">

                    <div className="info-icon">
                      <Building2 size={17} />
                    </div>

                    <div>

                      <span className="info-title">
                        Tell us where you work.
                      </span>

                      <p className="info-text">
                        Your company name helps
                        Haelo personalise your
                        workspace. You&apos;ll connect
                        your business tools during
                        onboarding.
                      </p>

                    </div>

                  </div>

                  <div className="actions">

                    <button
                      type="button"
                      className="button secondary back"
                      onClick={previousStep}
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="button primary"
                    >
                      Continue
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </>
              )}

              {/* ==================================================
                  STEP 3 — PASSWORD
              ================================================== */}

              {step === 3 && (
                <>

                  <div className="field">

                    <div className="label-row">

                      <label
                        htmlFor="password"
                        className="label"
                      >
                        PASSWORD
                      </label>

                      <span className="hint">
                        At least 8 characters
                      </span>

                    </div>

                    <div className="input-wrap">

                      <LockKeyhole
                        className="icon"
                        size={17}
                      />

                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        autoComplete="new-password"
                        placeholder="Create a secure password"
                        value={form.password}
                        onChange={e =>
                          updateField(
                            'password',
                            e.target.value
                          )
                        }
                        className="input input-icon"
                        style={{
                          paddingRight: 52,
                        }}
                        required
                        minLength={8}
                        autoFocus
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            current => !current
                          )
                        }
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                    </div>

                    {/* PASSWORD STRENGTH */}

                    <div className="meter">

                      <div className="meter-bars">

                        {[1, 2, 3].map(number => (
                          <span
                            key={number}
                            className={[
                              'meter-bar',
                              passwordScore >= number
                                ? 'active'
                                : '',
                            ].join(' ')}
                          />
                        ))}

                      </div>

                      <div className="meter-caption">

                        <span>
                          {passwordScore === 0
                            ? 'Enter a password'
                            : passwordScore === 3
                              ? 'Strong password'
                              : 'Keep going'}
                        </span>

                        <span>
                          {passwordScore}/3
                        </span>

                      </div>

                    </div>

                    <div className="rules">

                      <span
                        className={[
                          'rule',
                          passwordChecks.length
                            ? 'valid-rule'
                            : '',
                        ].join(' ')}
                      >
                        <Check size={11} />
                        8+ characters
                      </span>

                      <span
                        className={[
                          'rule',
                          passwordChecks.letter
                            ? 'valid-rule'
                            : '',
                        ].join(' ')}
                      >
                        <Check size={11} />
                        A letter
                      </span>

                      <span
                        className={[
                          'rule',
                          passwordChecks.number
                            ? 'valid-rule'
                            : '',
                        ].join(' ')}
                      >
                        <Check size={11} />
                        A number
                      </span>

                    </div>

                  </div>

                  <div className="info">

                    <div className="info-icon">
                      <ShieldCheck size={17} />
                    </div>

                    <div>

                      <span className="info-title">
                        Almost there.
                      </span>

                      <p className="info-text">
                        Create your password and
                        we&apos;ll send a verification
                        code to your work email.
                      </p>

                    </div>

                  </div>

                  <div className="actions">

                    <button
                      type="button"
                      className="button secondary back"
                      onClick={previousStep}
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="button primary"
                      disabled={
                        loading ||
                        passwordScore < 2
                      }
                    >

                      {loading ? (
                        <>
                          <Loader2
                            size={16}
                            style={{
                              animation:
                                'spin 1s linear infinite',
                            }}
                          />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight size={16} />
                        </>
                      )}

                    </button>

                  </div>

                  <p className="agreement">
                    By continuing, you agree to our{' '}
                    <Link href="/terms">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy">
                      Privacy Policy
                    </Link>
                    .
                  </p>

                </>
              )}

              {/* ==================================================
                  STEP 4 — EMAIL VERIFICATION
              ================================================== */}

              {step === 4 && (
                <div className="otp">

                  <div className="otp-icon">
                    <Mail size={24} />
                  </div>

                  <h2 className="otp-title">
                    Check your inbox
                  </h2>

                  <p className="otp-text">
                    We sent a verification code to{' '}
                    <strong>
                      {form.email}
                    </strong>
                    . Enter the code below to
                    finish creating your account.
                  </p>

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={8}
                    placeholder="000000"
                    value={form.otp}
                    onChange={e =>
                      updateField(
                        'otp',
                        e.target.value.replace(
                          /\D/g,
                          ''
                        )
                      )
                    }
                    className="input otp-input"
                    required
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="button primary"
                    style={{
                      marginTop: 16,
                    }}
                    disabled={
                      loading ||
                      form.otp.length < 4
                    }
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={16}
                          style={{
                            animation:
                              'spin 1s linear infinite',
                          }}
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify email
                        <ArrowRight size={16} />
                      </>
                    )}

                  </button>

                  <button
                    type="button"
                    className="button secondary"
                    style={{
                      marginTop: 10,
                    }}
                    onClick={() => {

                      localStorage.removeItem(
                        'registrationToken'
                      )

                      setForm(current => ({
                        ...current,
                        otp: '',
                      }))

                      setError('')
                      setSuccess('')
                      setStep(1)

                    }}
                  >
                    Start again
                  </button>

                </div>
              )}

            </div>

          </form>

        </section>

        {/* ========================================================
            FOOTER
        ======================================================== */}

        {step !== 4 && (
          <p className="bottom">
            Already have an account?{' '}
            <Link href="/auth/login">
              Sign in
            </Link>
          </p>
        )}

        <div className="secure">
          <ShieldCheck size={11} />
          Secure account creation
          <span>·</span>
          No credit card required
        </div>

      </div>
    </>
  )
}