import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const TestPage = () => (
  <Result
    status="warning"
    title="Test"
    subTitle="Another test page"
    extra={
      <Link to="/">
        <Button type="primary">Go to home page</Button>
      </Link>
    }
  />
);
