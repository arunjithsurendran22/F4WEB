import toast from "react-hot-toast";

export const showLoginToast = (
  loggedIn: boolean,
  duration: number = 3000
): boolean => {
  if (!loggedIn) {
    toast.error("Please log in", {
      duration,
      icon: "🔒",
    });
    return true;
  }
  return false;
};
