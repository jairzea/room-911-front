import Swal from "sweetalert2";

const Toast = Swal.mixin({
  position: "top",
  iconColor: "#eee",
  toast: true,
  target: ".toast-container",
  customClass: {
    icon: "sweet-alert-toast-icon",
    closeButton: "sweet-alert-toast-closebutton",
  },
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3 * 1000,
});

const toastAlertCustomClass = {
  icon: "sweet-alert-toast-icon",
  closeButton: "sweet-alert-toast-closebutton",
};

export const toastSuccessAlert = (text) =>
  Toast.fire({
    text,
    icon: "success",
    customClass: {
      container: "sweet-alert-toast sweet-alert-toast--success",
      ...toastAlertCustomClass,
    },
  });

export const toastErrorAlert = (text) =>
  Toast.fire({
    text,
    icon: "error",
    customClass: {
      container: "sweet-alert-toast sweet-alert-toast--error",
      ...toastAlertCustomClass,
    },
  });

export const toastWarningAlert = (text) =>
  Toast.fire({
    text: text || "Ocurrio un error al procesar la solicitud",
    icon: "warning",
    customClass: {
      container: "sweet-alert-toast ",
      ...toastAlertCustomClass,
    },
  });
