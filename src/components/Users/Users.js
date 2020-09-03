import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import "./Users.css";
import { getAsyncUsers } from "../../redux/actions/usersActions";

class Users extends React.Component {
  componentDidMount() {
    this.props.getAsyncUsers();
  }

  render() {
    const { data } = this.props.users;

    const columns = [
      {
        title: "First name",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },

      {
        title: "Birthday",
        key: "birthday",
        dataIndex: "birthday",
      },
      {
        title: "Surname",
        dataIndex: "lastName",
        key: "lastName",
      },
    ];

    return <Table columns={columns} dataSource={data} />;
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncUsers: () => dispatch(getAsyncUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
