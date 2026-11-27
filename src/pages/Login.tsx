import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import AuthField from "../components/AuthField";
import {
  AlertIcon,
  ArrowRightIcon,
  LockIcon,
  UserIcon,
} from "../components/AuthIcons";
import google from "../assets/Icon/google.svg";
import robot from "../assets/Robots/robot-gembok.webp";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as { from?: string; needLogin?: boolean } | null;
  const redirectTo = routeState?.from ?? "/";
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError("Username dan kata sandi wajib diisi.");
      return;
    }

    if (trimmedUsername === "admin@123" && password === "123") {
      login(trimmedUsername);
      navigate(redirectTo, { replace: true });
      return;
    }

    setError("Username atau password salah. Periksa kembali lalu coba lagi.");
  };

  return (
    <AuthLayout
      robot={robot}
      robotAlt="Maskot CegahScam memberi jempol"
      tagline="Lindungi dirimu dari penipuan"
      description="Masuk supaya riwayat analisis dan laporanmu tersimpan rapi."
    >
      <h2 className="text-[23px] font-bold leading-snug text-[#446685] sm:text-[28px]">
        Masuk ke akunmu
      </h2>

      <p className="mt-1.5 text-sm text-[#3F4E5E]">
        Belum punya akun?{" "}
        <NavLink
          to="/register"
          className="font-semibold text-[#1E40AF] underline-offset-4 transition hover:underline"
        >
          Daftar sekarang
        </NavLink>
      </p>

      {routeState?.needLogin && (
        <div
          role="status"
          className="mt-4 rounded-xl bg-[#EAF2FF] px-3.5 py-3 text-sm text-[#26384A]"
        >
          Masuk dulu untuk membuka halaman itu.
        </div>
      )}

      <form onSubmit={handleLogin} noValidate className="mt-5 space-y-3.5">
        <AuthField
          label="Username atau email"
          value={username}
          onChange={(value) => {
            setUsername(value);
            if (error) setError("");
          }}
          icon={<UserIcon className="h-[18px] w-[18px]" />}
          placeholder="Masukkan username atau email"
          autoComplete="username"
        />

        <AuthField
          label="Kata sandi"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (error) setError("");
          }}
          icon={<LockIcon className="h-[18px] w-[18px]" />}
          placeholder="Masukkan kata sandi"
          autoComplete="current-password"
        />

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#47a8e4] py-2.5 text-[15px] font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/25"
        >
          Masuk
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </form>

      <div className="my-3.5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#DCE6F2]" />
        <span className="text-xs text-[#5E83A5]">atau</span>
        <span className="h-px flex-1 bg-[#DCE6F2]" />
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#B9C8DA] bg-white py-2.5 text-[15px] font-semibold text-[#446685] transition duration-200 hover:bg-[#F5F7FA] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#47a8e4]/20"
      >
        <img src={google} alt="" className="h-5 w-5" />
        Masuk dengan Google
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-[#3F4E5E]">
        Dengan masuk, kamu menyetujui{" "}
        <Link to="/syarat-ketentuan" target="_blank" className="font-semibold text-[#1E40AF] hover:underline">
          Syarat &amp; Ketentuan
        </Link>{" "}
        serta{" "}
        <Link to="/kebijakan-privasi" target="_blank" className="font-semibold text-[#1E40AF] hover:underline">
          Kebijakan Privasi
        </Link>
        .
      </p>
    </AuthLayout>
  );
}
