import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import "./SendFormTasks.css";
import { addAsyncTasks } from "../../../redux/actions/tasksActions";

class SendFormTasks extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  sendSubmitHandler = (e) => {
    this.props.addAsyncTasks(e);
    this.onReset();
    this.props.showModal();
  };

  render() {
    return (
      <div>
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
            label="Theme"
            name="theme"
            rules={[
              {
                required: true,
                message: "Please input your theme!",
              },
            ]}
          >
            <Input placeholder="Input theme" />
          </Form.Item>
          <Form.Item
            label="Task"
            name="text"
            rules={[
              {
                required: true,
                message: "Please input your task!",
              },
            ]}
          >
            <Input placeholder="Input task" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAsyncTasks: (e) => dispatch(addAsyncTasks(e)),
  };
}

export default connect(null, mapDispatchToProps)(SendFormTasks);
