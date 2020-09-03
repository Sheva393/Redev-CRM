import React from "react";
import "./SendFormForCreateCheatSheet.css";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addAsyncThemes } from "../../../../../redux/actions/themesActions";
import { getAsyncSections } from "../../../../../redux/actions/sectionsActions";

class SendFormForCreateCheatSheet extends React.Component {
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
    console.log(value.upload);
    const params = {
      title: value.title,
      keyword: value.keyword,
      image: value.upload[0].response.imageUrl,
      сheatSheetSectionId: value.сheatSheetSectionId,
    };
    this.props.addAsyncThemes(params);
    this.onReset();
    this.props.showModal();
  };

  componentDidMount() {
    this.props.getAsyncSections();
    console.log(this.props.getAsyncSections());
  }

  render() {
    const { data } = this.props.sections;

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
            label="Title"
            name="title"
            rules={[
              {
                type: "string",
                message: "Text is not valid!",
              },
              {
                required: true,
                message: "Please input your cheat sheet!",
              },
            ]}
          >
            <Input placeholder="Theme of cheat sheet" />
          </Form.Item>
          <Form.Item
            label="keyword"
            name="keyword"
            rules={[
              {
                type: "string",
                message: "Text is not valid!",
              },
              {
                required: true,
                message: "Please input keyword!",
              },
            ]}
          >
            <Input placeholder="Keyword" />
          </Form.Item>
          <Form.Item
            label="Section"
            name="сheatSheetSectionId"
            rules={[
              {
                required: true,
                message: "Please choose a section!",
              },
            ]}
          >
            <Select placeholder="Please choose a section">
              {data.map((item, id) => {
                return (
                  <Select.Option value={item._id} key={id}>
                    {item.title}
                  </Select.Option>
                );
              })}
              ;
            </Select>
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
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

function mapStateToProps(state) {
  return {
    sections: state.sections,
  };
}

function mapDispathToProps(dispatch) {
  return {
    addAsyncThemes: (params) => dispatch(addAsyncThemes(params)),
    getAsyncSections: () => dispatch(getAsyncSections()),
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(SendFormForCreateCheatSheet);
