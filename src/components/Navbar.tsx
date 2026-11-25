import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/emergency", label: "Darurat" },
  { to: "/analysis", label: "Analisis" },
  { to: "/education", label: "Edukasi" },
];

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
        className={`flex items-center gap-2 rounded-full text-sm font-semibold text-[#1E40AF] transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30 ${
          compact
            ? "bg-[#EAF2FF] px-3.5 py-1.5 hover:bg-[#DCE9FF]"
            : "h-11 px-2 hover:text-[#183B56]"
        }`}
      >
        <span className="max-w-[110px] truncate lg:max-w-[160px]">{name}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 rounded-3xl bg-white p-2.5 shadow-[0_24px_48px_-20px_rgba(68,102,133,0.55)] ring-1 ring-[#446685]/10"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-[#EAF2FF] px-3.5 py-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#47a8e4] text-base font-bold uppercase text-white"
            >
              {name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#183B56]">{name}</p>
              <p className="text-xs text-[#3F4E5E]">Akun CegahScam</p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-0.5">
            <NavLink
              to="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <span className="block text-sm font-semibold text-[#183B56]">
                Pengaturan profil
              </span>
              <span className="block text-xs text-[#3F4E5E]">
                Data diri, akun, dan privasi
              </span>
            </NavLink>
            <NavLink
              to="/history"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <span className="block text-sm font-semibold text-[#183B56]">
                Riwayat
              </span>
              <span className="block text-xs text-[#3F4E5E]">
                Laporan dan analisis yang kamu buat
              </span>
            </NavLink>
          </div>

          <div className="mx-2 my-2 h-px bg-[#B9C8DA]/60" />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              navigate("/");
              logout();
              setOpen(false);
            }}
            className="block w-full rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
          >
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
                  className="text-[#F5F7FA] bg-[#1E40AF] text-sm rounded-3xl py-1 px-4 font-semibold"
                >
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
              className="flex h-11 items-center justify-self-end rounded-full bg-white/80 px-6 text-sm font-semibold text-[#1E40AF] shadow-lg shadow-[#446685]/10 backdrop-blur-md transition duration-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30"
            >
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
