import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useDefineStore } from '@/store';
import API from '@/api';
import RULES from '@/utils/rules';
import './LoginForm.less';

const LoginForm: React.FC = () => {
  const { setSid, setRole } = useAuthStore();
  const { setDefine } = useDefineStore();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    await API.login(values.username, values.password);
    setSid(Math.random() + '');
    setRole('admin');
    setDefine({ role: 'admin' });
    navigate('/status');
  };

  return (
    <Form
      className='login-form'
      onFinish={onFinish}
      initialValues={{
        username: 'admin',
        password: '123456',
      }}
    >
      <h3>GS Phone Project</h3>
      <Form.Item name='username' rules={[RULES.required()]}>
        <Input placeholder='请输入用户名' />
      </Form.Item>
      <Form.Item name='password' rules={[RULES.required()]}>
        <Input.Password placeholder='请输入密码' />
      </Form.Item>
      <Button block type='primary' htmlType='submit'>
        登录
      </Button>
    </Form>
  );
};

export default LoginForm;
