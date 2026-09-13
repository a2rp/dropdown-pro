import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        --ink: #f4f1ea;
        --muted: #9faaa7;
        --line: rgba(244, 241, 234, .13);
        --panel: rgba(19, 29, 30, .86);
        --accent: #c9f27a;
        --accent-dark: #93be3e;
        min-height: 100dvh;
        background:
            radial-gradient(circle at 83% 16%, rgba(201, 242, 122, .12), transparent 28rem),
            radial-gradient(circle at 8% 90%, rgba(90, 152, 147, .14), transparent 26rem),
            #0a1113;
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow: hidden;

        .topbar {
            height: 76px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 clamp(20px, 5vw, 76px);
            border-bottom: 1px solid var(--line);
        }
        .brand { display: flex; align-items: center; gap: 11px; font-size: 15px; font-weight: 750; letter-spacing: -.02em; }
        .brand-mark { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid rgba(201,242,122,.6); border-radius: 10px; color: var(--accent); font-size: 12px; letter-spacing: -.08em; }
        .topbar-meta { display: flex; gap: 12px; align-items: center; color: var(--muted); font-size: 12px; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
        .version { border: 1px solid var(--line); border-radius: 100px; padding: 5px 9px; color: var(--ink); }

        .shell { width: min(1240px, 100%); margin: 0 auto; padding: clamp(50px, 9vw, 116px) clamp(20px, 5vw, 76px) 60px; }
        .hero { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(340px, .75fr); gap: clamp(42px, 8vw, 120px); align-items: center; }
        .eyebrow { margin: 0 0 22px; color: var(--accent); font-size: 11px; font-weight: 750; letter-spacing: .18em; }
        h1 { max-width: 700px; margin: 0; font-size: clamp(3.3rem, 7vw, 6.8rem); line-height: .94; letter-spacing: -.075em; font-weight: 680; }
        h1 em { color: var(--accent); font-style: normal; }
        .hero-text { max-width: 560px; margin: 27px 0 0; color: var(--muted); font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.75; }
        .hero-actions { display: flex; gap: 12px; align-items: center; margin-top: 34px; }
        .button { display: inline-flex; align-items: center; gap: 22px; border: 1px solid transparent; border-radius: 12px; padding: 13px 17px; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s; }
        .button:hover { transform: translateY(-2px); }
        .button-primary { background: var(--accent); color: #18200e; box-shadow: 0 12px 28px rgba(201,242,122,.14); }
        .button-primary:hover { background: #d9fa98; box-shadow: 0 16px 34px rgba(201,242,122,.22); }
        .button-ghost { background: transparent; color: var(--ink); border-color: var(--line); }
        .button-ghost:hover { background: rgba(255,255,255,.06); }
        .trust-row { display: flex; flex-wrap: wrap; gap: 10px 19px; margin-top: 37px; color: #72817d; font-size: 11px; }
        .trust-row span::before { content: ""; display: inline-block; width: 4px; height: 4px; margin: 0 7px 2px 0; border-radius: 50%; background: var(--accent-dark); }

        .preview-card { min-height: 390px; border: 1px solid var(--line); border-radius: 24px; overflow: hidden; background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.025)); box-shadow: 0 30px 80px rgba(0,0,0,.28); transform: rotate(2deg); }
        .preview-top { display: flex; align-items: center; gap: 10px; padding: 17px 19px; color: #75827f; border-bottom: 1px solid var(--line); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
        .window-dots { display: flex; gap: 5px; margin-right: auto; }.window-dots i { width: 6px; height: 6px; border-radius: 50%; background: #63726e; }.live-label { color: var(--accent); }
        .preview-body { padding: 46px 38px; }.preview-kicker { color: var(--accent); font-size: 10px; letter-spacing: .15em; font-weight: 750; }.preview-body h2 { margin: 19px 0; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.03; letter-spacing: -.06em; }.preview-body p:not(.preview-kicker) { max-width: 280px; color: var(--muted); line-height: 1.65; }.preview-line { display: grid; gap: 10px; margin-top: 44px; }.preview-line span { display: block; height: 8px; border-radius: 8px; background: rgba(201,242,122,.18); }.preview-line span:nth-child(2) { width: 72%; }.preview-line span:nth-child(3) { width: 48%; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: clamp(70px, 11vw, 150px); border-top: 1px solid var(--line); }.stats > div { padding: 26px 25px 10px 0; border-right: 1px solid var(--line); }.stats > div:not(:first-child) { padding-left: 25px; }.stats > div:last-child { border-right: 0; }.stats strong { display: block; color: var(--accent); font-size: 12px; }.stats span { display: block; margin-top: 22px; font-size: 15px; font-weight: 700; }.stats p { max-width: 230px; margin-top: 9px; color: var(--muted); font-size: 12px; line-height: 1.6; }

        .menu-surface { position: fixed; z-index: 60; min-width: 220px; padding: 7px; border: 1px solid rgba(201,242,122,.22); border-radius: 14px; background: #142021; box-shadow: 0 22px 55px rgba(0,0,0,.5); color: var(--ink); }
        .menu-item { display: grid; grid-template-columns: 20px 1fr auto; align-items: center; gap: 9px; border-radius: 9px; padding: 10px 11px; user-select: none; cursor: pointer; font-size: 13px; }.menu-item:hover { background: rgba(201,242,122,.12); }.menu-item[data-danger="true"] { color: #ff9b9b; }.menu-divider { height: 1px; margin: 6px 4px; background: var(--line); }.caret { color: var(--accent); opacity: .8; }

        @media (max-width: 800px) { .topbar-meta { display: none; }.hero { grid-template-columns: 1fr; }.preview-card { max-width: 520px; width: 100%; transform: none; }.stats { grid-template-columns: 1fr; }.stats > div, .stats > div:not(:first-child) { padding: 22px 0; border-right: 0; border-bottom: 1px solid var(--line); }.stats > div:last-child { border-bottom: 0; } }
        @media (max-width: 480px) { .hero-actions { align-items: stretch; flex-direction: column; }.hero-actions > * { width: 100%; }.button { justify-content: space-between; width: 100%; }.shell { padding-top: 60px; } }
    `,
};