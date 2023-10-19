import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  getCategory,
  searchCategory,
} from "../../redux/actions/category";
import { getImg } from "../../utils";
import { LIMIT_CTGR } from "../../constants";

const CategoryControl = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [photo, setPhoto] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo, i) => {
        const photoType = photo?.name?.split(".")[1];
        const photoId = photo?._id;
        const photo2 = `${photoId}.${photoType}`;
        const handleError = (error) => {
          error.target.src = "/icon.png";
        };

        return (
          <Image
            key={i}
            height={50}
            onError={handleError}
            src={getImg(photo2)}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc, i) => <p key={i}>{desc.slice(0, 35)}...</p>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id, i) => (
        <Space key={i} size="middle">
          <Link to={`/categoryControl/${id}`}>
            <Button type="dashed">See posts</Button>
          </Link>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const { categories, loading, total, activePage } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    total === 0 && dispatch(getCategory());
  }, [dispatch, total]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelected(null);
    setIsModalLoading(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      let values = await form.validateFields();
      // values.photo = photo;
      // await request.post("category", values);
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };

  // const uploadPhoto = async (e) => {
  //   try {
  //     let formData = new FormData();
  //     formData.append("file", e.target.files["0"]);
  //     const { data } = await request.post("upload", formData);
  //     setPhoto(data._id);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex align="center" justify="space-between">
            <h2>Categories ({categories.length})</h2>
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
                    dispatch(searchCategory(e.target.value.toLowerCase()))
                  }
                  placeholder="Search category"
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
        dataSource={categories}
        columns={columns}
        pagination={false}
      />
      {total > LIMIT_CTGR ? (
        <Pagination
          total={total}
          pageSize={LIMIT_CTGR}
          current={activePage}
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}
      <Modal
        title="Category data"
        okText={selected === null ? "Add" : "Save"}
        okButtonProps={{
          icon: selected === null ? <UserAddOutlined /> : <SaveOutlined />,
        }}
        open={isModalOpen}
        onOk={submit}
        onCancel={closeModal}
        maskClosable={false}
        confirmLoading={isModalLoading}
      >
        <Form
          name="categories"
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
            label="Name"
            name="name"
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
          <Form.Item
            label="Photo"
            name="photo"
            // onChange={uploadPhoto}
            rules={[
              {
                required: true,
                message: "Please choose a file!",
              },
            ]}
          >
            <Input type="file" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoryControl;
