import React from "react";
import { Form, Input, Button } from "antd";
import "./sendFormLogin.css";

class SendFormLogin extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  sendSubmitHandler = (e) => {
    this.props.sendLogin(e);
    this.onReset();
    this.props.showModal();
  };

  render() {
    return (
      <>
        <Form
          onFinish={(e) => this.sendSubmitHandler(e)}
          ref={this.formRef}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите ваш емеил!",
              },
            ]}
          >
            <Input placeholder="email or login" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите ваш пароль!",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LogIn
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default SendFormLogin;
