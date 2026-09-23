import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Styled } from "./styled.js";
import Dropdown from "./Dropdown.jsx";

const logo = `${import.meta.env.BASE_URL}logo.png`;

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: "◎" },
    { label: "GitHub", href: "https://github.com/a2rp", icon: "◉" },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: "⌘" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: "in" },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: "f" },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: "▶" },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: "✉" },
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: "♥" },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: "☕" },
    { label: "Patreon", href: "https://www.patreon.com/a2rp", icon: "★" },
];

export default function DropdownPro() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 260);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                <div className="brand">
                    <img className="brand-mark" src={logo} alt="Dropdown Pro logo" />
                    <span>Dropdown Pro</span>
                </div>
                <div className="topbar-meta">
                    <span className="status-dot" /> Interactive UI kit <span className="version">v2.0</span>
                </div>
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

                <footer className="site-footer">
                    <div>
                        Copyright © {new Date().getFullYear()} {" "}
                        <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a>
                    </div>
                    <nav className="footer-links" aria-label="Footer links">
                        {footerLinks.map(({ label, href, icon }) => (
                            <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={label} title={label}>{icon}</a>
                        ))}
                    </nav>
                </footer>
            </main>

            <button className={`go-top ${showTopButton ? "show" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top" title="Go to top">↑</button>
            <div id="dropdown-portal-root" />
        </Styled.Wrapper>
    );
}
