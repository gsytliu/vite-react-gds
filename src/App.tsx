import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from '@/router';
import { IntlWrapper } from './intl';
import { loadTemplate } from './template';
import { NoData } from '@/components';

function App() {
  useEffect(() => {
    loadTemplate();
  }, []);
  return (
    <IntlWrapper>
      <ConfigProvider renderEmpty={() => <NoData />}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </IntlWrapper>
  );
}

export default App;
