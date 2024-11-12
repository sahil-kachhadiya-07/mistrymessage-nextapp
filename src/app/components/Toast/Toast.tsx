import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    type:string
    message:string
}

const Toast:React.FC<ToastProps> = ({ type, message }) => {
  // Toast types can be: "success", "error", "info", "warn"
  const toastType = {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
  };

  const showToast = () => {
    switch (type) {
      case toastType.success:
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-green-500 text-white font-bold rounded-lg shadow-md p-3", // Tailwind classes for success
        });
        break;
      case toastType.error:
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-red-500 text-white font-bold rounded-lg shadow-md p-3", // Tailwind classes for error
        });
        break;
      case toastType.info:
        toast.info(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-blue-500 text-white font-bold rounded-lg shadow-md p-3", // Tailwind classes for info
        });
        break;
      case toastType.warn:
        toast.warn(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-yellow-500 text-white font-bold rounded-lg shadow-md p-3", // Tailwind classes for warning
        });
        break;
      default:
        toast(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-gray-500 text-white font-bold rounded-lg shadow-md p-3", // Default styling
        });
    }
  };

  return (
    <button
      onClick={showToast}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
    >
      Show {type} Toast
    </button>
  );
};

export default Toast;
