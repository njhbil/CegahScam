import Swal from "sweetalert2";
import robot from "../assets/Robots/robot-gembok.webp";

export const showLoginAlert = async (): Promise<boolean> => {
  const result = await Swal.fire({
    html: `
      <div class="cs-login-art" aria-hidden="true">
        <img src="${robot}" alt="" draggable="false" />
      </div>
      <h2 id="cs-login-title" class="cs-login-title">Masuk dulu, yuk</h2>
      <p class="cs-login-text">
        Analisis dan laporan darurat khusus untuk pengguna yang sudah masuk.
        Semua hasilnya otomatis tersimpan di Riwayat akunmu.
      </p>
    `,
    footer: `<span>Belum punya akun? <a href="/register">Daftar gratis</a></span>`,
    showCancelButton: true,
    confirmButtonText: "Masuk sekarang",
    cancelButtonText: "Nanti saja",
    reverseButtons: true,
    buttonsStyling: false,
    showCloseButton: true,
    closeButtonAriaLabel: "Tutup",
    customClass: {
      popup: "cs-swal cs-login",
      htmlContainer: "cs-login-body",
      actions: "cs-swal-actions",
      confirmButton: "cs-swal-confirm",
      cancelButton: "cs-swal-cancel",
      footer: "cs-login-footer",
      closeButton: "cs-login-close",
    },
    didOpen: (popup) => popup.setAttribute("aria-labelledby", "cs-login-title"),
  });

  return result.isConfirmed;
};
