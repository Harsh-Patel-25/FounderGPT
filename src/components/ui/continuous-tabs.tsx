"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ---------- Types ---------- */
interface TabItem {
    id: string;
    label: string;
    href: string;
}

interface ContinuousTabsProps {
    tabs: TabItem[];
    className?: string;
}

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
    tabs,
    className,
}) => {
    const location = useLocation();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <LayoutGroup>
            <nav
                className={cn(
                    "relative flex items-center gap-1 p-1 rounded-full border border-border/40 bg-card/50 backdrop-blur-md shadow-sm transition-all duration-300",
                    className
                )}
            >
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.href;

                    return (
                        <Link
                            key={tab.id}
                            to={tab.href}
                            className="relative px-5 py-2 rounded-full outline-none group"
                        >
                            {/* Active pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    className="absolute inset-0 rounded-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                />
                            )}

                            {/* Text */}
                            <motion.span
                                layout="position"
                                className={cn(
                                    "relative z-10 text-sm font-bold transition-colors duration-200",
                                    isActive
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab.label}
                            </motion.span>
                        </Link>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};
