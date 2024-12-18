import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification, Space } from "antd";
import { fetchPosts, updatePost, deletePost } from "../services/api";
import { Post } from "../types/post";
import "./table.css";

const PostTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPosts()
      .then((response) => setPosts(response.data))
      .catch((error) =>
        notification.error({
          message: "Error fetching posts",
          description: error.message,
        })
      );
  }, []);

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deletePost(id)
      .then(() => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        notification.success({ message: "Post deleted successfully!" });
      })
      .catch((error) =>
        notification.error({
          message: "Error deleting post",
          description: error.message,
        })
      );
  };

  const handleUpdate = (values: { title: string; body: string }) => {
    if (editingPost) {
      updatePost(editingPost.id, values)
        .then(() => {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === editingPost.id ? { ...post, ...values } : post
            )
          );
          notification.success({ message: "Post updated successfully!" });
          closeEditModal();
        })
        .catch((error) =>
          notification.error({
            message: "Error updating post",
            description: error.message,
          })
        );
    }
  };

  const closeEditModal = () => {
    setIsModalVisible(false);
    setEditingPost(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span data-label="Title">{text}</span>,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (text: string) => <span data-label="Body">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Post) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="responsive-table" style={{ textAlign: "center" }}>
        <Table
          dataSource={posts}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
      {isModalVisible && (
        <Modal
          title="Edit Post"
          visible={isModalVisible}
          onCancel={closeEditModal}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleUpdate}
            layout="vertical"
            initialValues={editingPost || {}}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="body"
              label="Body"
              rules={[{ required: true, message: "Body is required" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default PostTable;
