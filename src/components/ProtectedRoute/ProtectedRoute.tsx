"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import { showLoginToast } from "@/utils/toastUtils";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null); 

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus); 

    if (!authStatus) {
      showLoginToast(false);
      router.push("/");
    }
  }, [router]);

  if (isAuth === null) return null;
  return <>{isAuth ? children : null}</>;
};

export default ProtectedRoute;
