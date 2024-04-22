import { Spin } from 'antd';
import { useScreenLoading, useContentLoading } from '@/store';
import './index.less';

export const ScreenLoading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, tip } = useScreenLoading();
  return (
    <Spin spinning={loading} tip={tip} wrapperClassName='screen-loading'>
      {children}
    </Spin>
  );
};

export const ContentLoading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, tip } = useContentLoading();
  return (
    <Spin
      spinning={loading}
      tip={tip}
      wrapperClassName='content-loading'
      size='large'
    >
      <div style={{ opacity: loading ? 0 : 1 }}>{children}</div>
    </Spin>
  );
};
