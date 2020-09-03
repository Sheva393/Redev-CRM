import React from "react";
import "./TableCheatSheet.css";
import { Table, Modal, Button } from "antd";
import SendFormForCreateCheatSheetSections from "./sendFormForCreateCheatSheetSections/sendFormForCreateCheatSheetSections";
import { connect } from "react-redux";
import { getAsyncSections } from "../../../redux/actions/sectionsActions";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    filters: [
      {
        text: "js",
        value: "js",
      },
      {
        text: "react",
        value: "react",
      },
      {
        text: "html",
        value: "html",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Logo",
    dataIndex: "logo",
    render: (logo) => <img style={{ width: 80 }} src={logo} alt="" />,
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => <img style={{ width: 80 }} src={image} alt="" />,
  },
  // {
  //   title: "CountSection",
  //   dataIndex: "countSection",
  //   defaultSortOrder: "descend",
  //   sorter: (a, b) => a.countSection - b.countSection,
  // },
];

class TableCheatSheet extends React.Component {
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
      () => this.props.getAsyncSections()
    );
  };

  componentDidMount() {
    this.props.getAsyncSections();
  }

  render() {
    const { visible } = this.state;
    const { data } = this.props.sections;
    return (
      <div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          style={{ marginBottom: "15px", borderRadius: "7px" }}
        >
          Create cheat sheet
        </Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onCancel={this.showModal}
          footer={null}
        >
          <SendFormForCreateCheatSheetSections showModal={this.showModal} />
        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sections: state.sections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncSections: () => dispatch(getAsyncSections()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCheatSheet);
