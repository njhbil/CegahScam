// Sumber tunggal isi Syarat & Ketentuan dan Kebijakan Privasi.
// Dipakai oleh halaman /syarat-ketentuan, /kebijakan-privasi, dan modal persetujuan saat daftar.
// Tanda [ ... ] adalah hal yang masih perlu diputuskan atau dikonfirmasi tim sebelum rilis.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const LEGAL_UPDATED = "25 November 2026";
export const LEGAL_STATUS = "Draf, belum final";
export const LEGAL_CONTACT = "[Email resmi CegahScam]";

export const termsSections: LegalSection[] = [
  {
    id: "ketentuan-umum",
    title: "Soal CegahScam",
    blocks: [
      {
        type: "p",
        text: "CegahScam membantu kamu mengenali, memahami, dan menangani penipuan digital. Dengan membuat akun dan memakai layanan ini, kamu setuju dengan aturan di halaman ini.",
      },
      {
        type: "p",
        text: "Satu hal penting: hasil analisis kami adalah alat bantu supaya kamu lebih waspada. Hasilnya bukan putusan hukum, dan bukan jaminan pasti bahwa suatu nomor, tautan, atau pesan itu aman atau berbahaya.",
      },
    ],
  },
  {
    id: "akun",
    title: "Akun kamu",
    blocks: [
      {
        type: "ul",
        items: [
          "Isi data pendaftaran dengan benar.",
          "Jaga kata sandimu. Apa pun yang terjadi lewat akunmu jadi tanggung jawabmu.",
          "Jangan pakai akun atau identitas orang lain tanpa izin.",
          "Kalau akunmu dipakai orang lain tanpa izin, kabari kami secepatnya.",
        ],
      },
    ],
  },
  {
    id: "paket",
    title: "Paket dan batas pemakaian",
    blocks: [
      {
        type: "ul",
        items: [
          "Paket Gratis: 3 laporan.",
          "Paket Pro segera hadir dengan batas yang lebih longgar. Harga dan rinciannya kami umumkan sebelum paketnya tersedia.",
          "Gambar yang kamu unggah dibatasi ukurannya, saat ini maksimal 15 MB per berkas, supaya layanan tetap lancar. Batas ini bisa berbeda di tiap paket.",
        ],
      },
    ],
  },
  {
    id: "informasi-dikirim",
    title: "Apa yang kamu kirim ke kami",
    blocks: [
      {
        type: "p",
        text: "Kamu bertanggung jawab atas isi yang kamu kirim. Tolong:",
      },
      {
        type: "ul",
        items: [
          "jangan kirim informasi palsu atau yang sengaja dibuat untuk menyesatkan atau merugikan orang lain;",
          "jangan kirim ancaman;",
          "jangan sebarkan data pribadi orang lain tanpa izin;",
          "pastikan yang kamu kirim tidak melanggar privasi atau hak orang lain.",
        ],
      },
    ],
  },
  {
    id: "pembatasan-layanan",
    title: "Kapan akunmu bisa dibatasi",
    blocks: [
      {
        type: "p",
        text: "Kami bisa membatasi atau menutup akses akunmu kalau ada tanda penyalahgunaan, misalnya:",
      },
      {
        type: "ul",
        items: [
          "layanan dipakai untuk menipu atau melanggar hukum;",
          "mengirim informasi yang sengaja dibuat untuk menyesatkan orang lain;",
          "mengumpulkan atau menyebarkan data pribadi orang lain secara tidak sah;",
          "mencoba menembus, mengubah, atau mengganggu sistem dan data tanpa izin.",
        ],
      },
      {
        type: "p",
        text: "Kami menyesuaikan tindakan dengan tingkat pelanggarannya. Kalau kamu merasa keliru dibatasi, hubungi kami lewat kontak di bawah.",
      },
    ],
  },
  {
    id: "data-dan-hakmu",
    title: "Datamu dan hakmu",
    blocks: [
      {
        type: "p",
        text: "Cara kami mengumpulkan, memakai, menyimpan, dan menghapus datamu kami jelaskan lengkap di Kebijakan Privasi. Singkatnya, kamu berhak:",
      },
      {
        type: "ul",
        items: [
          "melihat, memperbaiki, dan memperbarui datamu;",
          "meminta datamu dihapus;",
          "meminta pemrosesan datamu dibatasi;",
          "mencabut persetujuan yang pernah kamu berikan.",
        ],
      },
      {
        type: "p",
        text: "Kami akan menanggapi permintaanmu sesuai aturan perlindungan data pribadi. Untuk data tertentu, kami tetap bisa menyimpannya kalau hukum mewajibkan.",
      },
    ],
  },
  {
    id: "batasan-tanggung-jawab",
    title: "Yang perlu kamu tahu soal tanggung jawab",
    blocks: [
      {
        type: "p",
        text: "Sebelum mengambil keputusan, misalnya transfer uang atau membagikan data, tetap periksa lagi dengan teliti. CegahScam tidak melaporkan kasusmu ke instansi mana pun secara otomatis. Kamu sendiri yang memutuskan dan mengirim laporannya ke pihak berwenang.",
      },
    ],
  },
  {
    id: "perubahan-ketentuan",
    title: "Kalau aturan ini berubah",
    blocks: [
      {
        type: "p",
        text: "Aturan ini bisa kami perbarui kalau layanan, cara kami mengelola data, atau aturan hukum berubah. Kalau perubahannya berdampak ke kamu, kami kabari lewat kanal yang tersedia.",
      },
    ],
  },
  {
    id: "kontak-ketentuan",
    title: "Hubungi kami",
    blocks: [
      {
        type: "p",
        text: `Ada pertanyaan, keluhan, atau keberatan soal aturan ini? Kirim ke ${LEGAL_CONTACT}.`,
      },
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    id: "pendahuluan",
    title: "Sebelum mulai",
    blocks: [
      {
        type: "p",
        text: "Kami menjaga privasimu. Di sini kami jelaskan terbuka: data apa yang kami ambil, untuk apa, ke mana saja data itu mengalir, berapa lama disimpan, dan bagaimana kamu bisa mengendalikannya.",
      },
    ],
  },
  {
    id: "data-yang-dikumpulkan",
    title: "Data apa yang kami ambil",
    blocks: [
      { type: "h", text: "Data akun" },
      {
        type: "ul",
        items: [
          "Username atau email.",
          "Kata sandi. Kami simpan dalam bentuk hash, jadi bukan teks yang bisa dibaca.",
          "Data diri yang kamu isi sendiri di profil, seperti nama, pekerjaan, dan alamat. Ini opsional.",
        ],
      },
      { type: "h", text: "Yang kamu kirim" },
      {
        type: "ul",
        items: [
          "Nomor telepon, tautan, atau isi pesan yang kamu periksa.",
          "Tangkapan layar atau bukti lain yang kamu unggah. Berkas ini hanya diproses sesaat dan tidak pernah kami simpan.",
          "Isian laporan darurat dan kronologi kejadian.",
        ],
      },
      { type: "h", text: "Data teknis" },
      {
        type: "ul",
        items: [
          "Alamat IP, jenis perangkat dan browser, serta waktu akses, kalau dicatat sistem.",
          "Catatan teknis untuk menjaga keamanan akun dan merawat layanan.",
        ],
      },
    ],
  },
  {
    id: "tujuan-penggunaan",
    title: "Untuk apa data itu dipakai",
    blocks: [
      {
        type: "ul",
        items: [
          "Membuat dan mengelola akunmu, serta menjaganya tetap aman.",
          "Memproses yang kamu kirim, supaya bisa dianalisis dan disusun jadi laporan.",
          "Menyimpan riwayat analisis dan laporanmu, supaya kamu bisa melihat lagi apa saja yang pernah kamu periksa.",
          "Membantu mengenali pola penipuan yang berulang, sehingga ikut membantu penanganan kasus lain. [Dikonfirmasi tim: bentuk datanya, misalnya dianonimkan atau digabung.]",
          "Menjawab pertanyaan dan keluhan, serta menjaga kualitas layanan.",
        ],
      },
      {
        type: "p",
        text: "Data pribadimu tidak kami jual.",
      },
    ],
  },
  {
    id: "alur-data",
    title: "Perjalanan datamu",
    blocks: [
      {
        type: "ul",
        items: [
          "Masuk: saat kamu mendaftar, mengubah profil, atau mengirim sesuatu lewat layanan.",
          "Diolah: yang kamu kirim dianalisis untuk menghasilkan skor risiko dan langkah penanganan. Sebagian pengolahan memakai layanan pihak ketiga, seperti penyedia AI dan layanan pengecekan nomor.",
          "Disimpan: data akun serta riwayat hasil analisis dan laporan disimpan di basis data CegahScam, dengan akses yang dibatasi. Gambar dan file bukti tidak ikut disimpan.",
          "Dibagikan: hanya seperlunya ke penyedia infrastruktur dan layanan pendukung, atau kalau hukum mewajibkan.",
          "Dihapus: mengikuti aturan lama penyimpanan di bagian berikutnya.",
        ],
      },
    ],
  },
  {
    id: "retensi-data",
    title: "Berapa lama data disimpan",
    blocks: [
      {
        type: "ul",
        items: [
          "Data akun: selama akunmu aktif.",
          "Riwayat analisis dan laporan: selama akunmu aktif, atau sampai kamu minta dihapus.",
          "Gambar dan file bukti yang kamu unggah: tidak disimpan. Berkas hanya ada di memori selama analisis berjalan, lalu langsung dibuang.",
          "Hasil cek nomor telepon: disimpan sementara di memori server paling lama 24 jam, supaya pengecekan ulang nomor yang sama lebih cepat. Setelah itu terhapus otomatis.",
          "Draf isian formulir: tersimpan di perangkatmu saja, tidak di server, dan dihapus setelah laporan dikirim.",
          "Setelah akun dihapus: datamu kami hapus dalam [jumlah hari ditentukan tim], kecuali data yang wajib kami simpan menurut hukum.",
        ],
      },
      { type: "h", text: "Zero data retention" },
      {
        type: "p",
        text: "Gambar dan file bukti yang kamu kirim tidak pernah ditulis ke basis data atau penyimpanan berkas kami. Berkas diproses di memori, dianalisis, lalu langsung dibuang begitu hasilnya keluar.",
      },
      {
        type: "p",
        text: "Prinsip yang sama berlaku untuk penyedia AI yang kami pakai: isi yang dikirim untuk dianalisis tidak disimpan oleh penyedia setelah hasilnya dikembalikan. [Dikonfirmasi tim sesuai kontrak dan pengaturan penyedia yang dipakai.]",
      },
    ],
  },
  {
    id: "dasar-pemrosesan",
    title: "Kenapa kami boleh memproses datamu",
    blocks: [
      {
        type: "ul",
        items: [
          "Karena kamu setuju, untuk hal-hal yang memang butuh persetujuanmu.",
          "Karena itu bagian dari layanan yang kamu minta.",
          "Karena hukum mewajibkan.",
          "Karena ada kepentingan sah kami, dengan tetap menjaga hak dan kepentinganmu.",
        ],
      },
    ],
  },
  {
    id: "hak-pengguna",
    title: "Hakmu atas data pribadi",
    blocks: [
      {
        type: "ul",
        items: [
          "Tahu siapa yang mengelola datamu dan untuk apa.",
          "Melengkapi, memperbarui, dan memperbaiki datamu.",
          "Mendapat akses dan salinan datamu.",
          "Meminta pemrosesan dihentikan, atau datamu dihapus.",
          "Meminta pemrosesan datamu dibatasi.",
          "Mencabut persetujuan yang pernah kamu berikan.",
          "Keberatan atas keputusan yang hanya dibuat oleh pemrosesan otomatis.",
          "Menggugat dan menuntut ganti rugi kalau terjadi pelanggaran.",
        ],
      },
      {
        type: "p",
        text: `Mau pakai salah satu hak itu? Kirim permintaanmu ke ${LEGAL_CONTACT}. Kami akan memastikan dulu bahwa itu benar kamu, lalu menindaklanjutinya sesuai aturan yang berlaku.`,
      },
    ],
  },
  {
    id: "keamanan",
    title: "Cara kami menjaga datamu",
    blocks: [
      {
        type: "p",
        text: "Kami berusaha melindungi datamu dari akses, perubahan, pembocoran, atau penghapusan yang tidak sah. Caranya antara lain membatasi siapa yang boleh mengakses, mengamankan proses masuk, mengelola kredensial dengan hati-hati, dan memantau aktivitas yang berkaitan dengan keamanan. Kalau suatu saat datamu bocor, kami akan menanganinya dan memberi tahu kamu sesuai aturan hukum.",
      },
    ],
  },
  {
    id: "perubahan-kebijakan",
    title: "Kalau kebijakan ini berubah",
    blocks: [
      {
        type: "p",
        text: "Kebijakan ini bisa kami perbarui kalau tujuan, jenis data, cara pengolahan, layanan, atau aturan hukum berubah. Kalau perubahannya berdampak ke kamu, kami kabari lewat kanal yang tersedia.",
      },
    ],
  },
  {
    id: "kontak-privasi",
    title: "Hubungi kami",
    blocks: [
      {
        type: "p",
        text: `Pertanyaan, permintaan akses, perbaikan, pembatasan, pencabutan persetujuan, atau penghapusan data? Kirim ke ${LEGAL_CONTACT}.`,
      },
    ],
  },
];
