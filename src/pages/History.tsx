import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BackLink from "../components/BackLink";
import {
  DEMO_USERNAME,
  dummyAnalysisHistory,
  dummyEmergencyHistory,
} from "../lib/historyDummy";
import type { RiskCategory } from "../lib/historyDummy";

type TabKey = "emergency" | "analytic";

type Row = {
  id: string;
  cells: ReactNode[];
};

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
    columns: ["Tanggal", "Kasus Darurat", "Data Masukan", "Kronologi", "File Laporan"],
    emptyTitle: "Belum ada laporan darurat",
    emptyText: "Laporan yang kamu buat akan tersimpan dan muncul di sini.",
    cta: { to: "/emergency", label: "Buat laporan" },
  },
  {
    key: "analytic",
    label: "Analisis",
    columns: ["Tanggal", "Tipe Analisis", "Data Masukan", "Hasil", "Dokumen Analisis"],
    emptyTitle: "Belum ada riwayat analisis",
    emptyText: "Hasil analisis chat, nomor, atau tangkapan layar akan muncul di sini.",
    cta: { to: "/analysis", label: "Mulai analisis" },
  },
];

const RISK_STYLE: Record<RiskCategory, string> = {
  "Tidak Ada Indikasi": "bg-emerald-100 text-emerald-800",
  Rendah: "bg-emerald-100 text-emerald-800",
  Sedang: "bg-amber-100 text-amber-800",
  Tinggi: "bg-red-100 text-red-700",
  "Sangat Tinggi": "bg-red-100 text-red-700",
};

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
    new Date(year, month - 1, day),
  );
}

const clampText = "line-clamp-2 text-left";

function ViewLink({ to, state, label }: { to: string; state: unknown; label: string }) {
  return (
    <Link
      to={to}
      state={state}
      aria-label={label}
      className="inline-block rounded-xl bg-[#47a8e4] px-4 py-1.5 text-xs font-semibold text-white transition duration-200 hover:bg-[#85B6FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25"
    >
      Lihat
    </Link>
  );
}

function buildRows(tab: TabKey): Row[] {
  if (tab === "emergency") {
    return dummyEmergencyHistory.map((item) => ({
      id: item.id,
      cells: [
        formatDate(item.date),
        <span className="font-semibold text-[#446685]">{item.caseLabel}</span>,
        <span className={clampText}>{item.input}</span>,
        <span className={clampText}>{item.chronology}</span>,
        <ViewLink
          to={`/report/${item.kind}`}
          state={item.state}
          label={`Lihat laporan ${item.caseLabel} tanggal ${formatDate(item.date)}`}
        />,
      ],
    }));
  }

  return dummyAnalysisHistory.map((item) => ({
    id: item.id,
    cells: [
      formatDate(item.date),
      <span className="font-semibold text-[#446685]">{item.typeLabel}</span>,
      <span className={clampText}>{item.input}</span>,
      <span
        className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${RISK_STYLE[item.riskCategory]}`}
      >
        {item.riskCategory} · {item.riskScore}
      </span>,
      <ViewLink
        to={item.route}
        state={item.state}
        label={`Lihat hasil analisis ${item.typeLabel} tanggal ${formatDate(item.date)}`}
      />,
    ],
  }));
}

export default function History() {
  const [activeTab, setActiveTab] = useState<TabKey>("emergency");
  const { username } = useAuth();
  const current = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const isDemo = username?.trim().toLowerCase() === DEMO_USERNAME;
  const rows = isDemo ? buildRows(current.key) : [];
  const gridStyle = {
    gridTemplateColumns: "0.8fr 1fr 1.4fr 1.8fr 0.8fr",
  };

  return (
    <main className="flex w-full flex-1 justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="relative w-full max-w-[1160px]">
        <div className="mb-4 sm:absolute sm:left-0 sm:top-0 sm:mb-0">
          <BackLink to="/" label="Beranda" />
        </div>
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
            const count = isDemo
              ? tab.key === "emergency"
                ? dummyEmergencyHistory.length
                : dummyAnalysisHistory.length
              : 0;
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
                {count > 0 && (
                  <span className={`ml-1.5 text-xs ${isActive ? "text-white/80" : "text-[#5E83A5]"}`}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {isDemo && (
          <p className="mt-4 text-center text-xs text-[#5E83A5]">
            Akun demo: isi tabel di bawah adalah data contoh.
          </p>
        )}

        {/* Panel */}
        <section
          id="history-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.key}`}
          className="mt-4 overflow-hidden rounded-[28px] bg-white/60 shadow-md sm:rounded-[36px]"
        >
          <div className="overflow-x-auto">
            <div role="table" aria-label={`Riwayat ${current.label}`} className="min-w-[760px]">
              <div role="rowgroup">
                <div
                  role="row"
                  className="grid border-b border-[#B9C8DA]/60 bg-[#446685]/10 px-4 text-center text-sm font-bold text-[#446685]"
                  style={gridStyle}
                >
                  {current.columns.map((column) => (
                    <div key={column} role="columnheader" className="px-2 py-3.5">
                      {column}
                    </div>
                  ))}
                </div>
              </div>

              {rows.length > 0 && (
                <div role="rowgroup">
                  {rows.map((row) => (
                    <div
                      key={row.id}
                      role="row"
                      className="grid items-center border-b border-[#B9C8DA]/40 px-4 text-center text-sm text-[#3F4E5E] transition-colors last:border-b-0 hover:bg-white/50"
                      style={gridStyle}
                    >
                      {row.cells.map((cell, index) => (
                        <div
                          key={`${row.id}-${current.columns[index]}`}
                          role="cell"
                          className="flex justify-center px-2 py-4"
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {rows.length === 0 && (
            <div className="flex flex-col items-center px-6 py-14 text-center sm:py-20">
              <p className="text-lg font-bold text-[#446685]">{current.emptyTitle}</p>
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
          )}
        </section>
      </div>
    </main>
  );
}
