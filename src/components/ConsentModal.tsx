import { useEffect, useRef, useState } from "react";

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
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const documentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("termsConditions");

  const handleScroll = () => {
    const element = documentRef.current;

    if (!element) return;

    const isBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (isBottom) {
      if (activeSection === "termsConditions") {
        setHasReadTerms(true);
      } else {
        setHasReadPrivacy(true);
      }
    }
  };

  // Reset seluruh persetujuan ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setActiveSection("termsConditions");

      setHasReadTerms(false);
      setHasReadPrivacy(false);

      setAgreeTerms(false);
      setAgreePrivacy(false);
    }
  }, [isOpen]);

  // Reset posisi scroll setiap kali tab berubah
  useEffect(() => {
    if (!isOpen) return;

    const element = documentRef.current;

    if (!element) return;

    element.scrollTop = 0;

    // Jika konten tidak membutuhkan scroll,
    // otomatis tandai dokumen sudah dibaca.
    if (element.scrollHeight <= element.clientHeight + 5) {
      if (activeSection === "termsConditions") {
        setHasReadTerms(true);
      } else {
        setHasReadPrivacy(true);
      }
    }
  }, [isOpen, activeSection]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#183B56]/50 p-3 backdrop-blur-sm md:p-5">
      {/* Modal */}
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl sm:rounded-[36px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pb-2 pt-6">
          <div>
            <h2 className="text-xl font-bold text-[#446685] sm:text-2xl">
              Persetujuan Pengguna
            </h2>
            <p className="mt-1 text-sm text-[#3F4E5E]">
              Silakan baca ketentuan CegahScam sebelum melanjutkan.
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

        {/* Navigation Section */}
        <div className="mx-6 mt-3 flex gap-1.5 rounded-2xl bg-[#F5F7FA] p-1.5">
          <button
            type="button"
            onClick={() => setActiveSection("termsConditions")}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
              activeSection === "termsConditions"
                ? "bg-[#47a8e4] text-white shadow-md"
                : "text-[#446685] hover:bg-white"
            }`}
          >
            Terms & Conditions
            {hasReadTerms && " ✓"}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("privacyPolicy")}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
              activeSection === "privacyPolicy"
                ? "bg-[#47a8e4] text-white shadow-md"
                : "text-[#446685] hover:bg-white"
            }`}
          >
            Privacy Policy
            {hasReadPrivacy && " ✓"}
          </button>
        </div>

        {/* Document Content */}
        <div
          ref={documentRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-y-auto px-6 py-5"
        >
          {activeSection === "termsConditions" && (
            <section className="space-y-5 text-sm leading-relaxed text-[#3F4E5E]">
              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  1. Ketentuan Umum
                </h3>
                <p>
                  Selamat datang di CegahScam. CegahScam merupakan layanan
                  digital yang bertujuan membantu pengguna mengenali dan
                  memahami potensi penipuan digital. Dengan membuat akun dan
                  menggunakan layanan CegahScam, pengguna dianggap telah membaca
                  dan menyetujui syarat dan ketentuan yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  2. Ketentuan Informasi Pengguna
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna wajib memberikan informasi yang benar, akurat, dan
                    tidak menyesatkan ketika melakukan pendaftaran.
                  </li>
                  <li>
                    Pengguna bertanggung jawab menjaga kerahasiaan informasi
                    autentikasi akun masing-masing.
                  </li>
                  <li>
                    Pengguna dilarang menggunakan identitas atau informasi akun
                    milik orang lain tanpa izin yang sah.
                  </li>
                  <li>
                    Pengguna wajib memberitahukan pengelola apabila mengetahui
                    adanya penggunaan akun tanpa izin.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  3. Pengiriman dan Penggunaan Informasi
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna bertanggung jawab atas informasi yang dikirimkan
                    melalui layanan CegahScam.
                  </li>
                  <li>
                    Pengguna dilarang mengirimkan informasi palsu, manipulatif,
                    mengandung ancaman, atau bertujuan merugikan pihak lain.
                  </li>
                  <li>
                    Pengguna tidak diperkenankan menyebarkan data pribadi milik
                    orang lain tanpa izin atau dasar hukum yang sah.
                  </li>
                  <li>
                    Pengguna wajib memastikan bahwa informasi yang disampaikan
                    tidak melanggar hak privasi maupun hak hukum pihak lain.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  4. Hak Pembatasan dan Penangguhan Layanan
                </h3>
                <p className="mb-2">
                  CegahScam berhak membatasi, menangguhkan, atau menghentikan
                  akses pengguna apabila ditemukan indikasi penyalahgunaan
                  layanan, termasuk:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Penggunaan layanan untuk melakukan penipuan atau tindakan
                    yang melanggar hukum.
                  </li>
                  <li>
                    Pengiriman informasi yang sengaja dibuat untuk menyesatkan
                    pengguna lain.
                  </li>
                  <li>
                    Pengumpulan, pengungkapan, atau penyebaran data pribadi
                    pihak lain secara tidak sah.
                  </li>
                  <li>
                    Percobaan mengakses, mengubah, atau mengganggu sistem dan
                    data tanpa kewenangan.
                  </li>
                </ul>
                <p className="mt-2">
                  Pembatasan dilakukan secara proporsional dengan
                  mempertimbangkan tingkat pelanggaran dan ketentuan hukum yang
                  berlaku. Pengguna tetap dapat mengajukan keberatan melalui
                  kontak resmi CegahScam.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  5. Hak dan Kewajiban Terkait Data
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna wajib memberikan informasi yang relevan dan akurat
                    sesuai kebutuhan layanan.
                  </li>
                  <li>
                    Pengguna berhak meminta akses, perbaikan, pembaruan,
                    penghapusan, dan pembatasan pemrosesan data pribadi sesuai
                    ketentuan yang berlaku.
                  </li>
                  <li>
                    Pengguna dapat menarik kembali persetujuan pemrosesan data
                    pribadi apabila persetujuan digunakan sebagai dasar
                    pemrosesannya.
                  </li>
                  <li>
                    Pengguna dilarang menggunakan hak akses untuk memperoleh,
                    mengubah, atau menyebarkan data milik pihak lain tanpa
                    kewenangan.
                  </li>
                </ul>
                <p className="mt-2">
                  Permintaan pengguna akan ditangani sesuai ketentuan
                  pelindungan data pribadi dan tidak menghilangkan kewajiban
                  pengelola untuk menyimpan data apabila diwajibkan oleh hukum.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  6. Tanggung Jawab dan Batasan Layanan
                </h3>
                <p>
                  Informasi dan hasil analisis yang disediakan CegahScam
                  merupakan sarana pendukung untuk meningkatkan kewaspadaan
                  terhadap potensi penipuan digital. Hasil analisis tidak
                  menjamin secara mutlak bahwa suatu nomor, tautan, atau
                  informasi tertentu aman maupun berbahaya. Pengguna tetap
                  bertanggung jawab melakukan pemeriksaan lebih lanjut sebelum
                  mengambil keputusan.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  7. Perubahan Ketentuan
                </h3>
                <p>
                  CegahScam dapat memperbarui syarat dan ketentuan apabila
                  terdapat perubahan layanan, kebijakan pengelolaan data, atau
                  ketentuan hukum. Perubahan akan diinformasikan melalui media
                  komunikasi yang tersedia.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  8. Kontak
                </h3>
                <p>
                  Pertanyaan, pengaduan, atau keberatan terkait ketentuan
                  layanan dapat disampaikan melalui kontak resmi CegahScam:
                </p>
                <p className="font-medium mt-2">
                  Email: [Email Resmi CegahScam]
                </p>
              </div>
            </section>
          )}

          {activeSection === "privacyPolicy" && (
            <section className="space-y-5 text-sm leading-relaxed text-[#3F4E5E]">
              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  1. Pendahuluan
                </h3>
                <p>
                  CegahScam menghargai privasi dan berkomitmen melindungi data
                  pribadi pengguna. Kebijakan ini menjelaskan bagaimana data
                  pribadi diperoleh, digunakan, disimpan, dibagikan, dan dihapus
                  selama pengguna menggunakan layanan CegahScam. Pengelolaan
                  data dilakukan secara transparan, terbatas, dan berdasarkan
                  dasar pemrosesan yang sah.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  2. Jenis Data yang Dikumpulkan
                </h3>

                <p className="font-medium mb-2">A. Data Identitas dan Akun</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Username atau nama pengguna.</li>
                  <li>Alamat email.</li>
                  <li>
                    Informasi autentikasi akun, seperti kata sandi yang disimpan
                    dalam bentuk hash.
                  </li>
                </ul>

                <p className="font-medium mt-3 mb-2">
                  B. Data yang Dikirimkan Pengguna
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nomor telepon atau tautan yang dilaporkan.</li>
                  <li>Isi laporan atau informasi terkait dugaan penipuan.</li>
                  <li>
                    Gambar atau dokumen yang dikirimkan apabila fitur tersebut
                    tersedia.
                  </li>
                </ul>

                <p className="font-medium mt-3 mb-2">
                  C. Data Teknis dan Aktivitas
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Alamat IP apabila dicatat oleh sistem.</li>
                  <li>Informasi perangkat dan browser.</li>
                  <li>
                    Waktu akses dan aktivitas yang berkaitan dengan keamanan
                    akun.
                  </li>
                  <li>Catatan teknis untuk pemeliharaan layanan.</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  3. Alur Pengelolaan Data Pribadi
                </h3>

                <p className="font-medium mb-2">
                  A. Pemerolehan dan Pengumpulan Data
                </p>
                <p>
                  Data diperoleh ketika pengguna melakukan pendaftaran,
                  memperbarui informasi akun, atau mengirimkan informasi melalui
                  layanan CegahScam. Data teknis tertentu juga dapat tercatat
                  ketika pengguna mengakses layanan.
                </p>

                <p className="font-medium mt-3 mb-2">
                  B. Pengolahan dan Penggunaan Data
                </p>
                <p className="mb-2">
                  Data yang diperoleh digunakan untuk tujuan berikut:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Membuat dan mengelola akun pengguna.</li>
                  <li>Melakukan autentikasi dan menjaga keamanan akun.</li>
                  <li>Memproses informasi yang dikirimkan pengguna.</li>
                  <li>
                    Mendukung analisis informasi terkait potensi penipuan.
                  </li>
                  <li>Menangani laporan, keluhan, dan permintaan pengguna.</li>
                  <li>Memelihara keamanan serta kualitas layanan.</li>
                </ul>

                <p className="font-medium mt-3 mb-2">C. Penyimpanan Data</p>
                <p>
                  Data disimpan melalui infrastruktur penyimpanan dan basis data
                  yang digunakan CegahScam. Akses terhadap data dibatasi
                  berdasarkan kebutuhan pengelolaan layanan. Informasi
                  autentikasi seperti kata sandi harus dilindungi menggunakan
                  mekanisme yang sesuai dan tidak disimpan sebagai teks biasa.
                </p>

                <p className="font-medium mt-3 mb-2">
                  D. Pengungkapan dan Pembagian Data
                </p>
                <p>
                  Data pribadi tidak diperjualbelikan kepada pihak lain. Data
                  dapat diproses atau dibagikan secara terbatas kepada penyedia
                  infrastruktur, hosting, basis data, atau layanan pendukung
                  yang diperlukan untuk menjalankan CegahScam. Pengungkapan juga
                  dapat dilakukan apabila diwajibkan oleh hukum atau diperlukan
                  untuk memenuhi permintaan resmi pihak berwenang sesuai
                  ketentuan yang berlaku.
                </p>

                <p className="font-medium mt-3 mb-2">
                  E. Retensi dan Penghapusan Data
                </p>
                <p>
                  Data disimpan selama masih diperlukan untuk memenuhi tujuan
                  pengumpulan, menjalankan layanan, menjaga keamanan, atau
                  memenuhi kewajiban hukum. Apabila tujuan pemrosesan telah
                  berakhir atau terdapat permintaan penghapusan yang dapat
                  dipenuhi, data akan dihapus atau dimusnahkan sesuai prosedur
                  dan ketentuan yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  4. Dasar Pemrosesan Data
                </h3>
                <p className="mb-2">
                  Pemrosesan data pribadi dilakukan berdasarkan dasar hukum yang
                  sesuai dengan tujuan masing-masing, antara lain:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Persetujuan pengguna untuk pemrosesan yang memerlukan
                    persetujuan.
                  </li>
                  <li>
                    Pemenuhan perjanjian atau penyediaan layanan yang diminta
                    pengguna.
                  </li>
                  <li>Pemenuhan kewajiban hukum.</li>
                  <li>
                    Kepentingan sah pengelola dengan tetap memperhatikan hak dan
                    kepentingan pengguna.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  5. Hak Pengguna atas Data Pribadi
                </h3>
                <p className="mb-2">
                  Pengguna memiliki hak atas data pribadi sesuai ketentuan
                  pelindungan data yang berlaku, termasuk:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Memperoleh informasi mengenai identitas pengelola dan tujuan
                    pemrosesan data.
                  </li>
                  <li>
                    Melengkapi, memperbarui, dan memperbaiki data yang tidak
                    akurat.
                  </li>
                  <li>Memperoleh akses dan salinan data pribadi.</li>
                  <li>
                    Mengakhiri pemrosesan, meminta penghapusan, atau pemusnahan
                    data sesuai ketentuan hukum.
                  </li>
                  <li>
                    Menarik kembali persetujuan pemrosesan data yang sebelumnya
                    diberikan.
                  </li>
                  <li>
                    Mengajukan keberatan terhadap keputusan yang hanya
                    didasarkan pada pemrosesan otomatis sesuai ketentuan.
                  </li>
                  <li>
                    Meminta penundaan atau pembatasan pemrosesan data secara
                    proporsional.
                  </li>
                  <li>
                    Mengajukan gugatan dan memperoleh ganti rugi apabila terjadi
                    pelanggaran sesuai ketentuan hukum.
                  </li>
                </ul>
                <p className="mt-2">
                  Permintaan terkait hak tersebut dapat disampaikan melalui
                  kontak resmi CegahScam. Pengelola akan melakukan verifikasi
                  identitas dan menindaklanjuti permintaan sesuai ketentuan yang
                  berlaku.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  6. Perlindungan dan Keamanan Data
                </h3>
                <p>
                  CegahScam berupaya melindungi data pribadi dari akses,
                  penggunaan, perubahan, pengungkapan, maupun penghapusan yang
                  tidak sah. Langkah perlindungan dapat mencakup pembatasan hak
                  akses, pengamanan autentikasi, pengelolaan kredensial, serta
                  pemantauan aktivitas yang berkaitan dengan keamanan sistem.
                </p>
                <p className="mt-2">
                  Apabila terjadi kegagalan pelindungan data pribadi, pengelola
                  akan melakukan penanganan dan pemberitahuan sesuai ketentuan
                  hukum yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  7. Perubahan Kebijakan Privasi
                </h3>
                <p>
                  CegahScam dapat memperbarui kebijakan privasi apabila terdapat
                  perubahan tujuan, jenis data, cara pemrosesan, layanan, atau
                  ketentuan hukum. Perubahan yang berdampak pada pengguna akan
                  diinformasikan melalui media komunikasi yang tersedia.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-[#446685]">
                  8. Kontak dan Permintaan Privasi
                </h3>
                <p>
                  Untuk mengajukan pertanyaan, permintaan akses, perbaikan,
                  pembatasan pemrosesan, penarikan persetujuan, maupun
                  penghapusan data, pengguna dapat menghubungi:
                </p>
                <p className="font-medium mt-2">
                  Email: cegahScam@mail.com (dummy)
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="space-y-3.5 border-t border-[#B9C8DA]/50 px-6 py-5">
          {!(hasReadTerms && hasReadPrivacy) && (
            <p className="text-center text-xs text-[#3F4E5E]">
              Silakan baca kedua dokumen hingga bagian akhir
            </p>
          )}

          <label className="flex items-start gap-3 text-sm text-[#3F4E5E]">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={!hasReadTerms}
              className="mt-1 accent-[#47a8e4] disabled:opacity-40"
            />

            <span>
              Saya telah membaca dan menyetujui
              <strong> Syarat dan Ketentuan Layanan CegahScam.</strong>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-[#3F4E5E]">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
              disabled={!hasReadPrivacy}
              className="mt-1 accent-[#47a8e4] disabled:opacity-40"
            />

            <span>
              Saya telah membaca dan memahami
              <strong> Kebijakan Privasi CegahScam.</strong>
            </span>
          </label>

          <button
            type="button"
            onClick={onContinue}
            disabled={!agreeTerms || !agreePrivacy}
            className="w-full rounded-2xl bg-[#47a8e4] py-3 font-semibold text-white shadow-lg transition duration-200 hover:enabled:-translate-y-0.5 hover:enabled:bg-[#85B6FF] disabled:cursor-not-allowed disabled:bg-[#B9C8DA] disabled:shadow-none"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
