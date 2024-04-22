import { Layout } from 'antd';
import RootHeader from './RootHeader';
import RootSider from './RootSider';
import RootContent from './RootContent';
import { ScreenLoading } from './Loading';
import './index.less';

const RootLayout: React.FC = () => {
  return (
    <ScreenLoading>
      <Layout className='root-layout'>
        <RootHeader />
        <Layout>
          <RootSider />
          <RootContent />
        </Layout>
      </Layout>
    </ScreenLoading>
  );
};

export default RootLayout;
