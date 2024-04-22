import { Dropdown, type MenuProps } from 'antd';
import { GsIcon } from '@/components';
import { useLogout } from '@/hooks';
import { useDefineStore, useLocaleStore } from '@/store';

const LOCALES = [
  { value: 'en', title: 'English' },
  { value: 'zh', title: '中文' },
];

export const RoleMenu = () => {
  const logout = useLogout();
  const { define } = useDefineStore();
  const { locale, setLocale } = useLocaleStore();

  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <GsIcon type='lang' />
          语言
        </>
      ),
      key: 'lang',
      popupClassName: 'role-menu-lang-select',
      children: LOCALES.map((item) => {
        return {
          label: item.title,
          key: 'lang-' + item.value,
          className: `${locale === item.value ? 'active' : ''}`,
          onClick: () => setLocale(item.value as any),
        };
      }),
    },

    {
      label: (
        <>
          <GsIcon type='reboot' />
          重启
        </>
      ),
      key: 'reboot',
      onClick: () => {
        console.log('rebooted');
      },
    },

    {
      type: 'divider',
    },

    {
      label: '退出登录',
      key: 'logout',
      className: 'logout-item',
      onClick: logout,
    },
  ];

  return (
    <Dropdown
      transitionName='ant-fade'
      placement='bottom'
      menu={{ items, className: 'header-role-drop-menu' }}
    >
      <span className='header-role-menu'>
        <GsIcon type='user-header' />
        <span>{define.role}</span>
        <GsIcon type='arrow-down' />
      </span>
    </Dropdown>
  );
};
