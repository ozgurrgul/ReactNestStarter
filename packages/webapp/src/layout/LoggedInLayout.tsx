import { Spin } from "antd";
import React from "react";
import { Header } from "../components/shared/Header";
import { useMe } from "../hooks/useMe";

type Props = {
  children?: React.ReactNode;
};

export const LoggedInLayout: React.FC<Props> = ({ children }) => {
  const { isLoading } = useMe();
  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
