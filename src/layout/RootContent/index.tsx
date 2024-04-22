import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useRouteHandle } from '@/hooks';
import { Copyright } from '@/components';
import { ContentLoading } from '../Loading';
import { $fm } from '@/intl';

const { Content } = Layout;

const RootContent: React.FC = () => {
  const { tab, menu } = useRouteHandle();

  if (tab) {
    return (
      <Content className='root-content' id='rootContent'>
        <div className='root-content-header has-tab'>
          <h3>{$fm(menu!.at(-1)!)}</h3>
        </div>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Content>
    );
  }

  return (
    <Content className='root-content' id='rootContent'>
      <div className='root-content-header'>
        <h3>{$fm(menu!.at(-1)!)}</h3>
      </div>
      <div className='root-content-body'>
        <div className='root-content-main main-view'>
          <ContentLoading>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </ContentLoading>
        </div>
        <Copyright />
      </div>
    </Content>
  );
};

export default RootContent;
