import React from "react";
import axios from "axios";
import { Modal, message, Button } from "antd";
import SendFormLogin from "./sendFormLogin/sendFormLogin";

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  showModal = () => {
    this.setState((state) => {
      return { visible: !state.visible };
    });
  };

  sendLogin = (user) => {
    axios
      .post("https://redevcrm.herokuapp.com/users/login", user)
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.data));
        this.props.history.push("/users");
      })
      .catch(() => {
        message.error("Не правильный логин или пароль. Попробуйте ещё раз!");
      });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          style={{ float: "center", marginTop: "14px", borderRadius: "5px" }}
        >
          LogIn
        </Button>
        <Modal
          title="Для доступа к странице администратора введите емеил и пароль"
          visible={visible}
          onCancel={this.showModal}
          footer={null}
        >
          <SendFormLogin
            showModal={this.showModal}
            sendLogin={this.sendLogin}
          />
        </Modal>
      </>
    );
  }
}

export default NormalLoginForm;
