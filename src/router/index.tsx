import { Navigate, createHashRouter } from 'react-router-dom';
import { type RouteObject } from 'react-router-dom';
import AccessControl from './AccessControl';
import Layout from '@/layout';
import RootTab from '@/layout/RootTab';
import Login from '@/views/Login';
import AuthControl from './AuthControl';
import routes, { type RouteItem } from './routes';

const getRouteComponent = (c: RouteItem) => {
  const { component, handle, children } = c;
  if (component) return component;
  if (handle?.menu && children?.[0]?.handle?.tab) {
    return () => (
      <RootTab
        items={children.map((i) => ({
          path: i.path,
          title: i.handle!.tab!,
          access: i.access,
        }))}
      />
    );
  }
  return () => <></>;
};

// 注册后台路由 (通过包裹AccessControl的方式实现路由访问权限控制)
export const getRoutes = (configs: RouteItem[] = routes): RouteObject[] => {
  return configs.map((c) => {
    const { path, access, children, handle } = c;

    // menu级别路由下的tab
    const Component = getRouteComponent(c);

    // 注入权限控制
    const element =
      typeof access !== 'undefined' ? (
        <AccessControl access={access}>
          <Component />
        </AccessControl>
      ) : (
        <Component />
      );

    return {
      path,
      element,
      handle,
      children: children ? getRoutes(children) : [],
    };
  });
};

export const router = createHashRouter([
  {
    index: true,
    element: <Navigate to='/status' replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthControl>
        <Layout />
      </AuthControl>
    ),
    children: [
      ...getRoutes(),
      {
        path: '*',
        element: <Navigate to='/status' replace />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/login' replace />,
  },
]);
