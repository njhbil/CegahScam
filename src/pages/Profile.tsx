import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthField from "../components/AuthField";
import Avatar from "../components/Avatar";
import { AVATARS } from "../lib/avatars";
import BackLink from "../components/BackLink";
import { LockIcon, PhoneIcon, UserIcon } from "../components/AuthIcons";

type ProfileForm = {
  username: string;
  nama: string;
  telepon: string;
  pekerjaan: string;
  alamat: string;
  kodePos: string;
  kota: string;
  provinsi: string;
  password: string;
};

export default function Profile() {
  const { username, avatar, setAvatar } = useAuth();
  const [pickerOpen, setPickerOpen] = useState(false);

  const initial: ProfileForm = {
    username: username ?? "",
    nama: "",
    telepon: "",
    pekerjaan: "",
    alamat: "",
    kodePos: "",
    kota: "",
    provinsi: "",
    password: "",
  };

  const [formData, setFormData] = useState<ProfileForm>(initial);

  const isChanged = (Object.keys(initial) as (keyof ProfileForm)[]).some(
    (key) => formData[key] !== initial[key],
  );

  const set = (key: keyof ProfileForm) => (value: string) =>
    setFormData((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: kirim perubahan profil ke backend di sini.
  };

  return (
    <main className="flex w-full flex-1 justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="relative w-full max-w-[1160px]">
        <div className="mb-4 sm:absolute sm:left-0 sm:top-0 sm:mb-0">
          <BackLink to="/" label="Beranda" />
        </div>
        <h1 className="text-center text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
          Profil Pengguna
        </h1>
        <p className="mt-2 text-center text-sm text-[#3F4E5E] sm:text-[15px]">
          Perbarui data dirimu supaya laporan lebih mudah diproses
        </p>

        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-6">
          {/* Kartu akun */}
          <aside className="flex flex-col items-center rounded-[28px] bg-white/60 px-6 py-6 lg:py-8 text-center shadow-md sm:rounded-[44px] lg:row-span-2 lg:sticky lg:top-28">
            <button
              type="button"
              onClick={() => setPickerOpen((value) => !value)}
              aria-expanded={pickerOpen}
              aria-controls="avatar-picker"
              aria-label="Ganti foto profil"
              className="group relative rounded-full bg-white p-[3px] shadow-lg shadow-[#446685]/15 transition duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30"
            >
              <Avatar className="h-24 w-24 transition-transform duration-200 group-hover:scale-[1.03] lg:h-28 lg:w-28" />
              <span className="absolute bottom-0.5 right-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#47a8e4] text-white shadow-md ring-2 ring-white">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-4-4L4 16v4Z" />
                  <path d="m13.5 6.5 4 4" />
                </svg>
              </span>
            </button>

            {pickerOpen && (
              <div
                id="avatar-picker"
                className="mt-4 w-full animate-fade-in rounded-2xl bg-white px-3 py-3.5 shadow-md"
              >
                <p className="text-sm font-bold text-[#446685]">Pilih robot kamu</p>
                <div
                  role="radiogroup"
                  aria-label="Pilihan foto profil"
                  className="mt-3 grid grid-cols-5 gap-1.5"
                >
                  {AVATARS.map((option) => {
                    const selected = option.id === avatar;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={option.label}
                        title={option.label}
                        onClick={() => setAvatar(option.id)}
                        className={`rounded-full p-[3px] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/30 ${
                          selected ? "ring-2 ring-[#47a8e4]" : "ring-1 ring-[#B9C8DA]/60"
                        }`}
                      >
                        <Avatar variant={option.id} className="aspect-square w-full" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="mt-4 max-w-full break-words text-lg font-bold text-[#446685]">
              {username || "Pengguna"}
            </p>
            <p className="mt-1 text-sm text-[#3F4E5E]">Akun CegahScam</p>

            <div className="mt-6 flex w-full flex-col gap-2.5">
              <Link
                to="/history"
                className="rounded-2xl bg-white py-2.5 text-sm font-semibold text-[#446685] shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5F7FA] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25"
              >
                Lihat riwayat
              </Link>
              <button
                type="button"
                className="rounded-2xl py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
              >
                Hapus pengguna
              </button>
            </div>

            <div className="mt-6 w-full rounded-2xl bg-[#EAF2FF] px-4 py-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#446685]">
                Paket kamu
              </p>
              <p className="mt-1 text-base font-bold text-[#183B56]">Gratis</p>
              <p className="mt-0.5 text-sm text-[#3F4E5E]">
                Termasuk 3 laporan gratis.
              </p>
              <button
                type="button"
                disabled
                className="mt-3 w-full rounded-xl bg-white/80 py-2 text-sm font-semibold text-[#446685] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Paket Pro, segera hadir
              </button>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <section className="rounded-[28px] bg-white/60 px-5 py-7 shadow-md sm:rounded-[44px] sm:px-9 sm:py-9">
              <h2 className="text-xl font-bold leading-tight text-[#446685] sm:text-2xl">
                Data diri
              </h2>

              <div className="mt-5 flex flex-col gap-4">
                <AuthField
                  label="Nama lengkap"
                  value={formData.nama}
                  onChange={set("nama")}
                  placeholder="Nama lengkapmu"
                  autoComplete="name"
                />
                <AuthField
                  label="Nomor telepon"
                  type="tel"
                  value={formData.telepon}
                  onChange={set("telepon")}
                  icon={<PhoneIcon className="h-[18px] w-[18px]" />}
                  placeholder="08xxxxxxxxxx"
                  autoComplete="tel"
                />
                <AuthField
                  label="Pekerjaan"
                  value={formData.pekerjaan}
                  onChange={set("pekerjaan")}
                  placeholder="Pekerjaanmu"
                  autoComplete="organization-title"
                />
                <AuthField
                  label="Alamat"
                  value={formData.alamat}
                  onChange={set("alamat")}
                  placeholder="Alamat tinggalmu"
                  autoComplete="street-address"
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <AuthField
                    label="Kode pos"
                    value={formData.kodePos}
                    onChange={set("kodePos")}
                    placeholder="Kode pos"
                    autoComplete="postal-code"
                  />
                  <AuthField
                    label="Kota"
                    value={formData.kota}
                    onChange={set("kota")}
                    placeholder="Kota tinggalmu"
                    autoComplete="address-level2"
                  />
                  <AuthField
                    label="Provinsi"
                    value={formData.provinsi}
                    onChange={set("provinsi")}
                    placeholder="Provinsimu"
                    autoComplete="address-level1"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[28px] bg-white/60 px-5 py-7 shadow-md sm:rounded-[44px] sm:px-9 sm:py-9">
              <h2 className="text-xl font-bold leading-tight text-[#446685] sm:text-2xl">
                Informasi akun
              </h2>

              <div className="mt-5 flex flex-col gap-4">
                <AuthField
                  label="Username"
                  value={formData.username}
                  onChange={set("username")}
                  icon={<UserIcon className="h-[18px] w-[18px]" />}
                  placeholder="Username"
                  autoComplete="username"
                />
                <AuthField
                  label="Kata sandi baru"
                  type="password"
                  value={formData.password}
                  onChange={set("password")}
                  icon={<LockIcon className="h-[18px] w-[18px]" />}
                  placeholder="Kosongkan jika tidak diganti"
                  autoComplete="new-password"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={!isChanged}
              className="w-full self-end rounded-2xl bg-[#47a8e4] px-8 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#B9C8DA] disabled:shadow-none sm:w-auto"
            >
              Simpan perubahan
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
