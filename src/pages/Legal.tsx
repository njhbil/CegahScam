import { Link } from "react-router-dom";
import LegalDocument from "../components/LegalDocument";
import { useAuth } from "../context/AuthContext";
import {
  LEGAL_STATUS,
  LEGAL_UPDATED,
  privacySections,
  termsSections,
} from "../lib/legalContent";

type LegalPageProps = {
  doc: "terms" | "privacy";
};

const docs = {
  terms: {
    path: "/syarat-ketentuan",
    tab: "Syarat & Ketentuan",
    title: "Syarat & Ketentuan",
    intro: "Aturan main memakai CegahScam, ditulis supaya mudah dipahami.",
    sections: termsSections,
  },
  privacy: {
    path: "/kebijakan-privasi",
    tab: "Kebijakan Privasi",
    title: "Kebijakan Privasi",
    intro:
      "Data apa yang kami kumpulkan, untuk apa, dan berapa lama disimpan.",
    sections: privacySections,
  },
} as const;

const privacySummary = [
  {
    label: "Data apa",
    text: "Akun, isian dan bukti yang kamu kirim, serta data teknis.",
  },
  {
    label: "Untuk apa",
    text: "Analisis, menyimpan riwayatmu, dan membantu mengenali pola penipuan.",
  },
  {
    label: "Berapa lama",
    text: "Selama akunmu aktif, atau sampai kamu meminta penghapusan.",
  },
];

export default function Legal({ doc }: LegalPageProps) {
  const current = docs[doc];
  const { IsLoggedIn } = useAuth();

  return (
    <main className="flex w-full flex-1 justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="w-full max-w-[1160px]">
        <h1 className="text-center text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
          {current.title}
        </h1>
        <p className="mt-2 text-center text-sm text-[#3F4E5E] sm:text-[15px]">
          {current.intro}
        </p>
        <p className="mt-1 text-center text-xs text-[#3F4E5E]">
          Diperbarui {LEGAL_UPDATED} · {LEGAL_STATUS}
        </p>

        <nav
          aria-label="Dokumen hukum"
          className="mx-auto mt-7 flex w-full max-w-[460px] gap-1.5 rounded-2xl bg-white/60 p-1.5 shadow-md"
        >
          {(["terms", "privacy"] as const).map((key) => {
            const item = docs[key];
            const isActive = key === doc;
            return (
              <Link
                key={key}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25 ${
                  isActive
                    ? "bg-[#47a8e4] text-white shadow-lg"
                    : "text-[#446685] hover:bg-white/80"
                }`}
              >
                {item.tab}
              </Link>
            );
          })}
        </nav>

        {doc === "privacy" && (
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {privacySummary.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] bg-[#EAF2FF] px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#446685]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#26384A]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-7 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-[28px] bg-white/60 px-5 py-5 shadow-md lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#446685]">
              Isi halaman
            </p>
            <ol className="mt-3 space-y-0.5 text-sm">
              {current.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-2 py-1.5 text-[#26384A] transition-colors hover:bg-[#446685]/10 hover:text-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47a8e4]/40"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="rounded-[28px] bg-white/60 px-6 py-8 shadow-md sm:rounded-[36px] sm:px-10 sm:py-10">
            <LegalDocument sections={current.sections} />
          </article>
        </div>

        {!IsLoggedIn && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25"
            >
              Lanjut daftar
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
