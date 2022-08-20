import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const HomePage = () => (
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
);
