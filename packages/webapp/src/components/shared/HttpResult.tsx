import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Alert } from "antd";
import { BaseOutput } from "../../types/BaseOutput";

type Props = {
  style?: React.CSSProperties;
  error?:
    | {
        data: BaseOutput<any>;
      }
    | SerializedError;
  result?: BaseOutput<any>;
};

export const HttpResult: React.FC<Props> = ({ error, result, style }) => {
  if (result && result.succeed) {
    return (
      <Alert
        style={style}
        message={"Successful operation"}
        type={"success"}
        showIcon
        closable
      />
    );
  }

  if (!error) {
    return null;
  }

  if ("data" in error && error.data) {
    return (
      <Alert
        style={style}
        message={error.data.message}
        type={"error"}
        showIcon
        closable
      />
    );
  }

  return (
    <Alert
      style={style}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message={error.error || "Unexpected error happened"}
      type={"error"}
      showIcon
      closable
    />
  );
};
