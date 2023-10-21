import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Image,
  Pagination,
  Input,
  Modal,
  Space,
  Table,
  // Upload,
} from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  // LoadingOutlined,
  // PlusOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
  changePage,
  controlModal,
  deleteUser,
  editUser,
  getUser,
  searchUser,
  sendUser,
  updateState,
  // uploadPhoto,
} from "../../redux/actions/user";
import { getUserImg } from "../../utils";
import { LIMIT_TABLE } from "../../constants";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const UserControl = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const {
    users,
    loading,
    total,
    activePage,
    selected,
    isModalLoading,
    isModalOpen,
    // photoLoad,
    search,
    // photoData,
  } = useSelector((state) => state.user);

  useEffect(() => {
    total === 0 && dispatch(getUser());
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
    // values.photo = photoData._id;
    dispatch(sendUser({ values, selected, activePage, search }));
  };

  const mustDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: () => {
        dispatch(deleteUser(id, search));
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo, i) => {
        const handleError = (error) => {
          error.target.src = "/icon.png";
        };

        return (
          <Image
            key={i}
            height={50}
            onError={handleError}
            src={getUserImg(photo)}
          />
        );
      },
    },
    {
      title: "First_name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last_name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
            onClick={() => dispatch(editUser(form, id))}
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
            <h2>Users ({users.length})</h2>
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
                    dispatch(searchUser(e.target.value.toLowerCase()))
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
              Add user
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={users}
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
        title="User data"
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
          name="users"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          {/* <Upload
            name="photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadPhoto(e.file.originFileObj))}
          >
            <div>
              {photoLoad ? (
                <LoadingOutlined />
              ) : photoData ? (
                <LazyLoadImage
                  effect="blur"
                  src={getUserImg(photoData)}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div>upload</div>
                </div>
              )}
            </div>
          </Upload> */}

          <Form.Item
            label="First_name"
            name="first_name"
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
            label="Last_name"
            name="last_name"
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
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UserControl;
