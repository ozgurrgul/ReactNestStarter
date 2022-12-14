import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
import { Space } from "antd";
import { api, useRegisterMutation } from "../../services/api";
import { setToken } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { HttpResult } from "../../components/shared/HttpResult";
import {
  RightCircleOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { useFeatures } from "../../hooks/useFeatures";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captchaRef = useRef<ReCaptcha>(null);
  const { isFeatureEnabled } = useFeatures();

  const [register, { isLoading, error }] = useRegisterMutation();

  const onFinish = async (formState: any) => {
    if (isLoading || !captchaRef.current) {
      return;
    }

    const token = captchaRef.current.getValue();
    if (!token) {
      return;
    }

    captchaRef.current.reset();
    const registerOutput = await register({
      email: formState.email,
      password: formState.password,
      fullName: formState.fullName,
      recaptcha_token: token,
    }).unwrap();

    dispatch(setToken(registerOutput.data));
    dispatch(api.util.resetApiState());
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="ReactNestStarter"
        subTitle="Register"
        onFinish={onFinish}
        submitter={{
          searchConfig: {
            submitText: "Register",
          },
        }}
        actions={
          <Link to="/login">
            <Space>
              Login
              <RightCircleOutlined />
            </Space>
          </Link>
        }
      >
        <div style={{ paddingBottom: 16 }}>
          <HttpResult error={error} />
        </div>
        <ProFormText
          name="fullName"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder="Full name"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        />
        <ProFormText
          name="email"
          fieldProps={{
            size: "large",
            prefix: <MailOutlined />,
          }}
          placeholder="Email"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
          extra={
            isFeatureEnabled("emailVerification")
              ? "Check your inbox after registering to verify your email"
              : undefined
          }
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"Password"}
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        />
        <Space>
          <ReCaptcha
            ref={captchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          />
        </Space>
      </LoginFormPage>
    </div>
  );
};
