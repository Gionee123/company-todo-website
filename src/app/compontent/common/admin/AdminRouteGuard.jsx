import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminRouteGuard({ children }) {
  const router = useRouter();
  useEffect(() => {
    const adminData = Cookies.get("admin");
    console.log("AdminRouteGuard - adminData:", adminData);

    if (!adminData) {
      console.log(
        "AdminRouteGuard - No admin data found, redirecting to login"
      );
      router.replace("/admin-panel/login");
      return;
    }

    try {
      const admin = JSON.parse(adminData);
      console.log("AdminRouteGuard - Parsed admin:", admin);

      if (!admin || !admin.role || admin.role !== "admin") {
        console.log(
          "AdminRouteGuard - Invalid admin role, redirecting to login"
        );
        router.replace("/admin-panel/login");
      } else {
        console.log("AdminRouteGuard - Admin authenticated successfully");
      }
    } catch (error) {
      console.log("AdminRouteGuard - Error parsing admin data:", error);
      router.replace("/admin-panel/login");
    }
  }, [router]);
  return <>{children}</>;
}
