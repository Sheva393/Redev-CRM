import React from "react";
import "./sendFormForCreateCheatSheetSections.css";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addAsyncSections } from "../../../../redux/actions/sectionsActions";

class SendFormForCreateCheatSheetSections extends React.Component {
  formRef = React.createRef();

  normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  sendSubmitHandler = (value) => {
    console.log(value);
    const params = {
      title: value.title,
      logo: value.logo[0].response.imageUrl,
      image: value.image[0].response.imageUrl,
    };
    this.props.addAsyncSections(params);
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
          onFinish={(value) => this.sendSubmitHandler(value)}
          ref={this.formRef}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                type: "string",
                message: "The input is not valid text!",
              },
              {
                required: true,
                message: "Пожалуйста введите тему шпаргалки!",
              },
            ]}
          >
            <Input placeholder="Theme of cheat sheet" />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
            valuePropName="fileList[0].response.imageUrl"
            getValueFromEvent={this.normFile}
            extra="PNG"
          >
            <Upload
              name="image"
              action="https://redevcrm.herokuapp.com/upload"
              listType="picture"
            >
              <Button>
                <UploadOutlined />
                Upload photo
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList[0].response.imageUrl"
            getValueFromEvent={this.normFile}
            extra="PNG"
          >
            <Upload
              name="image"
              action="https://redevcrm.herokuapp.com/upload"
              listType="picture"
            >
              <Button>
                <UploadOutlined />
                Upload photo
              </Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create cheat sheet
          </Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAsyncSections: (params) => dispatch(addAsyncSections(params)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SendFormForCreateCheatSheetSections);
