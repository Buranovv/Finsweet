import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Pagination,
  Input,
  Modal,
  Space,
  Table,
} from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
  changePage,
  controlModal,
  deleteComment,
  editComment,
  getComment,
  searchComment,
  sendComment,
  updateState,
} from "../../redux/actions/comment";
import { LIMIT_TABLE } from "../../constants";

const CommentControl = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const {
    comments,
    loading,
    total,
    activePage,
    selected,
    isModalLoading,
    isModalOpen,
    search,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    total === 0 && dispatch(getComment());
  }, [dispatch, total]);

  const showModal = () => {
    form.resetFields();
    dispatch(controlModal(true));
    dispatch(updateState({ photoData: null, selected: null }));
  };
  const closeModal = () => {
    dispatch(controlModal(false));
  };

  const handleOk = async () => {
    let values = await form.validateFields();
    dispatch(sendComment({ values, selected, activePage, search }));
  };

  const mustDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: () => {
        dispatch(deleteComment(id, search));
      },
    });
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment, i) => <p key={i}>{comment.slice(0, 30)}...</p>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id, i) => (
        <Space key={i} size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => dispatch(editComment(form, id))}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            type="primary"
            onClick={() => mustDelete(id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex align="center" justify="space-between">
            <h2>Comments ({comments.length})</h2>
            <Form
              name="search"
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: 400,
              }}
              autoComplete="off"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Search
                  onChange={(e) =>
                    dispatch(searchComment(e.target.value.toLowerCase()))
                  }
                  placeholder="Search user"
                  allowClear
                />
              </Space.Compact>
            </Form>
            <Button
              type="dashed"
              onClick={showModal}
              icon={<UserAddOutlined />}
            >
              Add category
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={comments}
        columns={columns}
        pagination={false}
      />
      {total > LIMIT_TABLE ? (
        <Pagination
          total={total}
          pageSize={LIMIT_TABLE}
          current={activePage}
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}
      <Modal
        title="Comment data"
        okText={selected === null ? "Add" : "Save"}
        okButtonProps={{
          icon: selected === null ? <UserAddOutlined /> : <SaveOutlined />,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        maskClosable={false}
        confirmLoading={isModalLoading}
      >
        <Form
          name="comments"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Post"
            name="post"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CommentControl;
