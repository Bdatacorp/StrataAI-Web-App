import AdminHeader from "@/components/general/adminHeader/adminHeader";
import Header from "@/components/general/header/header";
import Navbar from "@/components/general/navbar/desktop/desktopNavbar";
import AdminSidebar from "@/components/general/adminSideBar/Sidebar";
import { ToastContainer } from "react-toastify";

const ModuleLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <AdminHeader />
        <div className="flex">
          {/* SIDE BAR */}
          <AdminSidebar />

          <div className="grow overflow-x-hidden px-4 lg:pl-6 lg:pr-2 pt-7 overflow-y-scroll h-[calc(100svh-80px)] ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleLayout;
