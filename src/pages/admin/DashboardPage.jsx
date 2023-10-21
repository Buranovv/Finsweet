import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Space, Table } from "antd";
import { getCategory } from "../../redux/actions/category";
import { getUser } from "../../redux/actions/user";
import { getPost } from "../../redux/actions/post";
import { getComment } from "../../redux/actions/comment";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { total: categories } = useSelector((state) => state.category);
  const { total: users } = useSelector((state) => state.user);
  const { total: posts } = useSelector((state) => state.post);
  const { total: comments } = useSelector((state) => state.comment);

  useEffect(() => {
    categories === 0 && dispatch(getCategory());
    users === 0 && dispatch(getUser());
    posts === 0 && dispatch(getPost());
    comments === 0 && dispatch(getComment());
  }, [categories, users, posts, comments, dispatch]);

  const columns = [
    {
      title: "Sections",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  
  const data = [
    {
      section: "Categories",
      total: categories,
    },
    {
      section: "Users",
      total: users,
    },
    {
      section: "Posts",
      total: posts,
    },
    {
      section: "Comments",
      total: comments,
    },
  ];

  return (
    <Fragment>
      <Space>
        <Table
          scroll={{
            x: 1000,
          }}
          title={() => (
            <Flex align="center" justify="space-between">
              <h2>Dashboard</h2>
            </Flex>
          )}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </Space>
    </Fragment>
  );
};

export default DashboardPage;
