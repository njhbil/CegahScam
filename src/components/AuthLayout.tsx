import type { ReactNode } from "react";
import Robot from "./Robot";

type AuthLayoutProps = {
  children: ReactNode;
  robot: string;
  robotAlt: string;
  tagline: string;
  description: string;
};

export default function AuthLayout({
  children,
  robot,
  robotAlt,
  tagline,
  description,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center px-4 pb-6 pt-[4.75rem] sm:pt-[5rem]">
      <div className="grid w-full max-w-[480px] items-center lg:max-w-[1100px] lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-14 xl:gap-20">
        {/* Kiri (desktop): maskot langsung di atas background, tanpa kartu */}
        <section className="hidden flex-col items-center text-center lg:flex">
          <div className="relative flex aspect-square h-[min(48vh,400px)] items-center justify-center">
            {/* Lingkaran kecil di belakang robot, motif yang sama dengan bagian "Ingin periksa" di Home */}
            <div
              aria-hidden="true"
              className="circle-breathe absolute -inset-[10%] rounded-full border border-[#ADCEFF]/70 bg-[#ADCEFF]/15"
            />
            <div
              aria-hidden="true"
              className="circle-breathe-alt absolute inset-[2%] rounded-full border border-[#ADCEFF]/60 bg-[#ADCEFF]/25"
            />
            <Robot
              src={robot}
              alt={robotAlt}
              motion="float"
              interactive
              className="relative h-full w-auto max-w-full object-contain"
            />
          </div>
          <h2 className="mt-10 text-balance text-[28px] font-bold leading-tight text-[#446685] xl:text-[32px]">
            {tagline}
          </h2>
          <p className="mt-2 max-w-[22rem] text-balance text-[15px] leading-relaxed text-[#3F4E5E]">
            {description}
          </p>
        </section>

        {/* Kanan: kartu form */}
        <section className="rounded-[28px] bg-white/85 px-6 py-7 shadow-xl shadow-[#446685]/10 ring-1 ring-white sm:rounded-[36px] sm:px-9 sm:py-7 lg:flex lg:min-h-[540px] lg:flex-col lg:justify-center">
          {children}
        </section>
      </div>
    </main>
  );
}
