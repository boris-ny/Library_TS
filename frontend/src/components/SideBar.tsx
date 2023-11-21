import React from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  BookFilled,
} from "@ant-design/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  

  return (
    <Layout>
      <Sider>
        <div className="" />
        <Menu
          theme="dark"
          mode="vertical"
          //   defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to={"/"}>Home</Link>,
            },
            {
              key: "2",
              icon: <BookOutlined />,
              label: <Link to={"/books"}> All Books</Link>,
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: <Link to={"/authors"}>All Authors</Link>,
            },
            {
              key: "4",
              icon: <BookFilled />,
              label: "BookInstances",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};

export default SideBar;
