import React, {
    cloneElement,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Portal from "./Portal.jsx";

const getMenuItems = (container) =>
    Array.from(
        container?.querySelectorAll(
            'button[role="menuitem"]:not([disabled])',
        ) ?? [],
    );

const focusMenuItem = (container, direction) => {
    const menuItems = getMenuItems(container);

    if (menuItems.length === 0) return;

    const currentIndex = menuItems.indexOf(document.activeElement);
    let nextIndex;

    if (direction === "first") {
        nextIndex = 0;
    } else if (direction === "last") {
        nextIndex = menuItems.length - 1;
    } else if (currentIndex === -1) {
        nextIndex = direction === "previous" ? menuItems.length - 1 : 0;
    } else {
        const step = direction === "previous" ? -1 : 1;
        nextIndex = (currentIndex + step + menuItems.length) % menuItems.length;
    }

    menuItems[nextIndex].focus();
};

export default function Dropdown({ trigger, items = [], align = "start" }) {
    const dropdownId = useId();
    const triggerId = dropdownId + "-trigger";
    const menuId = dropdownId + "-menu";
    const submenuId = dropdownId + "-submenu";

    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const submenuRef = useRef(null);
    const focusLastOnOpenRef = useRef(false);

    const [isOpen, setIsOpen] = useState(false);
    const [menuCoords, setMenuCoords] = useState({ left: -9999, top: -9999 });
    const [menuPlaced, setMenuPlaced] = useState(false);
    const [submenuState, setSubmenuState] = useState(null);
    const [submenuCoords, setSubmenuCoords] = useState({
        left: -9999,
        top: -9999,
    });
    const [submenuPlaced, setSubmenuPlaced] = useState(false);

    const closeAll = useCallback((restoreTrigger = false) => {
        setIsOpen(false);
        setMenuPlaced(false);
        setSubmenuState(null);
        setSubmenuPlaced(false);

        if (restoreTrigger) {
            triggerRef.current?.focus();
        }
    }, []);

    const closeSubmenu = useCallback((restoreAnchor = false, expectedAnchor) => {
        setSubmenuState((current) =>
            expectedAnchor && current?.anchorEl !== expectedAnchor
                ? current
                : null,
        );
        setSubmenuPlaced(false);

        if (restoreAnchor) {
            expectedAnchor?.focus();
        }
    }, []);

    const openSubmenuFor = useCallback(
        (
            anchorEl,
            anchorId,
            submenuItems,
            focusFirst = false,
            openedByHover = false,
        ) => {
            setSubmenuPlaced(false);
            setSubmenuState({
                anchorEl,
                anchorId,
                items: submenuItems,
                focusFirst,
                openedByHover,
            });
        },
        [],
    );

    const toggleOpen = useCallback(() => {
        if (isOpen) {
            closeAll();
        } else {
            setIsOpen(true);
        }
    }, [closeAll, isOpen]);

    const handleTriggerKeyDown = (event) => {
        trigger.props.onKeyDown?.(event);

        if (event.defaultPrevented) return;

        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();

            const openAtEnd =
                event.key === "ArrowUp" || event.key === "End";

            if (!isOpen) {
                focusLastOnOpenRef.current = openAtEnd;
                setIsOpen(true);
            } else {
                focusMenuItem(
                    menuRef.current,
                    openAtEnd ? "last" : "first",
                );
            }
        } else if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeAll(true);
        }
    };

    const enhancedTrigger = cloneElement(trigger, {
        id: triggerId,
        ref: triggerRef,
        type: trigger.props.type ?? "button",
        onClick: (event) => {
            trigger.props.onClick?.(event);

            if (!event.defaultPrevented) {
                toggleOpen();
            }
        },
        onKeyDown: handleTriggerKeyDown,
        "aria-haspopup": "menu",
        "aria-controls": isOpen ? menuId : undefined,
        "aria-expanded": isOpen,
    });

    useLayoutEffect(() => {
        if (!isOpen) return undefined;

        const placeMainMenu = () => {
            const buttonEl = triggerRef.current;
            const surfaceEl = menuRef.current;

            if (!buttonEl || !surfaceEl) return;

            const buttonRect = buttonEl.getBoundingClientRect();
            const surfaceWidth = surfaceEl.offsetWidth;
            const surfaceHeight = surfaceEl.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left =
                align === "end"
                    ? buttonRect.right - surfaceWidth
                    : buttonRect.left;
            let top = buttonRect.bottom + 8;

            if (top + surfaceHeight > viewportHeight - 8) {
                top = buttonRect.top - surfaceHeight - 8;
            }

            const maxLeft = Math.max(8, viewportWidth - surfaceWidth - 8);
            const maxTop = Math.max(8, viewportHeight - surfaceHeight - 8);

            left = Math.min(Math.max(8, left), maxLeft);
            top = Math.min(Math.max(8, top), maxTop);

            setMenuCoords({
                left: Math.round(left),
                top: Math.round(top),
            });
            setMenuPlaced(true);
        };

        placeMainMenu();

        window.addEventListener("scroll", placeMainMenu, true);
        window.addEventListener("resize", placeMainMenu);

        return () => {
            window.removeEventListener("scroll", placeMainMenu, true);
            window.removeEventListener("resize", placeMainMenu);
        };
    }, [align, isOpen]);

    useLayoutEffect(() => {
        if (!isOpen || !submenuState) return undefined;

        const placeSubmenu = () => {
            const anchorRect = submenuState.anchorEl?.getBoundingClientRect();
            const surfaceEl = submenuRef.current;

            if (!anchorRect || !surfaceEl) return;

            const surfaceWidth = surfaceEl.offsetWidth;
            const surfaceHeight = surfaceEl.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = anchorRect.right + 6;

            if (left + surfaceWidth > viewportWidth - 8) {
                left = anchorRect.left - surfaceWidth - 6;
            }

            let top = anchorRect.top + 2;

            if (top + surfaceHeight > viewportHeight - 8) {
                top = viewportHeight - surfaceHeight - 8;
            }

            const maxLeft = Math.max(8, viewportWidth - surfaceWidth - 8);
            const maxTop = Math.max(8, viewportHeight - surfaceHeight - 8);

            left = Math.min(Math.max(8, left), maxLeft);
            top = Math.min(Math.max(8, top), maxTop);

            setSubmenuCoords({
                left: Math.round(left),
                top: Math.round(top),
            });
            setSubmenuPlaced(true);
        };

        placeSubmenu();

        window.addEventListener("scroll", placeSubmenu, true);
        window.addEventListener("resize", placeSubmenu);

        return () => {
            window.removeEventListener("scroll", placeSubmenu, true);
            window.removeEventListener("resize", placeSubmenu);
        };
    }, [isOpen, submenuState]);

    useEffect(() => {
        if (!isOpen || !menuPlaced) return;

        focusMenuItem(
            menuRef.current,
            focusLastOnOpenRef.current ? "last" : "first",
        );
        focusLastOnOpenRef.current = false;
    }, [isOpen, menuPlaced]);

    useEffect(() => {
        if (!isOpen || !submenuState || !submenuState.focusFirst || !submenuPlaced) {
            return;
        }

        focusMenuItem(submenuRef.current, "first");
    }, [isOpen, submenuPlaced, submenuState]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const isInsideDropdown = (target) =>
            triggerRef.current?.contains(target) ||
            menuRef.current?.contains(target) ||
            submenuRef.current?.contains(target);

        const handlePointerDown = (event) => {
            if (!isInsideDropdown(event.target)) {
                closeAll();
            }
        };

        const handleFocusIn = (event) => {
            if (!isInsideDropdown(event.target)) {
                closeAll();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener("focusin", handleFocusIn);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("focusin", handleFocusIn);
        };
    }, [closeAll, isOpen]);

    const handleMenuKeyDown = (event) => {
        if (event.defaultPrevented) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusMenuItem(menuRef.current, "next");
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusMenuItem(menuRef.current, "previous");
        } else if (event.key === "Home") {
            event.preventDefault();
            focusMenuItem(menuRef.current, "first");
        } else if (event.key === "End") {
            event.preventDefault();
            focusMenuItem(menuRef.current, "last");
        } else if (event.key === "Escape") {
            event.preventDefault();
            closeAll(true);
        }
    };

    const handleSubmenuKeyDown = (event) => {
        if (event.defaultPrevented) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusMenuItem(submenuRef.current, "next");
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusMenuItem(submenuRef.current, "previous");
        } else if (event.key === "Home") {
            event.preventDefault();
            focusMenuItem(submenuRef.current, "first");
        } else if (event.key === "End") {
            event.preventDefault();
            focusMenuItem(submenuRef.current, "last");
        } else if (event.key === "Escape" || event.key === "ArrowLeft") {
            event.preventDefault();
            closeSubmenu(true, submenuState?.anchorEl);
        }
    };

    return (
        <>
            {enhancedTrigger}

            <Portal>
                {isOpen && (
                    <div
                        id={menuId}
                        ref={menuRef}
                        className="menu-surface"
                        role="menu"
                        aria-labelledby={triggerId}
                        onKeyDown={handleMenuKeyDown}
                        style={{
                            left: menuCoords.left,
                            top: menuCoords.top,
                            visibility: menuPlaced ? "visible" : "hidden",
                        }}
                    >
                        {items.map((item, index) => {
                            if (item.type === "divider") {
                                return (
                                    <div
                                        key={"divider-" + index}
                                        className="menu-divider"
                                        role="separator"
                                    />
                                );
                            }

                            const hasSubmenu =
                                Array.isArray(item.submenu) &&
                                item.submenu.length > 0;
                            const itemId = menuId + "-item-" + index;
                            const isSubmenuOpen =
                                submenuState?.anchorId === itemId;

                            return (
                                <button
                                    id={itemId}
                                    key={item.label}
                                    type="button"
                                    role="menuitem"
                                    tabIndex={-1}
                                    className="menu-item"
                                    data-danger={item.danger ? "true" : "false"}
                                    aria-haspopup={
                                        hasSubmenu ? "menu" : undefined
                                    }
                                    aria-expanded={
                                        hasSubmenu ? isSubmenuOpen : undefined
                                    }
                                    aria-controls={
                                        hasSubmenu && isSubmenuOpen
                                            ? submenuId
                                            : undefined
                                    }
                                    onClick={(event) => {
                                        if (hasSubmenu) {
                                            if (isSubmenuOpen) {
                                                if (
                                                    submenuState.openedByHover
                                                ) {
                                                    openSubmenuFor(
                                                        event.currentTarget,
                                                        itemId,
                                                        item.submenu,
                                                        true,
                                                    );
                                                } else {
                                                    closeSubmenu(
                                                        true,
                                                        event.currentTarget,
                                                    );
                                                }
                                            } else {
                                                openSubmenuFor(
                                                    event.currentTarget,
                                                    itemId,
                                                    item.submenu,
                                                    true,
                                                );
                                            }
                                            return;
                                        }

                                        item.onSelect?.();
                                        closeAll(true);
                                    }}
                                    onMouseEnter={(event) => {
                                        if (hasSubmenu) {
                                            openSubmenuFor(
                                                event.currentTarget,
                                                itemId,
                                                item.submenu,
                                                false,
                                                true,
                                            );
                                        } else {
                                            closeSubmenu();
                                        }
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            hasSubmenu &&
                                            event.key === "ArrowRight"
                                        ) {
                                            event.preventDefault();
                                            openSubmenuFor(
                                                event.currentTarget,
                                                itemId,
                                                item.submenu,
                                                true,
                                            );
                                        } else if (
                                            event.key === "ArrowLeft" &&
                                            submenuState
                                        ) {
                                            event.preventDefault();
                                            closeSubmenu(
                                                true,
                                                submenuState.anchorEl,
                                            );
                                        }
                                    }}
                                >
                                    <span aria-hidden="true">
                                        {item.icon ?? "•"}
                                    </span>
                                    <span>{item.label}</span>
                                    <span className="caret" aria-hidden="true">
                                        {hasSubmenu ? "▶" : ""}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </Portal>

            <Portal>
                {isOpen && submenuState && (
                    <div
                        id={submenuId}
                        ref={submenuRef}
                        className="menu-surface"
                        role="menu"
                        aria-labelledby={submenuState.anchorId}
                        onKeyDown={handleSubmenuKeyDown}
                        onMouseLeave={() =>
                            closeSubmenu(false, submenuState.anchorEl)
                        }
                        style={{
                            left: submenuCoords.left,
                            top: submenuCoords.top,
                            visibility: submenuPlaced ? "visible" : "hidden",
                        }}
                    >
                        {submenuState.items.map((subItem, index) =>
                            subItem.type === "divider" ? (
                                <div
                                    key={"submenu-divider-" + index}
                                    className="menu-divider"
                                    role="separator"
                                />
                            ) : (
                                <button
                                    key={subItem.label}
                                    type="button"
                                    role="menuitem"
                                    tabIndex={-1}
                                    className="menu-item"
                                    data-danger={
                                        subItem.danger ? "true" : "false"
                                    }
                                    onClick={() => {
                                        subItem.onSelect?.();
                                        closeAll(true);
                                    }}
                                >
                                    <span aria-hidden="true">
                                        {subItem.icon ?? "•"}
                                    </span>
                                    <span>{subItem.label}</span>
                                    <span />
                                </button>
                            ),
                        )}
                    </div>
                )}
            </Portal>
        </>
    );
}
