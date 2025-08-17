import React from "react";
import { Styled } from "./styled.js";
import Dropdown from "./Dropdown.jsx";
import { toast } from "react-toastify";

export default function DropdownPro() {
    const primaryMenu = [
        { label: "New file", icon: "📄", onSelect: () => toast.info("New file") },
        { label: "Open...", icon: "📂", onSelect: () => toast.info("Open…") },
        { type: "divider" },
        {
            label: "Share",
            icon: "🔗",
            submenu: [
                { label: "Copy link", icon: "📋", onSelect: () => toast.info("Link copied") },
                { label: "Invite people", icon: "👥", onSelect: () => toast.info("Invite sent") },
                { type: "divider" },
                { label: "Publish", icon: "🚀", onSelect: () => toast.info("Published") },
            ],
        },
        { type: "divider" },
        { label: "Delete", icon: "🗑️", danger: true, onSelect: () => toast.info("Deleted") },
    ];

    const compactMenu = [
        { label: "Rename", onSelect: () => toast.info("Renamed") },
        { label: "Duplicate", onSelect: () => toast.info("Duplicated") },
        { label: "Archive", onSelect: () => toast.info("Archived") },
    ];

    return (
        <Styled.Wrapper>
            <div className="container">
                <h1>Dropdown/Menu Pro</h1>
                <p className="sub">Click-only dropdown with optional submenu. Positions smartly; closes on outside click.</p>

                <div className="row">
                    <Dropdown trigger={<button>Open Menu</button>} items={primaryMenu} />
                    <Dropdown align="end" trigger={<button>More actions (end aligned)</button>} items={compactMenu} />
                </div>
            </div>

            {/* ⬇️ portal target INSIDE the wrapper so scoped styles apply */}
            <div id="dropdown-portal-root" />
        </Styled.Wrapper>
    );
}
