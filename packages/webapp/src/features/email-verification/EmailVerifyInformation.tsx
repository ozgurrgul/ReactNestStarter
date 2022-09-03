import { Alert, Space, Button } from "antd";
import { useFeatures } from "../../hooks/useFeatures";
import { useMe } from "../../hooks/useMe";
import { useResendVerificationMutation } from "../../services/api";

export const EmailVerifyInformation = () => {
  const { isFeatureEnabled } = useFeatures();
  const { me } = useMe();
  const [resend, { isLoading, isSuccess }] = useResendVerificationMutation();

  if (!isFeatureEnabled("emailVerification") || me?.emailVerified) {
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
