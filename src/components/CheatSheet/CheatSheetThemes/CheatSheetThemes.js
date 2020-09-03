import React from "react";
import "./CheatSheetThemes.css";
import { Table, Modal, Button } from "antd";
import SendFormForCreateCheatSheet from "./SendFormForCreateCheatSheet/SendFormForCreateCheatSheet/SendFormForCreateCheatSheet";
import { connect } from "react-redux";
import { getAsyncThemes } from "../../../redux/actions/themesActions";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    filters: [
      {
        text: "функции",
        value: "функции",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Keyword",
    dataIndex: "keyword",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => <img style={{ width: 150 }} src={image} alt="" />,
  },
];

class CheatSheetThemes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState(
      (state) => {
        return { visible: !state.visible };
      },
      () => this.props.getAsyncThemes()
    );
  };

  componentDidMount() {
    this.props.getAsyncThemes();
  }

  render() {
    const { visible } = this.state;
    const { data } = this.props.themes;
    return (
      <>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          style={{ marginBottom: "15px", borderRadius: "7px" }}
        >
          create a cheat sheet theme
        </Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onCancel={this.showModal}
          footer={null}
        >
          <SendFormForCreateCheatSheet
            showModal={this.showModal}
            getAsyncThemes={getAsyncThemes}
          />
        </Modal>

        <Table columns={columns} dataSource={data} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    themes: state.themes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncThemes: () => dispatch(getAsyncThemes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheatSheetThemes);
