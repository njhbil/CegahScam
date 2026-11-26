import robot from "../assets/Home/heroicon.webp";

// Foto profil default: kepala maskot CegahScam, dipakai sampai ada unggah foto.
export default function Avatar({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-full bg-[#DCE9FF] ${className}`}
    >
      <img
        src={robot}
        alt=""
        draggable={false}
        className="absolute left-[52%] top-[-4%] w-[150%] max-w-none -translate-x-1/2 select-none"
      />
    </span>
  );
}
