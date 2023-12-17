import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = (props: Props) => {
  const { children } = props;

  return (
    <div>
      <Sidebar />
      <div className="ml-64 mt-14 h-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
