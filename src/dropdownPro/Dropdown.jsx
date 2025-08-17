import React, {
    cloneElement,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Portal from "./Portal.jsx";

/**
 * Click-only Dropdown with optional 1-level submenu.
 * - No keyboard handlers
 * - Positions synchronously and hides until placed (no 0,0 flash)
 * - Submenu uses separate coords state to avoid update loops
 */
export default function Dropdown({ trigger, items, align = "start" }) {
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const submenuRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [menuCoords, setMenuCoords] = useState({ left: -9999, top: -9999 });
    const [menuPlaced, setMenuPlaced] = useState(false);

    // Submenu state is split: identity (anchor + items) vs coords
    const [submenuState, setSubmenuState] = useState(null); // { anchorEl, items } | null
    const [submenuCoords, setSubmenuCoords] = useState({ left: -9999, top: -9999 });
    const [submenuPlaced, setSubmenuPlaced] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);
    const closeAll = () => {
        setIsOpen(false);
        setMenuPlaced(false);
        setSubmenuState(null);
        setSubmenuPlaced(false);
    };

    /** ---------- Main menu placement BEFORE paint ---------- */
    useLayoutEffect(() => {
        if (!isOpen) return;

        const placeMainMenu = () => {
            const buttonEl = triggerRef.current;
            const surfaceEl = menuRef.current;
            if (!buttonEl || !surfaceEl) return;

            const buttonRect = buttonEl.getBoundingClientRect();
            const surfaceWidth = surfaceEl.offsetWidth;
            const surfaceHeight = surfaceEl.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = align === "end" ? buttonRect.right - surfaceWidth : buttonRect.left;
            let top = buttonRect.bottom + 8;

            // flip above if it would overflow
            if (top + surfaceHeight > viewportHeight - 8) top = buttonRect.top - surfaceHeight - 8;

            // clamp into viewport
            left = Math.min(Math.max(8, left), viewportWidth - surfaceWidth - 8);
            top = Math.min(Math.max(8, top), viewportHeight - surfaceHeight - 8);

            setMenuCoords({ left: Math.round(left), top: Math.round(top) });
            setMenuPlaced(true);
        };

        placeMainMenu();
        const onScrollOrResize = () => placeMainMenu();
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [isOpen, align]);

    /** ---------- Outside click closes everything ---------- */
    useEffect(() => {
        if (!isOpen) return;
        const onDocumentMouseDown = (event) => {
            const inTrigger = triggerRef.current?.contains(event.target);
            const inMenu = menuRef.current?.contains(event.target);
            const inSubmenu = submenuRef.current?.contains(event.target);
            if (!inTrigger && !inMenu && !inSubmenu) closeAll();
        };
        document.addEventListener("mousedown", onDocumentMouseDown);
        return () => document.removeEventListener("mousedown", onDocumentMouseDown);
    }, [isOpen]);

    /** ---------- Trigger enhancement ---------- */
    const enhancedTrigger = cloneElement(trigger, {
        ref: triggerRef,
        type: trigger.props.type ?? "button",
        onClick: (e) => {
            trigger.props.onClick?.(e);
            toggleOpen();
        },
        "aria-expanded": isOpen ? "true" : "false",
    });

    /** ---------- Submenu helpers ---------- */
    const openSubmenuFor = (anchorEl, submenuItems) => {
        // avoid re-setting the same submenu again while hovering the same item
        if (submenuState?.anchorEl === anchorEl) return;
        setSubmenuPlaced(false);
        setSubmenuState({ anchorEl, items: submenuItems });
    };
    const closeSubmenu = () => {
        setSubmenuState(null);
        setSubmenuPlaced(false);
    };

    /** ---------- Submenu placement BEFORE paint ---------- */
    useLayoutEffect(() => {
        if (!isOpen || !submenuState) return;

        const placeSubmenu = () => {
            const anchorEl = submenuState.anchorEl;
            const subEl = submenuRef.current;
            if (!anchorEl || !subEl) return;

            const anchorRect = anchorEl.getBoundingClientRect();
            const subWidth = subEl.offsetWidth;
            const subHeight = subEl.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // try to the right by default, flip to the left if needed
            let left = anchorRect.right + 6;
            if (left + subWidth > viewportWidth - 8) {
                left = Math.max(8, anchorRect.left - subWidth - 6);
            }

            // vertical clamp
            let top = Math.max(8, Math.min(viewportHeight - subHeight - 8, anchorRect.top + 2));

            setSubmenuCoords({ left: Math.round(left), top: Math.round(top) });
            setSubmenuPlaced(true);
        };

        placeSubmenu();
        const onScrollOrResize = () => placeSubmenu();
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [isOpen, submenuState]);

    /** ---------- Render ---------- */
    return (
        <>
            {enhancedTrigger}

            {/* Main menu */}
            <Portal>
                {isOpen && (
                    <div
                        ref={menuRef}
                        className="menu-surface"
                        style={{
                            left: menuCoords.left,
                            top: menuCoords.top,
                            visibility: menuPlaced ? "visible" : "hidden",
                        }}
                    >
                        {items.map((item, index) => {
                            if (item.type === "divider") {
                                return <div key={`div-${index}`} className="menu-divider" />;
                            }
                            const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;

                            return (
                                <div
                                    key={item.label}
                                    className="menu-item"
                                    data-danger={item.danger ? "true" : "false"}
                                    onClick={() => {
                                        if (hasSubmenu) return;        // click is handled by submenu
                                        item.onSelect?.();
                                        closeAll();
                                    }}
                                    onMouseEnter={(event) => {
                                        if (hasSubmenu) openSubmenuFor(event.currentTarget, item.submenu);
                                        else closeSubmenu();
                                    }}
                                >
                                    <span aria-hidden>{item.icon ?? "•"}</span>
                                    <span>{item.label}</span>
                                    <span className="caret" aria-hidden>{hasSubmenu ? "▶" : ""}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Portal>

            {/* Submenu (1 level) */}
            <Portal>
                {isOpen && submenuState && (
                    <div
                        ref={submenuRef}
                        className="menu-surface"
                        style={{
                            left: submenuCoords.left,
                            top: submenuCoords.top,
                            minWidth: 220,
                            visibility: submenuPlaced ? "visible" : "hidden",
                        }}
                        onMouseLeave={closeSubmenu}
                    >
                        {submenuState.items.map((subItem, index) =>
                            subItem.type === "divider" ? (
                                <div key={`sdiv-${index}`} className="menu-divider" />
                            ) : (
                                <div
                                    key={subItem.label}
                                    className="menu-item"
                                    data-danger={subItem.danger ? "true" : "false"}
                                    onClick={() => {
                                        subItem.onSelect?.();
                                        closeAll();
                                    }}
                                >
                                    <span aria-hidden>{subItem.icon ?? "•"}</span>
                                    <span>{subItem.label}</span>
                                    <span />
                                </div>
                            )
                        )}
                    </div>
                )}
            </Portal>
        </>
    );
}

/**
 * @typedef MenuItem
 * { label: string, onSelect?: () => void, icon?: ReactNode, danger?: boolean }
 * | { type: "divider" }
 * | { label: string, submenu: MenuItem[] }
 */
