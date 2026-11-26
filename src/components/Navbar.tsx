import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserIcon } from "./AuthIcons";
import Avatar from "./Avatar";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/emergency", label: "Darurat" },
  { to: "/analysis", label: "Analisis" },
  { to: "/education", label: "Edukasi" },
];

function MenuIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function ProfileMenu({ compact = false }: { compact?: boolean }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const name = username || "Pengguna";

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const itemClass =
    "block w-full rounded-2xl px-3.5 py-2.5 text-left transition-colors hover:bg-[#446685]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47a8e4]/40";

  return (
    <div ref={ref} className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Menu akun ${name}`}
        title={name}
        className={`group flex shrink-0 items-center justify-center rounded-full bg-white/80 shadow-lg shadow-[#446685]/10 backdrop-blur-md transition duration-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30 ${
          compact ? "h-9 w-9 p-[2px]" : "h-11 w-11 p-[2px]"
        } ${open ? "bg-white ring-1 ring-[#47a8e4]" : ""}`}
      >
        <Avatar className="h-full w-full transition-transform duration-200 group-hover:scale-[1.04]" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 origin-top-right animate-fade-in rounded-3xl bg-white p-2 shadow-[0_24px_48px_-20px_rgba(68,102,133,0.55)] ring-1 ring-[#446685]/10"
        >
          <div className="flex items-center gap-3 px-3 pb-3 pt-2.5">
            <Avatar className="h-11 w-11" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#183B56]">{name}</p>
              <p className="text-xs text-[#5E83A5]">Akun CegahScam</p>
            </div>
          </div>

          <div className="mx-2 h-px bg-[#B9C8DA]/50" />

          <div className="mt-1.5 flex flex-col gap-0.5">
            <NavLink
              to="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <span className="flex items-center gap-3 text-[#446685]">
                <MenuIcon path="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0" />
                <span className="text-sm font-semibold text-[#183B56]">
                  Profil saya
                </span>
              </span>
            </NavLink>
            <NavLink
              to="/history"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <span className="flex items-center gap-3 text-[#446685]">
                <MenuIcon path="M3.5 12a8.5 8.5 0 1 0 2.5-6M3.5 4v4h4M12 7.5V12l3 2" />
                <span className="text-sm font-semibold text-[#183B56]">
                  Riwayat
                </span>
              </span>
            </NavLink>
          </div>

          <div className="mx-2 my-1.5 h-px bg-[#B9C8DA]/50" />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              navigate("/");
              logout();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
          >
            <MenuIcon path="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10" />
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { IsLoggedIn } = useAuth();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-6 ${
        scrolled
          ? "bg-white/75 py-3 shadow-[0_8px_30px_-18px_rgba(17,24,39,0.45)] backdrop-blur-xl"
          : "bg-transparent py-4 sm:py-5 lg:py-6"
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Mobile scale */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg shadow-[#446685]/10 backdrop-blur-md">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-2 text-[15px] font-bold leading-none text-[#0F172A] transition-opacity hover:opacity-80"
            >
              <img
                src="/logo2.png"
                alt="Logo CegahScam"
                className="h-7 w-auto shrink-0"
              />
              <span>
                Cegah<span className="text-[#1E40AF]">Scam</span>
              </span>
            </NavLink>
            <div className="flex flex-row items-center gap-2">
              {!IsLoggedIn ? (
                <NavLink
                  to="/login"
                  className="flex items-center gap-1.5 rounded-3xl bg-[#1E40AF] px-4 py-1.5 text-sm font-semibold text-[#F5F7FA]"
                >
                  <UserIcon className="h-4 w-4" />
                  Masuk
                </NavLink>
              ) : (
                <ProfileMenu compact />
              )}
              <button
                type="button"
                aria-label={open ? "Tutup menu" : "Buka menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition-colors hover:bg-[#446685]/10"
              >
                {open ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {open ? (
            <div
              id="mobile-menu"
              className="mt-2 rounded-2xl bg-white/95 p-2 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.45)] ring-1 ring-black/5 backdrop-blur-md"
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-[14px] transition-colors duration-200 ${
                      isActive
                        ? "bg-[#EAF2FF] font-bold text-[#1E40AF]"
                        : "font-medium text-[#0F172A] hover:bg-[#446685]/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        {/* Desktop scale */}
        <div className="hidden items-center justify-between gap-2 sm:flex lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal lg:gap-0">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2 justify-self-start whitespace-nowrap text-base font-bold leading-none text-[#0F172A] transition-opacity hover:opacity-80 lg:ms-2 lg:text-[26px]"
          >
            <img
              src="/logo2.png"
              alt="Logo CegahScam"
              className={`w-auto shrink-0 transition-all duration-300 ${
                scrolled ? "h-6 lg:h-7" : "h-6 lg:h-8"
              }`}
            />
            <span>
              Cegah<span className="text-[#1E40AF]">Scam</span>
            </span>
          </NavLink>

          <nav
            className={`flex shrink-0 items-center justify-center gap-8 rounded-full bg-white/80 px-8 py-2 shadow-lg shadow-[#446685]/10 backdrop-blur-md transition-all duration-300 lg:gap-12 lg:px-10 lg:py-3 ${
              scrolled ? "lg:shadow-md" : ""
            }`}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#1E40AF]"
                      : "font-normal text-[#0F172A] hover:text-[#1E40AF]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {!IsLoggedIn ? (
            // Kondisi belum login
            <NavLink
              to="/login"
              className="flex h-11 items-center gap-2 justify-self-end rounded-full bg-white/80 px-6 text-sm font-semibold text-[#1E40AF] shadow-lg shadow-[#446685]/10 backdrop-blur-md transition duration-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30"
            >
              <UserIcon className="h-[18px] w-[18px]" />
              Masuk
            </NavLink>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
    </header>
  );
}
