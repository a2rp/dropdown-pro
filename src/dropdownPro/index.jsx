import React from "react";
import { Styled } from "./styled.js";
import Dropdown from "./Dropdown.jsx";
import { toast } from "react-toastify";

export default function DropdownPro() {
    const primaryMenu = [
        { label: "New document", icon: "+", onSelect: () => toast.info("New document ready") },
        { label: "Open workspace", icon: "o", onSelect: () => toast.info("Workspace opened") },
        { type: "divider" },
        {
            label: "Share workspace",
            icon: "<",
            submenu: [
                { label: "Copy workspace link", icon: "#", onSelect: () => toast.info("Workspace link copied") },
                { label: "Invite teammates", icon: "+", onSelect: () => toast.info("Invite sent") },
                { type: "divider" },
                { label: "Publish workspace", icon: "*", onSelect: () => toast.success("Workspace published") },
            ],
        },
        { type: "divider" },
        { label: "Delete workspace", icon: "x", danger: true, onSelect: () => toast.error("Workspace deleted") },
    ];

    const compactMenu = [
        { label: "Rename workspace", onSelect: () => toast.info("Workspace renamed") },
        { label: "Duplicate workspace", onSelect: () => toast.info("Workspace duplicated") },
        { label: "Archive workspace", onSelect: () => toast.info("Workspace archived") },
    ];

    return (
        <Styled.Wrapper>
            <header className="topbar">
                <div className="brand"><span className="brand-mark">dp</span><span>Dropdown Pro</span></div>
                <div className="topbar-meta"><span className="status-dot" /> Interactive UI kit <span className="version">v2.0</span></div>
            </header>

            <main className="shell">
                <section className="hero">
                    <div className="hero-copy">
                        <p className="eyebrow">PRECISION UI, WITHOUT THE FRICTION</p>
                        <h1>Menus that feel <em>effortless.</em></h1>
                        <p className="hero-text">A thoughtful dropdown system for polished products. Smart positioning, nested actions, and a refined interaction model in one flexible component.</p>
                        <div className="hero-actions">
                            <Dropdown trigger={<button className="button button-primary">Open workspace <span>+</span></button>} items={primaryMenu} />
                            <Dropdown align="end" trigger={<button className="button button-ghost">More actions <span>...</span></button>} items={compactMenu} />
                        </div>
                        <div className="trust-row"><span>Smart viewport placement</span><span>Nested menus</span><span>Outside-click close</span></div>
                    </div>
                    <div className="preview-card">
                        <div className="preview-top"><span className="window-dots"><i /><i /><i /></span><span>workspace / launch</span><span className="live-label">LIVE</span></div>
                        <div className="preview-body">
                            <p className="preview-kicker">YOUR NEXT RELEASE</p>
                            <h2>Build a calmer<br />product experience.</h2>
                            <p>Every action has a clear place, state, and response.</p>
                            <div className="preview-line"><span /><span /><span /></div>
                        </div>
                    </div>
                </section>

                <section className="stats" aria-label="Dropdown capabilities">
                    <div><strong>01</strong><span>Click-first interaction</span><p>Predictable controls that work with mouse and touch.</p></div>
                    <div><strong>02</strong><span>Smart positioning</span><p>Menus flip and clamp to stay visible in any viewport.</p></div>
                    <div><strong>03</strong><span>Designed to scale</span><p>Use one level of submenu depth for focused actions.</p></div>
                </section>
            </main>

            <div id="dropdown-portal-root" />
        </Styled.Wrapper>
    );
}