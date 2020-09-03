import React from "react";
import "./leedsList.css";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAsyncLeeds } from "../../redux/actions/leedsActions";

class Leeds extends React.Component {
  componentDidMount() {
    this.props.getAsyncLeeds();
  }

  render() {
    const { data } = this.props.leeds;

    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Communication method",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Address",
        dataIndex: "target",
        key: "target",
      },
    ];

    return <Table columns={columns} dataSource={data} />;
  }
}

function mapStateToProps(state) {
  return {
    leeds: state.leeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncLeeds: () => dispatch(getAsyncLeeds()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leeds);
