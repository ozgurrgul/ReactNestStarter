import { PageHeader, Button, Popconfirm, Spin } from "antd";
import { useDispatch } from "react-redux";
import { useMe } from "../../hooks/useMe";
import { logout } from "../../slices/authSlice";

export const Header = () => {
  const { me, isLoading } = useMe();
  const dispatch = useDispatch();
  const onConfirmLogout = () => {
    dispatch(logout());
  };

  return (
    <PageHeader
      ghost={false}
      // onBack={() => window.history.back()}
      title="Dashboard"
      subTitle=""
      extra={[
        <Popconfirm key="1" title="Are you sure?" onConfirm={onConfirmLogout}>
          <Button>Logout {isLoading ? <Spin /> : me?.email}</Button>
        </Popconfirm>,
      ]}
    ></PageHeader>
  );
};
