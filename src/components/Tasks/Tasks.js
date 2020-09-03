import React from "react";
import { Table, Modal, Button } from "antd";
import SendFormTasks from "./SendFormTasks/SendFormTasks";
import { connect } from "react-redux";
import { getAsyncTasks } from "../../redux/actions/tasksActions";

class Tasks extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState(
      (state) => {
        return { visible: !state.visible };
      },
      () => this.props.getAsyncTasks()
    );
  };

  componentDidMount() {
    this.props.getAsyncTasks();
  }

  render() {
    const { data } = this.props.tasks;
    const { visible } = this.state;

    const columns = [
      {
        title: "Theme",
        dataIndex: "theme",
        key: "theme",
      },
      {
        title: "Text",
        dataIndex: "text",
        key: "text",
      },
    ];

    return (
      <div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          style={{ marginBottom: "15px", borderRadius: "5px" }}
        >
          Create task
        </Button>
        <Modal
          title="Create a hard task"
          visible={visible}
          onCancel={this.showModal}
          footer={null}
        >
          <SendFormTasks showModal={this.showModal} />
        </Modal>

        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncTasks: () => dispatch(getAsyncTasks()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
