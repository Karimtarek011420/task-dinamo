import { Form, Input, Button, notification, Card } from "antd";
import { createPost } from "../services/api";

const AddPostForm = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: { title: string; body: string }) => {
    createPost(values)
      .then(() => {
        notification.success({ message: "Post created successfully!" });
        form.resetFields();
      })
      .catch((error) =>
        notification.error({
          message: "Error creating post",
          description: error.message,
        })
      );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        padding: "20px",
        
      }}
    >
      <Card
        title="Create a New Post"
        style={{
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Please enter the body!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter body" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddPostForm;
