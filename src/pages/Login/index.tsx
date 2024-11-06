import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import React, { useCallback } from 'react';

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = useCallback((values) => {
    console.log('Received values of form: ', values);
    if (values.username === 'admin' && values.password === 'ksJ@12MczH') {
      window.localStorage.setItem('username', values.username);
      window.location.href = '/';
    } else {
      console.log('用户名或密码错误');
      messageApi.open({
        type: 'error',
        content: '用户名或密码错误',
      });
    }
  }, []);

  return (
    <>
      {contextHolder}
      <div
        className="w-screen h-screen"
        style={{
          background: 'url(/images/bg.jpg) center center / cover no-repeat',
        }}
      ></div>
      <div
        className="w-full h-full"
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          position: 'fixed',
          height: '100vh',
        }}
      >
        <Card
          title="云原生安全左移检测系统"
          style={{ width: 300 }}
          className="mr-20"
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              {/* <a style={{ float: 'right' }} href="">
              忘记密码
            </a> */}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
