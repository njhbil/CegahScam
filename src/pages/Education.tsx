import { useState } from "react";
import { Link } from "react-router-dom";

import foto1 from "../assets/Education/carousel/carousel1.webp";
import foto2 from "../assets/Education/carousel/carousel2.webp";
import foto3 from "../assets/Education/carousel/carousel3.webp";
import foto4 from "../assets/Education/carousel/carousel4.webp";
import heroRobot from "../assets/Robots/robot-baca.webp";
import eduRobot from "../assets/Robots/robot-senang.webp";
import robotModus from "../assets/Robots/robot-detektif.webp";
import robotChat from "../assets/Robots/robot-hp.webp";
import Robot from "../components/Robot";

const modus = [
  {
    title: "Impersonation",
    body: "Pelaku berpura-pura menjadi pihak resmi, customer service, teman, atau institusi tertentu untuk mendapatkan kepercayaan korban.",
  },
  {
    title: "Urgency",
    body: "Pelaku menciptakan situasi mendesak agar korban tidak memiliki waktu untuk berpikir atau melakukan verifikasi.",
  },
  {
    title: "Threat",
    body: "Pelaku menggunakan rasa takut atau ancaman agar korban mengikuti instruksi yang diberikan.",
  },
  {
    title: "Fake Customer Service",
    body: "Pelaku menyamar sebagai customer service dari bank, platform, atau layanan tertentu untuk mendapatkan informasi atau membuat korban melakukan tindakan tertentu.",
  },
  {
    title: "Fake Investment",
    body: "Pelaku menawarkan investasi dengan cara yang dapat membuat korban tertarik untuk memberikan uang atau informasi.",
  },
  {
    title: "Phishing",
    body: "Pelaku menyamar sebagai pihak terpercaya untuk mengarahkan korban melakukan tindakan tertentu atau memberikan informasi.",
  },
];

const glossary = [
  {
    term: "Scam",
    definition:
      "Penipuan digital untuk mendapatkan uang atau data pribadi dengan cara menipu korban.",
  },
  {
    term: "Phishing",
    definition:
      "Jenis scam yang menggunakan pesan, email, atau situs palsu untuk mencuri informasi pribadi.",
  },
  {
    term: "Social Engineering",
    definition:
      "Teknik manipulasi psikologis untuk membuat korban memberikan informasi rahasia.",
  },
  {
    term: "OTP (One Time Password)",
    definition:
      "Kode verifikasi satu kali untuk mengamankan akun. Jangan pernah membagikannya kepada siapa pun.",
  },
  {
    term: "Malware",
    definition:
      "Perangkat lunak berbahaya yang dapat merusak perangkat atau mencuri data.",
  },
  {
    term: "Data Breach",
    definition:
      "Kebocoran data pribadi atau sensitif yang bisa disalahgunakan oleh pihak tidak bertanggung jawab.",
  },
  {
    term: "Link Mencurigakan",
    definition:
      "Tautan yang dapat mengarahkan ke situs palsu atau menginstal malware di perangkat.",
  },
  {
    term: "Investasi Bodong",
    definition:
      "Penawaran investasi palsu dengan iming-iming keuntungan besar dalam waktu singkat.",
  },
  {
    term: "Smishing",
    definition:
      "Penipuan melalui pesan singkat yang berisi link palsu atau permintaan informasi pribadi untuk menipu korban.",
  },
  {
    term: "Vishing",
    definition:
      "Penipuan melalui panggilan suara ketika pelaku menyamar sebagai pihak resmi dan meminta data atau tindakan tertentu.",
  },
  {
    term: "Spoofing",
    definition:
      "Pemalsuan identitas, nomor, alamat email, atau situs agar komunikasi terlihat berasal dari pihak yang tepercaya.",
  },
  {
    term: "Deepfake",
    definition:
      "Konten audio, foto, atau video yang dimanipulasi dengan teknologi AI untuk meniru seseorang atau membuat informasi palsu.",
  },
  {
    term: "Ransomware",
    definition:
      "Malware yang mengunci atau mengenkripsi file korban lalu meminta tebusan untuk mengembalikan akses.",
  },
  {
    term: "SIM Swap",
    definition:
      "Pengambilalihan nomor telepon dengan memindahkannya ke kartu SIM lain untuk menerima kode verifikasi korban.",
  },
  {
    term: "Doxing",
    definition:
      "Penyebaran data pribadi seseorang ke publik tanpa izin, seperti alamat, nomor telepon, atau identitas.",
  },
  {
    term: "Two-Factor Authentication (2FA)",
    definition:
      "Lapisan keamanan tambahan yang meminta dua bentuk verifikasi saat login, misalnya password dan kode dari authenticator.",
  },
  {
    term: "Password Manager",
    definition:
      "Aplikasi untuk menyimpan dan membuat password unik secara aman sehingga kamu tidak perlu memakai password yang sama.",
  },
  {
    term: "Zero-Day",
    definition:
      "Celah keamanan yang belum diketahui atau belum memiliki perbaikan resmi ketika mulai dimanfaatkan.",
  },
];

const chatExamples = [
  {
    image: foto1,
    alt: "Contoh pola chat scam 1",
    label: "Hadiah",
    title: "Hadiah palsu",
    description:
      "Pesan mengaku dari program loyalitas dan menjanjikan hadiah Rp2 juta. Korban diarahkan ke link verifikasi lalu diminta menyerahkan data rekening dan kode OTP.",
    flags: [
      "Nomor pengirim tidak dikenal.",
      "Hadiah datang tanpa pernah mengikuti program.",
      "Diminta mengisi OTP lewat sebuah link.",
    ],
    action:
      "Cek promo lewat aplikasi resmi. OTP tidak pernah diminta siapa pun, termasuk bank.",
  },
  {
    image: foto2,
    alt: "Contoh pola chat scam 2",
    label: "Bank",
    title: "Bank palsu",
    description:
      "Pelaku mengaku dari bank dan menyebut ada aktivitas mencurigakan. Korban diminta verifikasi dalam waktu singkat, lalu menyerahkan nomor kartu ATM, PIN, dan OTP.",
    flags: [
      "Bank tidak pernah meminta PIN atau OTP lewat chat.",
      "Nomor pengirim bukan kanal resmi.",
      "Ada ancaman rekening diblokir.",
    ],
    action:
      "Hubungi call center dari nomor di aplikasi resmi. Jangan klik link atau membalas pesan.",
  },
  {
    image: foto3,
    alt: "Contoh pola chat scam 3",
    label: "Marketplace",
    title: "Marketplace palsu",
    description:
      "Pesanan diklaim bermasalah dan korban diarahkan ke domain tiruan seperti t0koped1a.com untuk melakukan konfirmasi pembayaran.",
    flags: [
      "Domain tiruan: t0koped1a.com.",
      "Verifikasi dilakukan di luar aplikasi.",
      "Pesan dikirim dari nomor pribadi.",
    ],
    action:
      "Buka aplikasi marketplace langsung dan cek menu Pesanan. Jangan login lewat link.",
  },
  {
    image: foto4,
    alt: "Contoh pola chat scam 4",
    label: "Kurir",
    title: "Kurir palsu",
    description:
      "Paket diklaim gagal dikirim karena alamat tidak sesuai. Korban diminta membayar biaya admin lewat situs palsu cek-paket.sh0pee-expres.com.",
    flags: [
      "Domain tiruan: sh0pee-expres.com.",
      "Biaya tambahan diminta di luar aplikasi.",
      "Nomor pengirim tidak dikenal.",
    ],
    action:
      "Cek nomor resi di aplikasi belanja. Biaya kirim ulang yang sah muncul di aplikasi.",
  },
];

type SectionHeadingProps = {
  title: string;
  description: string;
};

function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 lg:mb-10">
      <h2 className="max-w-2xl text-balance text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#52789A] lg:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function Education() {
  const [query, setQuery] = useState("");
  const [activeChat, setActiveChat] = useState(0);

  const keyword = query.trim().toLowerCase();
  const filteredGlossary = keyword
    ? glossary.filter((item) =>
        `${item.term} ${item.definition}`.toLowerCase().includes(keyword),
      )
    : glossary.slice(0, 6);

  return (
    <div className="w-full pb-20 pt-24 lg:pt-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <section
          id="hero-section"
          className="flex items-center justify-center lg:min-h-[calc(100dvh_-_12rem)]"
        >
          <div className="grid w-full gap-6 rounded-[32px] bg-white/50 px-5 py-8 shadow-md sm:gap-8 sm:rounded-[44px] sm:px-8 lg:min-h-[420px] lg:grid-cols-[1fr_auto] lg:content-center lg:items-center lg:gap-x-6 lg:gap-y-10 lg:py-3 lg:ps-16 lg:pr-12 xl:ps-24">
            <div className="order-1 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
              <h1 className="text-balance text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                Yuk kenali scam,
                <span className="block">sebelum terjadi.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-[#3F4E5E] sm:text-[14px] lg:mx-0 lg:text-[15px]">
                Pelajari cara penipuan bekerja, tanda-tanda yang perlu
                diperhatikan, dan langkah sederhana untuk melindungi diri.
              </p>
            </div>

            <div className="relative order-2 mx-auto w-fit lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end">
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-4 top-10 -z-10 rounded-full bg-[#ADCEFF]/40 blur-2xl"
              />
              <Robot
                src={heroRobot}
                alt="Maskot CegahScam sedang membaca buku"
                motion="float"
                interactive
                className="w-48 object-contain sm:w-56 lg:h-[clamp(280px,50vh,440px)] lg:w-auto"
              />
              <ul
                aria-label="Contoh modus yang dibahas"
                className="pointer-events-none hidden text-[11px] min-[420px]:block font-semibold text-[#446685] sm:text-[12px]"
              >
                <li className="absolute -left-10 top-[12%] rounded-full bg-white px-3 py-1.5 shadow-md shadow-[#8FA9C4]/30 sm:-left-16">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#47a8e4]" />Panggilan tak dikenal
                </li>
                <li className="absolute -right-8 top-[38%] rounded-full bg-white px-3 py-1.5 shadow-md shadow-[#8FA9C4]/30 sm:-right-14">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#F59E0B]" />Peringatan palsu
                </li>
                <li className="absolute -left-6 bottom-[14%] rounded-full bg-white px-3 py-1.5 shadow-md shadow-[#8FA9C4]/30 sm:-left-12">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#EF4444]" />Data dicuri
                </li>
              </ul>
            </div>

            <div className="order-3 flex flex-col gap-3 sm:flex-row sm:justify-center lg:col-start-1 lg:row-start-2 lg:justify-start">
              <a
                href="#modus"
                className="rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
              >
                Mulai dari modus terkini
              </a>
              <Link
                to="/analysis"
                className="rounded-2xl border border-[#47a8e4]/60 bg-white px-6 py-2.5 text-center text-sm font-semibold text-[#2E86B7] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#47a8e4] hover:bg-[#EAF6FD] sm:text-base"
              >
                Periksa pesan mencurigakan
              </Link>
            </div>
          </div>
        </section>

        <section id="modus" className="mt-20 scroll-mt-32 lg:mt-24">
          <div className="mb-8 flex flex-col items-center gap-6 rounded-[30px] border border-white/70 bg-linear-to-br from-[#EAF6FD] to-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7 lg:mb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-10">
            <Robot
              src={robotModus}
              alt="Maskot CegahScam memeriksa modus scam dengan kaca pembesar"
              motion="bob"
              interactive
              className="w-40 shrink-0 object-contain drop-shadow-xl sm:w-48 lg:mx-auto lg:w-full lg:max-w-[240px]"
            />

            <div className="text-center lg:text-left">
              <h2 className="text-balance text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                Modus Scam Terkini
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#52789A] lg:text-[15px]">
                Pelajari bagaimana pelaku menggunakan pesan, akun palsu, link
                mencurigakan, dan berbagai cara lain untuk memperdaya korban.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modus.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#A5C6FF] hover:bg-white hover:shadow-lg sm:p-6"
              >
                <h3 className="text-[17px] font-bold leading-snug text-[#446685]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#3F4E5E]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="pola" className="mt-20 scroll-mt-32 lg:mt-24">
          <div className="mb-8 flex flex-col items-center gap-6 rounded-[30px] border border-white/70 bg-linear-to-br from-[#EAF6FD] to-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7 lg:mb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-10">
            <Robot
              src={robotChat}
              alt="Maskot CegahScam menunjukkan contoh pesan scam di ponsel"
              motion="sway"
              interactive
              className="w-40 shrink-0 object-contain drop-shadow-xl sm:w-48 lg:mx-auto lg:w-full lg:max-w-[240px]"
            />

            <div className="text-center lg:text-left">
              <h2 className="text-balance text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                Pola Chat Scam yang Sering Terjadi
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#52789A] lg:text-[15px]">
                Beberapa pola chat penipuan, scam, dan phishing yang sering
                terjadi.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-x-6 border-b border-[#446685]/15">
              {chatExamples.map((item, index) => {
                const isActive = activeChat === index;

                return (
                  <button
                    key={item.alt}
                    type="button"
                    onClick={() => setActiveChat(index)}
                    aria-pressed={isActive}
                    className={`relative -mb-px pb-3 text-sm font-semibold transition ${
                      isActive
                        ? "text-[#111827]"
                        : "text-[#52789A] hover:text-[#446685]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#446685]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl shadow-lg sm:h-full">
                <img
                  src={chatExamples[activeChat].image}
                  alt={chatExamples[activeChat].alt}
                  className="aspect-[9/18] w-full object-cover object-top sm:h-full"
                />
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-bold text-[#446685]">
                  {chatExamples[activeChat].title}
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#3F4E5E]">
                  {chatExamples[activeChat].description}
                </p>

                <div className="mt-5">
                  <p className="text-[13px] font-bold text-[#111827]">
                    Tanda bahaya
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {chatExamples[activeChat].flags.map((flag) => (
                      <li
                        key={flag}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-[#3F4E5E]"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#E11D48]" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5">
                  <p className="text-[13px] font-bold text-[#111827]">
                    Yang perlu dilakukan
                  </p>
                  <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#3F4E5E]">
                    {chatExamples[activeChat].action}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="glosarium" className="mt-20 scroll-mt-32 lg:mt-24">
          <SectionHeading
            title="Kamus Keamanan Digital"
            description="Kenali istilah penting seputar penipuan digital agar kamu lebih waspada dan terlindungi."
          />

          <div className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52789A]"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari istilah, misalnya OTP"
                  aria-label="Cari istilah keamanan digital"
                  className="w-full rounded-full border border-[#446685]/20 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-[#111827] outline-none transition placeholder:text-[#52789A]/70 focus:border-[#3385FF] focus:ring-2 focus:ring-[#3385FF]/20"
                />
              </div>

              <p className="text-[12px] text-[#52789A]">
                Menampilkan{" "}
                <span className="font-semibold text-[#111827]">
                  {filteredGlossary.length}
                </span>{" "}
                dari {glossary.length} istilah
                {!keyword && " populer"}
              </p>
            </div>

            {filteredGlossary.length > 0 ? (
              <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {filteredGlossary.map((item) => (
                  <div
                    key={item.term}
                    className="border-t border-[#446685]/12 py-4"
                  >
                    <h3 className="text-[15px] font-bold text-[#446685]">
                      {item.term}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#3F4E5E]">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl bg-white/70 px-4 py-8 text-center text-sm text-[#52789A]">
                Belum ada istilah yang cocok. Coba kata kunci lain.
              </p>
            )}
          </div>
        </section>

        <section id="penutup" className="mt-20 lg:mt-24">
          <div className="relative overflow-hidden rounded-[28px] bg-[#47a8e4] px-6 py-10 text-white shadow-xl sm:px-10 lg:px-14 lg:py-14">
            <Robot
              src={eduRobot}
              alt="Maskot CegahScam"
              motion="float"
              interactive
              className="relative z-10 mx-auto mb-6 w-45 object-contain lg:absolute lg:bottom-0 lg:right-12 lg:mb-0 lg:w-56"
            />

            <div className="relative z-10 max-w-2xl">
              <blockquote className="text-[24px] font-bold leading-snug sm:text-[30px] lg:text-[34px]">
                “Satu ons pencegahan lebih berharga daripada satu pon
                pengobatan.”
              </blockquote>
              <p className="mt-4 text-sm text-white/75">— Benjamin Franklin</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
