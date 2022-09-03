import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { EmailVerifyInformation } from "../features/email-verification/EmailVerifyInformation";

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
