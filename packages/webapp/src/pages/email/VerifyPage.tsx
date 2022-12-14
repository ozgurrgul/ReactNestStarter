import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../services/api";
import { message, Spin } from "antd";
import { useFeatures } from "../../hooks/useFeatures";

export const VerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verify, { isLoading }] = useVerifyEmailMutation();
  const token = searchParams.get("token");
  const { isFeatureEnabled } = useFeatures();

  useEffect(() => {
    if (token) {
      verify({ token })
        .unwrap()
        .then((response) => {
          if (response.succeed) {
            message.success("Email successfully verified!");
          }
          navigate("/");
        });
    }
  }, [token]);

  if (!isFeatureEnabled("emailVerification")) {
    return null;
  }

  if (isLoading) {
    return (
      <div>
        <Spin size="large" /> Verifying email
      </div>
    );
  }

  return null;
};
