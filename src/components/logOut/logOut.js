import React from "react";
import { Button } from "antd";
import "./LogOut.css";

class LogOut extends React.Component {
  handleClick = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <Button
        type="primary"
        htmlType="submit"
        onClick={this.handleClick}
        style={{ float: "right", marginTop: "14px", borderRadius: "5px" }}
      >
        LogOut
      </Button>
    );
  }
}

export default LogOut;
