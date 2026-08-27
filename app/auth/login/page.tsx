'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Mail,
  Clock3,
  Loader2,
} from 'lucide-react'

import { login as loginApi } from '@/lib/api/auth'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const canSubmit =
    email.includes('@') &&
    password.length > 0

  /* ============================================================
     LOGIN
  ============================================================ */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!canSubmit || loading) return

    setError('')
    setLoading(true)

    try {
      const res = await loginApi(
        email,
        password
      )

      if (res.data?.token) {
        localStorage.setItem(
          'token',
          res.data.token
        )
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(
        err?.message ||
          'We could not sign you in. Please check your details and try again.'
      )

      setLoading(false)
    }
  }

  return (
    <>
      <style>{`

        /* ========================================================
           LOGIN FORM
        ======================================================== */

        .haelo-login {
          width: 100%;
          max-width: 440px;

          margin: 0 auto;

          color: #11270b;

          animation:
            haeloLoginEnter
            .65s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes haeloLoginEnter {

          from {
            opacity: 0;
            transform:
              translateY(16px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }

        }

        /* ========================================================
           HEADER
        ======================================================== */

        .haelo-login-header {
          margin-bottom: 30px;
        }

        .haelo-login-eyebrow {
          margin-bottom: 11px;

          color: #a27d28;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: .14em;

          text-transform: uppercase;
        }

        .haelo-login-title {
          margin: 0;

          color: #11270b;

          font-size:
            clamp(
              32px,
              4vw,
              42px
            );

          line-height: 1.04;

          font-weight: 650;

          letter-spacing: -.055em;
        }

        .haelo-login-subtitle {
          margin:
            11px
            0
            0;

          color: #6d766b;

          font-size: 14px;

          line-height: 1.65;
        }

        /* ========================================================
           ERROR
        ======================================================== */

        .haelo-login-error {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          margin-bottom: 20px;

          padding:
            13px
            14px;

          border:
            1px solid
            rgba(163,60,50,.16);

          border-radius: 13px;

          color: #a33c32;

          background: #fff8f7;

          animation:
            haeloFadeUp
            .25s
            ease
            both;
        }

        .haelo-login-error-icon {
          flex: 0 0 auto;

          margin-top: 1px;
        }

        .haelo-login-error p {
          margin: 0;

          font-size: 12px;

          font-weight: 600;

          line-height: 1.5;

          overflow-wrap: anywhere;
        }

        @keyframes haeloFadeUp {

          from {
            opacity: 0;

            transform:
              translateY(5px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        /* ========================================================
           FORM
        ======================================================== */

        .haelo-login-form {
          display: flex;

          flex-direction: column;

          gap: 19px;
        }

        .haelo-login-field {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }

        .haelo-login-field-header {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;
        }

        .haelo-login-label {
          color: #374334;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: .055em;

          text-transform: uppercase;
        }

        .haelo-login-forgot {
          color: #777f76;

          font-size: 11px;

          font-weight: 700;

          text-decoration: none;

          transition:
            color .2s ease;
        }

        .haelo-login-forgot:hover {
          color: #11270b;
        }

        /* ========================================================
           INPUT
        ======================================================== */

        .haelo-login-input-wrap {
          position: relative;

          width: 100%;

          min-width: 0;
        }

        .haelo-login-input-icon {
          position: absolute;

          left: 17px;
          top: 50%;

          z-index: 2;

          transform:
            translateY(-50%);

          color: #9aa299;

          pointer-events: none;

          transition:
            color .2s ease;
        }

        .haelo-login-input-wrap:focus-within
        .haelo-login-input-icon {
          color: #a27d28;
        }

        .haelo-login-input {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height: 58px;

          padding:
            0
            48px;

          border:
            1px solid
            #d9ded6;

          border-radius: 14px;

          outline: none;

          color: #11270b;

          background: #fff;

          font-size: 15px;

          font-weight: 500;

          box-shadow:
            0 1px 2px
            rgba(17,39,11,.025);

          transition:
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .haelo-login-input:hover {
          border-color:
            #c4ccc0;
        }

        .haelo-login-input:focus {
          border-color:
            #b8962e;

          box-shadow:
            0 0 0 4px
            rgba(184,150,46,.09),
            0 6px 18px
            rgba(17,39,11,.035);
        }

        .haelo-login-input::placeholder {
          color:
            #a3aba2;

          font-weight:
            400;
        }

        /* ========================================================
           PASSWORD TOGGLE
        ======================================================== */

        .haelo-login-password-toggle {
          position: absolute;

          right: 7px;
          top: 50%;

          width: 42px;
          height: 42px;

          display: grid;

          place-items: center;

          transform:
            translateY(-50%);

          border: 0;

          border-radius: 10px;

          color:
            #8c958a;

          background:
            transparent;

          cursor: pointer;

          transition:
            color .2s ease,
            background .2s ease;
        }

        .haelo-login-password-toggle:hover {
          color:
            #11270b;

          background:
            #f0f2ed;
        }

        /* ========================================================
           SUBMIT
        ======================================================== */

        .haelo-login-submit {
          width: 100%;

          height: 58px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          margin-top: 2px;

          border: 0;

          border-radius: 14px;

          color: #fff;

          background: #11270b;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 25px
            rgba(17,39,11,.12);

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            opacity .22s ease;
        }

        .haelo-login-submit:hover:not(:disabled) {
          transform:
            translateY(-2px);

          background:
            #1b3a13;

          box-shadow:
            0 15px 32px
            rgba(17,39,11,.18);
        }

        .haelo-login-submit:active:not(:disabled) {
          transform:
            translateY(0);
        }

        .haelo-login-submit:disabled {
          opacity: .42;

          cursor:
            not-allowed;

          box-shadow:
            none;
        }

        /* ========================================================
           DIVIDER
        ======================================================== */

        .haelo-login-divider {
          display: flex;

          align-items: center;

          gap: 13px;

          margin:
            3px
            0;
        }

        .haelo-login-divider-line {
          flex: 1;

          height: 1px;

          background:
            rgba(17,39,11,.10);
        }

        .haelo-login-divider-text {
          color:
            #969d95;

          font-size: 11px;

          font-weight: 600;
        }

        /* ========================================================
           GOOGLE
        ======================================================== */

        .haelo-login-google {
          width: 100%;

          height: 56px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          border:
            1px solid
            #d9ded6;

          border-radius: 14px;

          color:
            #465044;

          background:
            transparent;

          font-size: 13px;

          font-weight: 700;

          cursor: pointer;

          transition:
            background .2s ease,
            border-color .2s ease,
            transform .2s ease,
            box-shadow .2s ease;
        }

        .haelo-login-google:hover {
          background:
            #fff;

          border-color:
            #c5ccc2;

          transform:
            translateY(-1px);

          box-shadow:
            0 7px 18px
            rgba(17,39,11,.06);
        }

        /* ========================================================
           BOTTOM
        ======================================================== */

        .haelo-login-signup {
          margin:
            23px
            0
            0;

          color:
            #707970;

          font-size:
            13px;

          text-align:
            center;
        }

        .haelo-login-signup a {
          color:
            #11270b;

          font-weight:
            800;

          text-decoration:
            none;

          transition:
            color .2s ease;
        }

        .haelo-login-signup a:hover {
          color:
            #a27d28;
        }

        .haelo-login-security {
          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 6px;

          margin-top:
            14px;

          color:
            #a0a79f;

          font-size:
            9px;
        }

        .haelo-login-security svg {
          color:
            #2e7d52;
        }

        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 900px) {

          .haelo-login {
            max-width:
              520px;
          }

        }

        @media (max-width: 480px) {

          .haelo-login {
            max-width:
              100%;
          }

          .haelo-login-title {
            font-size:
              32px;
          }

          .haelo-login-subtitle {
            font-size:
              13px;
          }

          .haelo-login-input {
            height:
              56px;

            font-size:
              14px;
          }

          .haelo-login-submit,
          .haelo-login-google {
            height:
              55px;
          }

          .haelo-login-signup {
            font-size:
              12px;
          }

        }

        @media (max-width: 360px) {

          .haelo-login-title {
            font-size:
              29px;
          }

          .haelo-login-label {
            font-size:
              10px;
          }

          .haelo-login-forgot {
            font-size:
              10px;
          }

        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {

          .haelo-login,
          .haelo-login-error {
            animation:
              none !important;
          }

          * {
            transition:
              none !important;
          }

        }

      `}</style>

      <div className="haelo-login">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="haelo-login-header">

          <div className="haelo-login-eyebrow">
            Welcome back
          </div>

          <h1 className="haelo-login-title">
            Sign in to Haelo
          </h1>

          <p className="haelo-login-subtitle">
            Your AI Chief of Staff is ready.
          </p>

        </div>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (

          <div
            className="haelo-login-error"
            role="alert"
          >

            <ShieldCheck
              className="haelo-login-error-icon"
              size={16}
            />

            <p>
              {error}
            </p>

          </div>

        )}

        {/* ======================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="haelo-login-form"
        >

          {/* EMAIL */}

          <div className="haelo-login-field">

            <div className="haelo-login-field-header">

              <label
                htmlFor="email"
                className="haelo-login-label"
              >
                Email address
              </label>

            </div>

            <div className="haelo-login-input-wrap">

              <Mail
                className="haelo-login-input-icon"
                size={17}
              />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                required
                placeholder="adaeze@company.com"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setError('')
                }}
                className="haelo-login-input"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="haelo-login-field">

            <div className="haelo-login-field-header">

              <label
                htmlFor="password"
                className="haelo-login-label"
              >
                Password
              </label>

              <Link
                href="/auth/forgot-password"
                className="haelo-login-forgot"
              >
                Forgot password?
              </Link>

            </div>

            <div className="haelo-login-input-wrap">

              <ShieldCheck
                className="haelo-login-input-icon"
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
                autoComplete="current-password"
                required
                placeholder="Your password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="haelo-login-input"
                style={{
                  paddingRight: 54,
                }}
              />

              <button
                type="button"
                className="haelo-login-password-toggle"
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

          </div>

          {/* SIGN IN */}

          <button
            type="submit"
            className="haelo-login-submit"
            disabled={
              !canSubmit ||
              loading
            }
          >

            {loading ? (

              <>
                <Loader2
                  size={17}
                  style={{
                    animation:
                      'spin .7s linear infinite',
                  }}
                />

                Signing in...
              </>

            ) : (

              <>
                Sign in

                <ArrowRight
                  size={17}
                />
              </>

            )}

          </button>

          {/* DIVIDER */}

          <div className="haelo-login-divider">

            <span className="haelo-login-divider-line" />

            <span className="haelo-login-divider-text">
              or
            </span>

            <span className="haelo-login-divider-line" />

          </div>

          {/* GOOGLE */}

          <button
            type="button"
            className="haelo-login-google"
          >

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path
                fill="#4285F4"
                d="
                  M22.56 12.25
                  c0-.78-.07-1.53-.2-2.25
                  H12v4.26h5.92
                  c-.26 1.37-1.04 2.53-2.21 3.31
                  v2.77h3.57
                  c2.08-1.92 3.28-4.74 3.28-8.09z
                "
              />

              <path
                fill="#34A853"
                d="
                  M12 23
                  c2.97 0 5.46-.98 7.28-2.66
                  l-3.57-2.77
                  c-.98.66-2.23 1.06-3.71 1.06
                  -2.86 0-5.29-1.93-6.16-4.53
                  H2.18v2.84
                  C3.99 20.53 7.7 23 12 23z
                "
              />

              <path
                fill="#FBBC05"
                d="
                  M5.84 14.09
                  c-.22-.66-.35-1.36-.35-2.09
                  s.13-1.43.35-2.09
                  V7.07H2.18
                  C1.43 8.55 1 10.22 1 12
                  s.43 3.45 1.18 4.93
                  l2.85-2.22.81-.62z
                "
              />

              <path
                fill="#EA4335"
                d="
                  M12 5.38
                  c1.62 0 3.06.56 4.21 1.64
                  l3.15-3.15
                  C17.45 2.09 14.97 1 12 1
                  7.7 1 3.99 3.47 2.18 7.07
                  l3.66 2.84
                  c.87-2.6 3.3-4.53 6.16-4.53z
                "
              />

            </svg>

            Continue with Google

          </button>

        </form>

        {/* ======================================================
            SIGN UP
        ====================================================== */}

        <p className="haelo-login-signup">

          No account yet?{' '}

          <Link href="/auth/signup">
            Start free trial
          </Link>

        </p>

        {/* ======================================================
            SECURITY
        ====================================================== */}

        <div className="haelo-login-security">

          <ShieldCheck size={11} />

          Secure sign in

          <span>·</span>

          <Clock3 size={10} />

          Takes less than a minute

        </div>

      </div>
    </>
  )
}