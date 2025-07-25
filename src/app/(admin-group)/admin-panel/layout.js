"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/compontent/common/admin/Header";
import Footer from "@/app/compontent/common/admin/Footer";
import Sidebar from '@/app/compontent/common/admin/Sidebar';
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin-panel/login";

  return (
    <Provider store={store}>
      {!isLoginPage && <Sidebar />}
      <div style={{ marginLeft: isLoginPage ? 0 : 224 }}>
        {!isLoginPage && <Header />}
        {children}
        {!isLoginPage && <Footer />}
      </div>
    </Provider>
  );
}
