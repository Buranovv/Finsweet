import { Fragment, useContext, useEffect } from "react";
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
  Upload,
  Select,
} from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
  changePage,
  controlModal,
  deletePost,
  editPost,
  getPost,
  searchPost,
  sendPost,
  updateState,
  uploadPhoto,
} from "../../redux/actions/post";
import { getImg } from "../../utils";
import { LIMIT_TABLE } from "../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PopularBlogsContext } from "../../context/PopularBlogsContext";

const PostControl = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const {
    posts,
    loading,
    total,
    activePage,
    selected,
    isModalLoading,
    isModalOpen,
    photoLoad,
    search,
    photoData,
  } = useSelector((state) => state.post);

  const { categories } = useContext(PopularBlogsContext);

  useEffect(() => {
    total === 0 && dispatch(getPost());
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
    values.photo = photoData._id;
    dispatch(sendPost({ values, selected, activePage, search }));
  };

  const mustDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: () => {
        dispatch(deletePost(id, search));
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
            src={getImg(photo)}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc, i) => <p key={i}>{desc.slice(0, 30)}...</p>,
    },
    {
      title: "user",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.username,
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
            onClick={() => dispatch(editPost(form, id))}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            type="primary"
            onClick={() => mustDelete(id, search)}
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
            <h2>Posts ({posts.length})</h2>
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
                    dispatch(searchPost(e.target.value.toLowerCase()))
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
        dataSource={posts}
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
          name="posts"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Upload
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
                  src={getImg(photoData)}
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
          </Upload>

          <Form.Item
            label="Title"
            name="title"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select
              style={{
                width: 120,
              }}
              allowClear
            >
              {categories.map((ctgr) => (
                <option key={ctgr._id} value={ctgr._id}>
                  {ctgr.name}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PostControl;
