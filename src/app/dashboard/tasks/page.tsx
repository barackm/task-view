import React from "react";
import { Tabs as TabsWrapper } from "@/components/ui/tabs";
import Tabs from "@/components/tabs";

const Tasks = () => {
  return (
    <TabsWrapper defaultValue="account" className="w-full">
      <Tabs />
    </TabsWrapper>
  );
};

export default Tasks;
