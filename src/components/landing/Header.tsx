"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { LoginButton } from "./LoginButton";
import { Button } from "../ui/button";
import { UserProfile } from "./UserProfile";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { id: "nav-hero", href: "#hero", label: "Home" },
  { id: "nav-about", href: "#about", label: "About Us" },
  { id: "nav-courses", href: "#courses", label: "Courses" },
  { id: "nav-gallery", href: "#gallery", label: "Gallery" },
  { id: "nav-ai-tools", href: "#ai-tools", label: "Quiz" },
  { id: "nav-study-adda", href: "#study-adda", label: "Learning Adda" },
  { id: "nav-faq", href: "#faq", label: "FAQ" },
  { id: "nav-contact", href: "#contact", label: "Contact" },
];

function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("nav-hero");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("loggedin") === "true") {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      // This is a bit of a hack to remove the query param without a full page reload
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams, toast]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id === "" ? "hero" : entry.target.id;
            setActiveNav(`nav-${sectionId}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (indicatorRef.current && navRef.current) {
      const activeLabel = navRef.current.querySelector(
        `label[for="${activeNav}"]`
      ) as HTMLLabelElement;
      if (activeLabel) {
        indicatorRef.current.style.width = `${activeLabel.offsetWidth}px`;
        indicatorRef.current.style.transform = `translateX(${activeLabel.offsetLeft}px)`;
      }
    }
  }, [activeNav]);

  const handleNavClick = (id: string, href: string) => {
    setActiveNav(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-md bg-gray-50/80 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Left Aligned Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src="/file (1).svg"
                alt="GCC Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority={true}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-poppins text-slate-800">
                GCC
              </span>
              <p className="text-xs text-gray-500 font-bold uppercase -mt-1">
                Gurukula Coaching Centre
              </p>
            </div>
          </Link>
        </div>

        {/* Centered Desktop Pill Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="pill-nav" ref={navRef}>
            {navLinks.map((link) => (
              <div key={link.id}>
                <input
                  type="radio"
                  name="nav"
                  id={link.id}
                  checked={activeNav === link.id}
                  onChange={() => setActiveNav(link.id)}
                />
                <label
                  htmlFor={link.id}
                  onClick={() => handleNavClick(link.id, link.href)}
                >
                  {link.label}
                </label>
              </div>
            ))}
            <div ref={indicatorRef} className="pill-indicator"></div>
          </div>
        </div>

        {/* Right aligned placeholder/button or mobile menu */}
        <div className="flex justify-end">
          <div className="hidden md:block">
            <LoginButton />
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card p-4">
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <Image
                        src="/file (1).svg"
                        alt="GCC Logo"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold font-poppins text-foreground">
                        GCC
                      </span>
                      <p className="text-xs text-gray-500 font-bold uppercase -mt-1">
                        Gurukula Coaching Centre
                      </p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id, link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block py-2 text-lg text-foreground hover:bg-gray-100 rounded-md px-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div
                    className="pt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LoginButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<div className="h-[68px] w-full" />}>
      <HeaderContent />
    </Suspense>
  );
}
