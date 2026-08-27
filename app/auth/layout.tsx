import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Haelo — Sign in',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-shell">

      <style>{`

        /* ==========================================================
           ROOT
        ========================================================== */

        .auth-shell {
          min-height: 100vh;
          display: flex;
          overflow: hidden;

          background: #f6f5f0;
        }

        /* ==========================================================
           LEFT BRAND PANEL
        ========================================================== */

        .brand-panel {
          position: relative;

          width: 50%;
          min-height: 100vh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 42px 48px;

          overflow: hidden;

          background:
            #0c1b2a;

          color: white;
        }

        /*
         * Ambient background lighting
         */

        .ambient {
          position: absolute;

          width: 650px;
          height: 650px;

          left: -220px;
          bottom: -240px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(112, 221, 152, .13),
              transparent 65%
            );

          pointer-events: none;

          animation:
            ambient-float
            9s
            ease-in-out
            infinite;
        }

        .ambient-two {
          position: absolute;

          width: 550px;
          height: 550px;

          right: -300px;
          top: -250px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(185,149,53,.12),
              transparent 65%
            );

          pointer-events: none;

          animation:
            ambient-float-two
            11s
            ease-in-out
            infinite;
        }

        @keyframes ambient-float {
          0%,
          100% {
            transform: translate3d(0,0,0);
          }

          50% {
            transform: translate3d(25px,-20px,0);
          }
        }

        @keyframes ambient-float-two {
          0%,
          100% {
            transform: translate3d(0,0,0);
          }

          50% {
            transform: translate3d(-20px,25px,0);
          }
        }

        /*
         * Fine grid
         */

        .grid {
          position: absolute;

          inset: 0;

          opacity: .045;

          background-image:
            linear-gradient(
              rgba(255,255,255,.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.7) 1px,
              transparent 1px
            );

          background-size:
            54px 54px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 85%
            );

          pointer-events: none;
        }

        /* ==========================================================
           LOGO
        ========================================================== */

        .brand-header {
          position: relative;
          z-index: 5;

          animation:
            fade-down
            .7s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes fade-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-link {
          display: inline-flex;

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .brand-link:hover {
          opacity: .82;

          transform:
            translateY(-1px);
        }

        /* ==========================================================
           BRAND CONTENT
        ========================================================== */

        .brand-content {
          position: relative;
          z-index: 4;

          width: 100%;
          max-width: 600px;

          margin:
            auto
            0;

          padding:
            70px
            0
            55px;

          animation:
            content-enter
            .8s
            .08s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes content-enter {
          from {
            opacity: 0;
            transform:
              translateY(22px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          margin-bottom: 18px;

          color: #7de0a1;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: .17em;

          text-transform: uppercase;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #7de0a1;

          box-shadow:
            0 0 0 5px
            rgba(125,224,161,.08);
        }

        .brand-title {
          max-width: 540px;

          margin: 0;

          color: #ffffff;

          font-size:
            clamp(
              42px,
              4.2vw,
              62px
            );

          line-height: .98;

          font-weight: 600;

          letter-spacing: -.055em;
        }

        .brand-title span {
          color: #a9b5ad;
        }

        .brand-description {
          max-width: 475px;

          margin:
            22px
            0
            0;

          color:
            rgba(255,255,255,.60);

          font-size: 15px;

          line-height: 1.75;

          font-weight: 400;
        }

        /* ==========================================================
           WORKFLOW VISUAL
        ========================================================== */

        .workflow {
          position: relative;

          width: 100%;

          margin-top: 42px;

          padding: 20px;

          border:
            1px solid
            rgba(255,255,255,.10);

          border-radius: 20px;

          background:
            rgba(255,255,255,.045);

          box-shadow:
            0 30px 80px
            rgba(0,0,0,.16);

          backdrop-filter:
            blur(18px);

          animation:
            workflow-enter
            .9s
            .22s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes workflow-enter {
          from {
            opacity: 0;
            transform:
              translateY(18px)
              scale(.985);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        .workflow-label {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 15px;
        }

        .workflow-label span:first-child {
          color:
            rgba(255,255,255,.42);

          font-size: 9px;
          font-weight: 800;

          letter-spacing: .12em;

          text-transform: uppercase;
        }

        .live {
          display: inline-flex;
          align-items: center;

          gap: 6px;

          color: #7de0a1;

          font-size: 9px;
          font-weight: 700;
        }

        .live-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #7de0a1;

          animation:
            live-pulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes live-pulse {
          0%,
          100% {
            opacity: .45;
            transform: scale(.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .workflow-grid {
          display: grid;

          grid-template-columns:
            1fr
            38px
            1fr;

          align-items: center;

          gap: 12px;
        }

        .workflow-card {
          min-height: 115px;

          padding: 15px;

          border:
            1px solid
            rgba(255,255,255,.08);

          border-radius: 14px;

          background:
            rgba(255,255,255,.045);
        }

        .workflow-card-header {
          display: flex;
          align-items: center;

          gap: 8px;

          margin-bottom: 12px;
        }

        .workflow-icon {
          width: 25px;
          height: 25px;

          display: grid;
          place-items: center;

          border-radius: 7px;

          color: #aeb9b1;

          background:
            rgba(255,255,255,.07);
        }

        .workflow-card-header span {
          color:
            rgba(255,255,255,.48);

          font-size: 9px;
          font-weight: 700;
        }

        .workflow-main {
          color: rgba(255,255,255,.84);

          font-size: 11px;
          line-height: 1.55;
        }

        .workflow-sub {
          margin-top: 6px;

          color:
            rgba(255,255,255,.32);

          font-size: 9px;
          line-height: 1.5;
        }

        .workflow-arrow {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(125,224,161,.18);

          border-radius: 50%;

          color: #7de0a1;

          background:
            rgba(125,224,161,.07);

          animation:
            arrow-pulse
            2.8s
            ease-in-out
            infinite;
        }

        @keyframes arrow-pulse {
          0%,
          100% {
            transform: translateX(0);
            box-shadow:
              0 0 0 0
              rgba(125,224,161,.08);
          }

          50% {
            transform: translateX(3px);
            box-shadow:
              0 0 0 6px
              rgba(125,224,161,0);
          }
        }

        .approval {
          display: inline-flex;
          align-items: center;

          gap: 5px;

          margin-top: 10px;

          padding:
            5px
            8px;

          border-radius: 999px;

          color: #7de0a1;

          background:
            rgba(125,224,161,.08);

          font-size: 8px;
          font-weight: 800;
        }

        /* ==========================================================
           FOOTER
        ========================================================== */

        .brand-footer {
          position: relative;
          z-index: 4;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          color:
            rgba(255,255,255,.27);

          font-size: 10px;

          animation:
            fade-up
            .7s
            .25s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-status {
          display: inline-flex;
          align-items: center;

          gap: 6px;
        }

        .footer-status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #7de0a1;
        }

        /* ==========================================================
           RIGHT FORM PANEL
        ========================================================== */

        .form-panel {
          position: relative;

          width: 50%;

          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding:
            56px
            72px;

          background:
            #f7f6f2;

          overflow-y: auto;
        }

        /*
         * Very subtle background decoration
         */

        .form-glow {
          position: absolute;

          width: 520px;
          height: 520px;

          right: -270px;
          top: -240px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(185,149,53,.08),
              transparent 68%
            );

          pointer-events: none;
        }

        .form-inner {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: 520px;

          animation:
            form-enter
            .7s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        @keyframes form-enter {
          from {
            opacity: 0;
            transform:
              translateX(20px);
          }

          to {
            opacity: 1;
            transform:
              translateX(0);
          }
        }

        /* ==========================================================
           MOBILE LOGO
        ========================================================== */

        .mobile-logo {
          display: none;

          margin-bottom: 34px;
        }

        /* ==========================================================
           RESPONSIVE
        ========================================================== */

        @media (max-width: 1100px) {

          .brand-panel {
            padding:
              36px;
          }

          .form-panel {
            padding:
              45px;
          }

          .brand-title {
            font-size:
              clamp(
                38px,
                4vw,
                52px
              );
          }

          .brand-description {
            font-size: 14px;
          }
        }

        @media (max-width: 900px) {

          .auth-shell {
            display: block;
          }

          .brand-panel {
            display: none;
          }

          .form-panel {
            width: 100%;
            min-height: 100vh;

            padding:
              32px
              24px;
          }

          .mobile-logo {
            display: inline-flex;
          }

          .form-inner {
            max-width: 520px;
          }
        }

        @media (max-width: 480px) {

          .form-panel {
            align-items: flex-start;

            padding:
              25px
              18px;
          }

          .mobile-logo {
            margin-bottom: 27px;
          }
        }

        /* ==========================================================
           REDUCED MOTION
        ========================================================== */

        @media (prefers-reduced-motion: reduce) {

          .ambient,
          .ambient-two,
          .brand-header,
          .brand-content,
          .workflow,
          .live-dot,
          .workflow-arrow,
          .brand-footer,
          .form-inner {
            animation: none !important;
          }

          * {
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }

      `}</style>

      {/* ============================================================
          LEFT — BRAND EXPERIENCE
      ============================================================ */}

      <aside className="brand-panel">

        <div className="grid" />

        <div className="ambient" />
        <div className="ambient-two" />

        {/* Logo */}

        <div className="brand-header">

          <Link
            href="/"
            className="brand-link"
          >
            <Logo
              variant="white-on-navy"
              size="md"
            />
          </Link>

        </div>

        {/* Main content */}

        <div className="brand-content">

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Intelligent operations
          </div>

          <h2 className="brand-title">
            Your business,
            <br />
            <span>always within reach.</span>
          </h2>

          <p className="brand-description">
            Haelo keeps your team connected to the
            information that matters. It reads your
            internal communication, understands the
            context and brings the right actions to you.
          </p>

          {/* Workflow */}

          <div className="workflow">

            <div className="workflow-label">

              <span>
                How Haelo works
              </span>

              <span className="live">
                <span className="live-dot" />
                Active
              </span>

            </div>

            <div className="workflow-grid">

              {/* Email */}

              <div className="workflow-card">

                <div className="workflow-card-header">

                  <div className="workflow-icon">
                    <span style={{
                      fontSize: 12,
                    }}>
                      @
                    </span>
                  </div>

                  <span>
                    Internal email
                  </span>

                </div>

                <div className="workflow-main">
                  Approval needed for
                  tomorrow&apos;s operation.
                </div>

                <div className="workflow-sub">
                  Haelo understands the context.
                </div>

              </div>

              {/* Arrow */}

              <div className="workflow-arrow">
                →
              </div>

              {/* WhatsApp */}

              <div className="workflow-card">

                <div className="workflow-card-header">

                  <div className="workflow-icon">
                    <span style={{
                      fontSize: 11,
                    }}>
                      ✓
                    </span>
                  </div>

                  <span>
                    Your approval
                  </span>

                </div>

                <div className="workflow-main">
                  Review the request and
                  approve in one tap.
                </div>

                <div className="approval">
                  <span>✓</span>
                  Ready for you
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="brand-footer">

          <span>
            usehaelo.com
          </span>

          <span className="footer-status">
            <span className="footer-status-dot" />
            Built for modern teams
          </span>

        </div>

      </aside>

      {/* ============================================================
          RIGHT — AUTHENTICATION
      ============================================================ */}

      <main className="form-panel">

        <div className="form-glow" />

        <div className="form-inner">

          {/* Mobile logo */}

          <Link
            href="/"
            className="mobile-logo"
          >
            <Logo
              variant="lime-on-white"
              size="md"
            />
          </Link>

          {children}

        </div>

      </main>

    </div>
  )
}