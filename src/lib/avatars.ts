import heroRobot from "../assets/Home/heroicon.webp";
import winkRobot from "../assets/Home/body-2.webp";
import phoneRobot from "../assets/Emergency/robot1.webp";
import detectiveRobot from "../assets/Emergency/robot2.webp";
import waveRobot from "../assets/Emergency/robotInfo.webp";
import shieldRobot from "../assets/Robots/robot-perisai.webp";
import lockRobot from "../assets/Robots/robot-gembok.webp";
import bookRobot from "../assets/Robots/robot-baca.webp";
import happyRobot from "../assets/Robots/robot-senang.webp";
import shockedRobot from "../assets/Robots/robot-kaget.webp";

// Pilihan foto profil: semua maskot CegahScam, dipotong supaya kepalanya pas di lingkaran.
export const AVATARS = [
  {
    id: "jempol",
    label: "Robot jempol",
    src: heroRobot,
    bg: "bg-[#DCE9FF]",
    img: "left-[52%] top-[-4%] w-[150%]",
  },
  {
    id: "kedip",
    label: "Robot kedip",
    src: winkRobot,
    bg: "bg-[#D9F3EC]",
    img: "left-[50%] top-[-4%] w-[150%]",
  },
  {
    id: "chat",
    label: "Robot pegang HP",
    src: phoneRobot,
    bg: "bg-[#FFE7D1]",
    img: "left-[82%] top-[-22%] w-[190%]",
  },
  {
    id: "detektif",
    label: "Robot detektif",
    src: detectiveRobot,
    bg: "bg-[#EAE2FF]",
    img: "left-[41%] top-[-22%] w-[190%]",
  },
  {
    id: "sapa",
    label: "Robot menyapa",
    src: waveRobot,
    bg: "bg-[#FFF1C2]",
    img: "left-[-16%] top-[-70%] w-[300%]",
  },
  {
    id: "perisai",
    label: "Robot perisai",
    src: shieldRobot,
    bg: "bg-[#D6E8FF]",
    img: "left-[50%] top-[8%] w-[168%]",
  },
  {
    id: "gembok",
    label: "Robot gembok",
    src: lockRobot,
    bg: "bg-[#E1F0FA]",
    img: "left-[51%] top-[6%] w-[163%]",
  },
  {
    id: "baca",
    label: "Robot kutu buku",
    src: bookRobot,
    bg: "bg-[#FDE2EC]",
    img: "left-[51%] top-[-4%] w-[154%]",
  },
  {
    id: "senang",
    label: "Robot senang",
    src: happyRobot,
    bg: "bg-[#DDF5D8]",
    img: "left-[50%] top-[-1%] w-[174%]",
  },
  {
    id: "kaget",
    label: "Robot kaget",
    src: shockedRobot,
    bg: "bg-[#FFE0D6]",
    img: "left-[63%] top-[3%] w-[163%]",
  },
] as const;

export type AvatarId = (typeof AVATARS)[number]["id"];
