import styled from "styled-components";

/**
 * NOTE: You asked to keep ":root" inside the wrapper. In CSS that selector
 * would not apply when nested, so we define custom properties directly on
 * the wrapper element (same effect for all descendants).
 */
export const Styled = {
    Wrapper: styled.div`
        /* "Theme" variables scoped to this feature */
        --bg: #0b0c10;
        --panel: #121318;
        --text: #e8eaed;
        --muted: #9aa0a6;
        --border: #22242a;
        --brand: #f97316;

        min-height: 100dvh;
        display: grid;
        place-items: center;
        background: radial-gradient(
                1200px 600px at 20% -20%,
                #1c1f26,
                transparent
            ),
            var(--bg);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial;

        .container {
            width: min(960px, 96vw);
            display: grid;
            gap: 14px;
            padding: 24px;
            border: 1px solid var(--border);
            border-radius: 16px;
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.02),
                rgba(255, 255, 255, 0.005)
            );
        }

        h1 {
            margin: 6px 0 2px;
        }
        .sub {
            color: var(--muted);
            margin: 0 0 6px;
        }

        .row {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            align-items: center;
        }

        button {
            background: rgba(255, 255, 255, 0.06);
            color: #fff;
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 10px 12px;
            cursor: pointer;
        }
        button:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* Menu surfaces */
        .menu-surface {
            position: fixed;
            z-index: 60;
            min-width: 200px;
            padding: 6px;
            border: 1px solid var(--border);
            border-radius: 12px;
            background: var(--panel);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
            transform: translate3d(0, 0, 0);
        }

        .menu-item {
            display: grid;
            grid-template-columns: 18px 1fr auto;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            padding: 8px 10px;
            user-select: none;
            cursor: pointer;
        }
        .menu-item:hover {
            background: rgba(255, 255, 255, 0.06);
        }
        .menu-item[data-danger="true"] {
            color: #fda4af;
        } /* soft red */

        .menu-divider {
            height: 1px;
            margin: 6px 4px;
            background: var(--border);
        }

        .caret {
            opacity: 0.7;
        }
    `,
};
