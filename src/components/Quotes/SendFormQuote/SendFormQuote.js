import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { addAsyncQuotes } from "../../../redux/actions/quotesActions";

class SendFormQuote extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  sendSubmitHandler = (e) => {
    this.props.addAsyncQuotes(e);
    this.onReset();
    this.props.showModal();
  };

  render() {
    return (
      <div>
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={(e) => this.sendSubmitHandler(e)}
          ref={this.formRef}
        >
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: "Please enter author name!",
              },
            ]}
          >
            <Input placeholder="Author name" />
          </Form.Item>
          <Form.Item
            label="Quote"
            name="text"
            rules={[
              {
                required: true,
                message: "Please input your text!",
              },
            ]}
          >
            <Input placeholder="Input your text" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create quote
          </Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAsyncQuotes: (params) => dispatch(addAsyncQuotes(params)),
  };
}

export default connect(null, mapDispatchToProps)(SendFormQuote);
