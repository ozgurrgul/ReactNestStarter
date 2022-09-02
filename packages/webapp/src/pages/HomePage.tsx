import { Alert, Button, Result, Space } from "antd";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { useResendVerificationMutation } from "../services/api";

const EmailVerifyInformation = () => {
  const { me } = useMe();
  const [resend, { isLoading, isSuccess }] = useResendVerificationMutation();
  if (me?.emailVerified) {
    return null;
  }
  return (
    <Alert
      type="warning"
      message={
        <Space direction="vertical">
          <div>
            Your email is not verified yet. Please check your inbox to verify
            your email
          </div>
          <Button
            type="dashed"
            loading={isLoading}
            disabled={isLoading || isSuccess}
            onClick={() => resend(null)}
          >
            {isSuccess ? "Sent" : "Resend verification"}
          </Button>
        </Space>
      }
      closable
    />
  );
};

export const HomePage = () => (
  <div style={{ padding: 16 }}>
    <EmailVerifyInformation />
    <Result
      status="info"
      title="Hello World"
      subTitle="Welcome"
      extra={
        <Link to="/test">
          <Button type="primary">Go to /test page</Button>
        </Link>
      }
    />
  </div>
);
