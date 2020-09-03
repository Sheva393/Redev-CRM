import "./Quotes.css";
import SendFormQuote from "./SendFormQuote/SendFormQuote";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, message, Modal } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { getAsyncQuotes } from "../../redux/actions/quotesActions";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
      },
      {
        title: "Quote",
        dataIndex: "text",
        key: "text",
        maxWidth: "60%",
        editable: true,
      },
      {
        title: "Actions",
        dataIndex: "_id",
        render: (_id) => (
          <Popconfirm
            title="Are you shure?"
            onConfirm={() => this.handleDelete(_id)}
          >
            <p style={{ cursor: "pointer" }}>Delete</p>
          </Popconfirm>
        ),
      },
    ];
    this.state = {
      visible: false,
    };
  }

  showModal = () =>
    this.setState(
      (state) => {
        return { visible: !state.visible };
      },
      () => this.props.getAsyncQuotes()
    );

  handleDelete = (_id) =>
    axios
      .delete(`https://redevcrm.herokuapp.com/quotes/${_id}`)
      .then(() => {
        this.props.getAsyncQuotes();
        message.success("Цитата удалена успешно");
      })
      .catch(() => message.error("Что то пошло не так!"));

  handleSave = (data) => {
    const text = { text: data.text };
    axios
      .patch(`https://redevcrm.herokuapp.com/quotes/${data._id}`, text)
      .then(() => {
        this.props.getAsyncQuotes();
        message.success("Цитата изменена успешно");
      })
      .catch(() => message.error("Что то пошло не так!"));
  };

  componentDidMount() {
    this.props.getAsyncQuotes();
  }

  render() {
    let { visible } = this.state;
    const { data } = this.props.quotes;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          style={{ marginBottom: "15px", borderRadius: "7px" }}
        >
          Create quote
        </Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onCancel={this.showModal}
          footer={null}
        >
          <SendFormQuote showModal={this.showModal} />
        </Modal>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={data}
          columns={columns}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.quotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAsyncQuotes: () => dispatch(getAsyncQuotes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
