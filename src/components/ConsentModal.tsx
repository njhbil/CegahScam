import { useEffect, useRef, useState } from "react";
import LegalDocument from "./LegalDocument";
import { privacySections, termsSections } from "../lib/legalContent";

type ConsentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export default function ConsentModal({
  isOpen,
  onClose,
  onContinue,
}: ConsentModalProps) {
  const [hasRead, setHasRead] = useState(false);
  const [agree, setAgree] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const checkReachedBottom = () => {
    const element = documentRef.current;
    if (!element) return;

    const reachedBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (reachedBottom) setHasRead(true);
  };

  // Reset persetujuan setiap kali modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    setHasRead(false);
    setAgree(false);

    const element = documentRef.current;
    if (element) element.scrollTop = 0;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#183B56]/50 p-3 backdrop-blur-sm md:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl sm:rounded-[36px]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pb-3 pt-6">
          <div>
            <h2
              id="consent-title"
              className="text-xl font-bold leading-tight text-[#446685] sm:text-2xl"
            >
              Syarat &amp; Kebijakan Privasi
            </h2>
            <p className="mt-1 text-sm text-[#3F4E5E]">
              Baca sampai bawah, lalu setujui untuk membuat akun.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup persetujuan"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-[#446685] transition hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47a8e4]/40"
          >
            &times;
          </button>
        </div>

        {/* Isi dokumen: syarat lalu kebijakan privasi, satu kali scroll */}
        <div
          ref={documentRef}
          onScroll={checkReachedBottom}
          className="min-h-0 flex-1 overflow-y-auto border-y border-[#B9C8DA]/50 px-6 py-5"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#446685]">
            Bagian 1 · Syarat &amp; Ketentuan
          </p>
          <LegalDocument compact sections={termsSections} />

          <div className="my-7 h-px bg-[#B9C8DA]/60" />

          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#446685]">
            Bagian 2 · Kebijakan Privasi
          </p>
          <LegalDocument compact sections={privacySections} />
        </div>

        {/* Footer */}
        <div className="space-y-3.5 px-6 py-5">
          <label
            className={`flex items-start gap-3 text-sm text-[#3F4E5E] ${
              hasRead ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            }`}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(event) => setAgree(event.target.checked)}
              disabled={!hasRead}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#47a8e4]"
            />
            <span>
              Saya telah membaca dan menyetujui
              <strong> Syarat &amp; Ketentuan</strong> serta
              <strong> Kebijakan Privasi</strong> CegahScam.
            </span>
          </label>

          {!hasRead && (
            <p className="text-xs text-[#3F4E5E]">
              Scroll sampai bagian akhir untuk mengaktifkan persetujuan.
            </p>
          )}

          <button
            type="button"
            onClick={onContinue}
            disabled={!agree}
            className="w-full rounded-2xl bg-[#47a8e4] py-3 font-semibold text-white shadow-lg transition duration-200 hover:enabled:-translate-y-0.5 hover:enabled:bg-[#85B6FF] disabled:cursor-not-allowed disabled:bg-[#B9C8DA] disabled:shadow-none"
          >
            Setuju dan buat akun
          </button>
        </div>
      </div>
    </div>
  );
}
