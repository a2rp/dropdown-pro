import { createPortal } from "react-dom";

export default function Portal({ children, containerId = "dropdown-portal-root" }) {
    if (typeof document === "undefined") return null;
    const host = document.getElementById(containerId) || document.body; // prefer wrapper-local root
    return createPortal(children, host);
}
