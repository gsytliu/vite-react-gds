import { lazy } from 'react';

export type RouteItem = {
  path: string;
  component?:
    | (() => JSX.Element)
    | React.LazyExoticComponent<() => JSX.Element>;
  access?: string | string[] | boolean;
  handle?: {
    menu?: string[]; // 第一级路由必填 用于渲染菜单icon和标题
    tab?: string; // 第二级路由如果是tab页，必填
  };
  children?: RouteItem[];
};

export default [
  {
    path: '/status',
    handle: {
      menu: ['STATUS'],
    },
    children: [
      {
        path: '/status/eth',
        handle: {
          tab: 'ETH',
        },
        component: lazy(() => import('@/views/Status/Eth')),
      },
      {
        path: '/status/wifi',
        handle: {
          tab: 'WIFI',
        },
        component: lazy(() => import('@/views/Status/WiFi')),
      },
    ],
  },
  {
    path: '/acct/sip',
    handle: {
      menu: ['ACCT', 'SIP'],
    },
    component: lazy(() => import('@/views/Acct/SIP')),
  },
  {
    path: '/acct/ipvt',
    handle: {
      menu: ['ACCT', 'IPVT'],
    },
    component: lazy(() => import('@/views/Acct/IPVT')),
  },
] as RouteItem[];
