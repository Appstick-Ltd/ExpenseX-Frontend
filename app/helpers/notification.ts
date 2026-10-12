import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

/**
 * Show a SweetAlert2 modal for successful operations.
 */
export const showSuccessAlert = (message: string, title: string = 'Success!') => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#6D3DF5',
    background: '#FFFFFF',
    color: '#0F172A',
    buttonsStyling: true,
    customClass: {
      popup: 'mc-swal2-popup',
      confirmButton: 'mc-swal2-confirm-btn',
    },
  });
};

/**
 * Show a SweetAlert2 modal for error messages (displayed right in front).
 */
export const showErrorAlert = (message: string, title: string = 'Error') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message || 'An unexpected error occurred.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#EF4444',
    background: '#FFFFFF',
    color: '#0F172A',
    buttonsStyling: true,
    customClass: {
      popup: 'mc-swal2-popup',
      confirmButton: 'mc-swal2-confirm-btn',
    },
  });
};

/**
 * Show a toast notification for error messages.
 */
export const showErrorToast = (message: string) => {
  return toast.error(message || 'An unexpected error occurred.', {
    duration: 4000,
  });
};

/**
 * Show a SweetAlert2 confirmation dialog (e.g. before deleting).
 */
export const showConfirmDialog = async (options: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
}) => {
  const result = await Swal.fire({
    title: options.title || 'Are you sure?',
    text: options.text || 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: options.confirmButtonColor || '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: options.confirmButtonText || 'Yes, proceed',
    cancelButtonText: options.cancelButtonText || 'Cancel',
    reverseButtons: true,
  });
  return result.isConfirmed;
};

export { Swal, toast };
