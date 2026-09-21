"use client";

import { List, X } from "@phosphor-icons/react/dist/ssr";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { calendlyUrl, cta, nav, site } from "@/content/business";
import { cn } from "@/lib/cn";

import { buttonClass } from "./Button";
import { Logo } from "./Logo";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[68px] border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-ink/85 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo href="/" showCity title={`${site.gymName}, home`} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[0.8125rem] tracking-[-0.005em] transition-colors",
                    active ? "text-bone" : "text-bone-2 hover:text-bone",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-ember transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapped rather than putting `hidden sm:inline-flex` on the Link.
                The button base class already sets `inline-flex`, so `hidden`
                and `inline-flex` both apply below 640px and whichever Tailwind
                emits last wins. That left the CTA visible on small screens and
                pushed the menu button off the edge. */}
            <div className="hidden sm:block">
              <Link href={calendlyUrl} className={buttonClass("primary", "sm")}>
                {cta.freeSession}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-mr-1.5 flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-ember-2 lg:hidden"
            >
              <List size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[70] bg-ink lg:hidden"
        >
          <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
            <Logo size="md" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-1.5 flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-ember-2"
            >
              <X size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-col px-5 pt-6 sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="display-3 border-b border-line py-5 text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-5 pt-8 sm:px-8">
            <Link href={calendlyUrl} className={buttonClass("primary", "lg")}>
              {cta.freeSession}
            </Link>
            <Link href="/gym#apply" className={buttonClass("outline", "lg")}>
              {cta.membership}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
