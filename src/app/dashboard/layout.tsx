import LayoutWrapper from "@/components/dashboard/layoutWrapper";
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
      <LayoutWrapper>
        <Header />
        {children}
      </LayoutWrapper>
    </div>
  );
};

export default DashboardLayout;
