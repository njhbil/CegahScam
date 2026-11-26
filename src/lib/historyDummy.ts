// Data contoh untuk melihat tampilan halaman Riwayat saat terisi.
// Hanya dipakai untuk akun demo; ganti dengan data dari API saat endpoint riwayat sudah ada.

export const DEMO_USERNAME = "admin@123";

export type RiskCategory = "Tidak Ada Indikasi" | "Rendah" | "Sedang" | "Tinggi" | "Sangat Tinggi";

export type EmergencyHistoryItem = {
  id: string;
  date: string;
  kind: "data" | "financial";
  caseLabel: string;
  input: string;
  chronology: string;
  state: unknown;
};

export type AnalysisHistoryItem = {
  id: string;
  date: string;
  typeLabel: string;
  input: string;
  riskCategory: RiskCategory;
  riskScore: number;
  route: string;
  state: unknown;
};

export const dummyEmergencyHistory: EmergencyHistoryItem[] = [
  {
    id: "em-2",
    date: "2026-11-20",
    kind: "financial",
    caseLabel: "Kerugian finansial",
    input: "Transfer Rp1.250.000 ke rekening BRI",
    chronology:
      "Korban membeli ponsel lewat Instagram, mentransfer uang, lalu akun penjual tidak bisa dihubungi.",
    state: {
      result: {
        ai_kronologi:
          "Pada 18 November 2026, korban menemukan akun Instagram yang menjual ponsel bekas dengan harga di bawah pasaran. Setelah bernegosiasi lewat pesan langsung, korban mentransfer Rp1.250.000 ke rekening BRI atas nama penjual. Setelah transfer, akun penjual memblokir korban dan barang tidak pernah dikirim.",
        langkah_penanganan: [
          { title: "Hubungi bank segera", description: "Minta pemblokiran rekening tujuan melalui call center bank pengirim dan bank penerima." },
          { title: "Simpan bukti", description: "Simpan bukti transfer, tangkapan layar percakapan, dan tautan akun penjual." },
          { title: "Laporkan ke patrolisiber.id", description: "Buat laporan resmi agar rekening pelaku dapat ditindaklanjuti." },
        ],
        official_contact: { name: "BRI", phone: "14017" },
      },
      form: {
        tanggalKejadian: "2026-11-18",
        kanalMedia: "instagram",
        jenisBank: "bri",
        tujuanTransaksi: ["link"],
        namaInstitusi: "BRI",
        nomorRekening: "[nomor rekening]",
        namaPemilikRekening: "[nama pemilik rekening]",
        nominalKerugian: "1250000",
      },
    },
  },
  {
    id: "em-1",
    date: "2026-11-12",
    kind: "data",
    caseLabel: "Kebocoran data",
    input: "Kode OTP diminta lewat WhatsApp",
    chronology:
      "Pelaku mengaku petugas bank dan meminta kode OTP, akun email korban kemudian tidak bisa diakses.",
    state: {
      result: {
        ai_kronologi:
          "Pada 11 November 2026, korban menerima pesan WhatsApp dari nomor yang mengaku sebagai petugas bank. Pelaku mengirim tautan verifikasi dan meminta kode OTP. Setelah korban memberikan kode, akun email korban tidak bisa diakses lagi.",
        langkah_penanganan: [
          { title: "Pulihkan akun email", description: "Gunakan fitur pemulihan akun dan ganti kata sandi dari perangkat yang aman." },
          { title: "Aktifkan verifikasi dua langkah", description: "Pakai aplikasi autentikator, bukan SMS, untuk akun penting." },
          { title: "Kabari kontak terdekat", description: "Beri tahu teman dan keluarga agar tidak menanggapi pesan atas namamu." },
        ],
      },
      form: {
        tanggalKejadian: "2026-11-11",
        kanalMedia: "whatsapp",
        jenisData: ["email", "data-pribadi"],
        tindakanPelaku: ["link", "otp", "menyamar"],
        statusAkses: "tidakBisaAkses",
      },
    },
  },
];

export const dummyAnalysisHistory: AnalysisHistoryItem[] = [
  {
    id: "an-3",
    date: "2026-11-24",
    typeLabel: "Pesan chat",
    input: "Selamat! Anda memenangkan undian Rp50.000.000. Klik tautan berikut untuk klaim hadiah…",
    riskCategory: "Sangat Tinggi",
    riskScore: 92,
    route: "/analysis/resultchat",
    state: {
      subject: "Selamat! Anda memenangkan undian Rp50.000.000. Klik tautan berikut untuk klaim hadiah dan kirim kode OTP yang masuk.",
      result: {
        risk_score: 92,
        risk_category: "Sangat Tinggi",
        scam_type: "Penipuan undian berhadiah",
        reasons: [
          "Pesan menjanjikan hadiah besar tanpa pernah mengikuti undian.",
          "Ada tautan tidak resmi dan permintaan kode OTP.",
        ],
        recommendations: [
          "Jangan klik tautan dan jangan bagikan kode OTP.",
          "Blokir dan laporkan nomor pengirim.",
        ],
      },
    },
  },
  {
    id: "an-2",
    date: "2026-11-21",
    typeLabel: "Nomor telepon",
    input: "0812-xxxx-xxxx",
    riskCategory: "Sedang",
    riskScore: 58,
    route: "/analysis/resultphone",
    state: {
      subject: "0812-xxxx-xxxx",
      result: {
        risk_score: 58,
        risk_category: "Sedang",
        scam_type: "Mengaku kurir paket",
        reasons: [
          "Nomor pernah dilaporkan mengirim file APK berkedok resi paket.",
          "Nomor bukan kontak resmi jasa pengiriman.",
        ],
        recommendations: ["Cek resi langsung di situs resmi kurir.", "Jangan pasang file APK dari chat."],
      },
    },
  },
  {
    id: "an-1",
    date: "2026-11-15",
    typeLabel: "Tangkapan layar",
    input: "Tangkapan layar dari WhatsApp",
    riskCategory: "Rendah",
    riskScore: 18,
    route: "/analysis/resultscreenshot",
    state: {
      subject: "WhatsApp",
      result: {
        risk_score: 18,
        risk_category: "Rendah",
        scam_type: null,
        reasons: ["Tidak ada permintaan data pribadi, tautan, atau transfer uang."],
        recommendations: ["Tetap waspada bila pengirim mulai meminta data atau uang."],
      },
    },
  },
];
