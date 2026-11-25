import Swal from "sweetalert2";
import robot from "../assets/Home/heroicon.webp";

export const showLoginAlert = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Masuk dulu untuk lanjut",
    text: "Fitur ini khusus pengguna yang sudah masuk, supaya riwayat laporan dan analisismu tersimpan rapi.",
    imageUrl: robot,
    imageWidth: 96,
    imageAlt: "",
    showCancelButton: true,
    confirmButtonText: "Masuk",
    cancelButtonText: "Nanti saja",
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      popup: "cs-swal",
      title: "cs-swal-title",
      htmlContainer: "cs-swal-text",
      actions: "cs-swal-actions",
      confirmButton: "cs-swal-confirm",
      cancelButton: "cs-swal-cancel",
    },
  });

  return result.isConfirmed;
};
