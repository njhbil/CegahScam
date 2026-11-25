import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import AuthField from "../components/AuthField";
import Robot from "../components/Robot";
import { LockIcon, UserIcon } from "../components/AuthIcons";
import robot from "../assets/Home/heroicon.webp";

type ProfileForm = {
  username: string;
  nama: string;
  pekerjaan: string;
  alamat: string;
  kodePos: string;
  kota: string;
  provinsi: string;
  password: string;
};

export default function Profile() {
  const { username } = useAuth();

  const initial: ProfileForm = {
    username: username ?? "",
    nama: "",
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

  const [restrictProcessing, setRestrictProcessing] = useState(false);

  const handleDeleteData = async () => {
    const result = await Swal.fire({
      title: "Hapus semua data?",
      text: "Riwayat laporan dan analisismu akan dihapus dan tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    // TODO: panggil endpoint penghapusan data di backend (dikerjakan terpisah).
    await Swal.fire({
      title: "Belum tersambung ke server",
      text: "Tombol ini sudah siap, tinggal dihubungkan ke backend.",
      icon: "info",
      confirmButtonColor: "#47a8e4",
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: kirim perubahan profil ke backend di sini.
  };

  return (
    <main className="flex w-full flex-1 justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="w-full max-w-[1160px]">
        <h1 className="text-center text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
          Profil Pengguna
        </h1>
        <p className="mt-2 text-center text-sm text-[#3F4E5E] sm:text-[15px]">
          Perbarui data dirimu supaya laporan lebih mudah diproses
        </p>

        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-6">
          {/* Kartu akun */}
          <aside className="flex flex-col items-center rounded-[28px] bg-white/60 px-6 py-6 lg:py-8 text-center shadow-md sm:rounded-[44px] lg:row-span-2 lg:sticky lg:top-28">
            <Robot
              src={robot}
              alt="Maskot CegahScam"
              motion="float"
              interactive
              className="hidden w-36 object-contain lg:block"
            />
            <p className="max-w-full break-words lg:mt-4 text-lg font-bold text-[#446685]">
              {username || "Pengguna"}
            </p>
            <p className="mt-1 text-sm text-[#3F4E5E]">
              Terakhir masuk 5 menit yang lalu
            </p>

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
              <h2 className="text-xl font-bold text-[#446685] sm:text-2xl">
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
              <h2 className="text-xl font-bold text-[#446685] sm:text-2xl">
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

          <section className="rounded-[28px] bg-white/60 px-5 py-7 shadow-md sm:rounded-[44px] sm:px-9 sm:py-9 lg:col-start-2">
            <h2 className="text-xl font-bold text-[#446685] sm:text-2xl">
              Privasi &amp; data
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#3F4E5E]">
              Kamu yang mengatur data pribadimu. Aturan lengkapnya ada di
              Syarat &amp; Ketentuan serta Kebijakan Privasi.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <label className="flex cursor-pointer items-start gap-3.5 rounded-2xl bg-white/70 p-4 transition hover:bg-white">
                <input
                  type="checkbox"
                  checked={restrictProcessing}
                  onChange={(event) => setRestrictProcessing(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#47a8e4]"
                />
                <span>
                  <span className="block text-sm font-semibold text-[#183B56]">
                    Batasi pemrosesan data saya
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-[#3F4E5E]">
                    Hak pembatasan: datamu hanya disimpan dan tidak diproses
                    lebih lanjut.
                  </span>
                </span>
              </label>

              <div className="flex flex-col gap-3 rounded-2xl bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#183B56]">
                    Hapus semua data saya
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#3F4E5E]">
                    Menghapus riwayat laporan dan analisis. Tidak bisa
                    dibatalkan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteData}
                  className="shrink-0 rounded-2xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition duration-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                >
                  Hapus data
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
