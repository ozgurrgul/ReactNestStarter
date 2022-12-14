import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
import { api, useLoginMutation } from "../../services/api";
import { setToken } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { HttpResult } from "../../components/shared/HttpResult";
import {
  MailOutlined,
  LockOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { ProFormText, LoginFormPage } from "@ant-design/pro-components";
import { Space } from "antd";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captchaRef = useRef<ReCaptcha>(null);

  const [login, { isLoading, error }] = useLoginMutation();

  const onFinish = async (formState: any) => {
    if (isLoading) {
      return;
    }
    if (!captchaRef.current) {
      return;
    }
    const token = captchaRef.current.getValue();
    if (!token) {
      return;
    }
    captchaRef.current.reset();
    const loginOutput = await login({
      email: formState.email,
      password: formState.password,
      recaptcha_token: token,
    }).unwrap();
    dispatch(setToken(loginOutput.data));
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
        subTitle="Login"
        onFinish={onFinish}
        submitter={{
          searchConfig: {
            submitText: "Login",
          },
        }}
        actions={
          <Link to="/register">
            <Space>
              Register
              <RightCircleOutlined />
            </Space>
          </Link>
        }
      >
        <>
          <div style={{ paddingBottom: 16 }}>
            <HttpResult error={error} />
          </div>
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
        </>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          {/* TODO: remember me functionality */}
          {/* <ProFormCheckbox noStyle name="rememberMe">
            Remember me
          </ProFormCheckbox> */}
          {/* <a
            style={{
              float: "right",
            }}
          >
            Forgot password
          </a> */}
        </div>
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
