import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type TabKey = "emergency" | "analytic";

const tabs: {
  key: TabKey;
  label: string;
  columns: string[];
  emptyTitle: string;
  emptyText: string;
  cta: { to: string; label: string };
}[] = [
  {
    key: "emergency",
    label: "Darurat",
    columns: [
      "Tanggal",
      "Kasus Darurat",
      "Data Masukan",
      "Kronologi",
      "File Laporan",
    ],
    emptyTitle: "Belum ada laporan darurat",
    emptyText: "Laporan yang kamu buat akan tersimpan dan muncul di sini.",
    cta: { to: "/emergency", label: "Buat laporan" },
  },
  {
    key: "analytic",
    label: "Analisis",
    columns: [
      "Tanggal",
      "Tipe Analisis",
      "Data Masukan",
      "Hasil",
      "Dokumen Analisis",
    ],
    emptyTitle: "Belum ada riwayat analisis",
    emptyText: "Hasil analisis chat, nomor, atau tangkapan layar akan muncul di sini.",
    cta: { to: "/analysis", label: "Mulai analisis" },
  },
];

export default function History() {
  const [activeTab, setActiveTab] = useState<TabKey>("emergency");
  const { username } = useAuth();
  const current = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  return (
    <main className="flex w-full flex-1 justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="w-full max-w-[1160px]">
        <h1 className="text-center text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
          Riwayat
        </h1>
        <p className="mt-2 text-center text-sm text-[#3F4E5E] sm:text-[15px]">
          {username
            ? `Semua laporan dan analisis dari ${username}`
            : "Semua laporan dan analisis yang pernah kamu buat"}
        </p>

        {/* Tab */}
        <div
          role="tablist"
          aria-label="Jenis riwayat"
          className="mx-auto mt-8 flex w-full max-w-[420px] gap-1.5 rounded-2xl bg-white/60 p-1.5 shadow-md"
        >
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls="history-panel"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25 ${
                  isActive
                    ? "bg-[#47a8e4] text-white shadow-lg"
                    : "text-[#446685] hover:bg-white/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <section
          id="history-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.key}`}
          className="mt-6 overflow-hidden rounded-[28px] bg-white/60 shadow-md sm:rounded-[36px]"
        >
          <div className="overflow-x-auto">
            <div
              className="grid min-w-[720px] border-b border-[#B9C8DA]/60 bg-[#446685]/10 px-4 text-center text-sm font-bold text-[#446685]"
              style={{
                gridTemplateColumns: `repeat(${current.columns.length}, minmax(0, 1fr))`,
              }}
            >
              {current.columns.map((column) => (
                <div key={column} className="px-2 py-3.5">
                  {column}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center px-6 py-14 text-center sm:py-20">
            <p className="text-lg font-bold text-[#446685]">
              {current.emptyTitle}
            </p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#3F4E5E]">
              {current.emptyText}
            </p>
            <Link
              to={current.cta.to}
              className="mt-6 rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25"
            >
              {current.cta.label}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
