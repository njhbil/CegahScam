import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showLoginAlert } from "../utils/authAlert";

import AnalysisHook from "../components/AnalysisHook";
import Robot from "../components/Robot";
import robotPhone from "../assets/Robots/robot-telepon.webp";
import robotChat from "../assets/Robots/robot-chat.webp";
import robotScreenshot from "../assets/Robots/robot-screenshot.webp";

const options = [
  {
    path: "/analysis/phone",
    robot: robotPhone,
    alt: "Maskot CegahScam menerima telepon mencurigakan",
    motion: "float",
    text: "Periksa riwayat dan indikasi penipuan dari nomor telepon tidak dikenal",
  },
  {
    path: "/analysis/chat",
    robot: robotChat,
    alt: "Maskot CegahScam menunjuk pesan chat",
    motion: "sway",
    text: "Periksa riwayat dan indikasi penipuan dari pesan chat yang mencurigakan",
  },
  {
    path: "/analysis/screenshot",
    robot: robotScreenshot,
    alt: "Maskot CegahScam memegang tangkapan layar",
    motion: "bob",
    text: "Periksa riwayat dan indikasi penipuan dari tangkapan layar yang kamu kirim",
  },
] as const;

export default function Analysis() {
  const { IsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAnalytic = async (path: string) => {
    if (!IsLoggedIn) {
      const confirmed = await showLoginAlert();

      if (confirmed) {
        navigate("/login");
      }

      return;
    }

    navigate(path);
  };

  return (
    <div className="mx-auto w-full max-w-[1160px] px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
      <div
        id="hero-section"
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-4"
      >
        <AnalysisHook />
        <div className="mx-auto my-4 flex w-full max-w-[800px] items-center justify-between gap-1.5 rounded-[18px] bg-white/40 px-3 py-3 shadow-lg sm:my-6 sm:gap-4 sm:rounded-[50px] sm:px-8 sm:py-4">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5E83A5] text-[10px] text-white sm:h-6 sm:w-6 sm:text-[12px]">
              1
            </p>
            <p className="text-[10px] font-bold text-[#5E83A5] sm:text-sm">
              Pilih Kasus
            </p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50"></div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-5 w-5 items-center justify-center rounded-full bg-[#667085] text-[10px] text-white sm:h-6 sm:w-6 sm:text-[12px]">
              2
            </p>
            <p className="text-[10px] text-[#667085] sm:text-sm">Isi Data</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50"></div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-5 w-5 items-center justify-center rounded-full bg-[#667085] text-[10px] text-white sm:h-6 sm:w-6 sm:text-[12px]">
              3
            </p>
            <p className="text-[10px] text-[#667085] sm:text-sm">
              Hasil Analisis
            </p>
          </div>
        </div>
      </div>

      <div
        id="body-section"
        className="reveal mt-4 flex w-full flex-col items-center rounded-[28px] bg-white/50 px-4 py-8 shadow-xl sm:mt-6 sm:rounded-[40px] sm:px-6 sm:py-10 lg:rounded-[50px] lg:px-10"
      >
        <div id="title" className="my-4 text-center sm:my-6">
          <h1 className="text-xl font-bold leading-tight text-[#446685] sm:text-2xl">
            Apa yang sedang kamu alami?
          </h1>
          <p className="mx-auto mt-2 max-w-2xl px-2 text-sm text-[#3F4E5E] sm:text-base">
            Pilih kondisi yang ingin kamu analisis sesuai dengan apa yang kamu
            alami.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-12">
          {options.map((option) => (
            <div
              key={option.path}
              className="relative flex w-full max-w-[320px] flex-1 flex-col items-center pt-30 transition duration-300 hover:-translate-y-1 sm:pt-35"
            >
              <Robot
                src={option.robot}
                alt={option.alt}
                motion={option.motion}
                interactive
                className="absolute top-0 z-10 h-45 w-45 object-contain sm:h-50 sm:w-50"
              />

              <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-6 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-20 shadow-lg sm:px-8 lg:gap-8 lg:px-10">
                <p className="text-center text-sm font-bold text-white sm:text-base">
                  {option.text}
                </p>
                <button
                  onClick={() => handleAnalytic(option.path)}
                  className="whitespace-nowrap rounded-full bg-[#eff5fa] px-5 py-2 text-sm text-[#2e4a5c] transition hover:bg-[#5E83A5] hover:text-white sm:text-base"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
