import { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import { useNavigate, useMatches } from 'react-router-dom';
import { useGetAccess } from '@/hooks/useGetAccess';
import routes from '@/router/routes';
import { GsIcon, type IconTypes } from '@/components';
import { localStorage, KEY_COLLAPSED } from '@/utils/storage';
import { $fm } from '@/intl';
import './index.less';

const { Sider } = Layout;

type SelectEventHandler = MenuProps['onSelect'];

export const IconMap: Record<string, IconTypes> = {
  STATUS: 'status',
  ACCT: 'acct',
};

const useMenuList = () => {
  const { getAccess } = useGetAccess();

  const ml = useMemo(() => {
    const result: any[] = [];
    routes
      .filter(({ access = true }) => {
        return getAccess(access);
      })
      .forEach(({ path, handle }) => {
        const paths = path.split('/').slice(1);
        if (!paths[0]) return false;
        let matched = result.find((item) => item?.key === paths[0]);
        if (!matched) {
          const label = handle!.menu![0];
          matched = {
            key: paths[0],
            label: $fm(label),
            icon: <GsIcon type={IconMap[label]} />,
          };
          result.push(matched);
        }

        if (paths[1]) {
          matched.children = matched.children || [
            // 多做一层group 用于渲染缩进时的popup小标题
            {
              key: `group ${paths[0]}`,
              label: $fm(handle!.menu![0]),
              type: 'group',
              children: [],
            },
          ];
          matched.children[0].children.push({
            key: paths[1],
            label: $fm(handle!.menu![1]),
          });
        }
      });
    return result;
  }, [getAccess]);

  return ml;
};

const RootSider = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const menulist = useMenuList();
  const [collapsed, setCollapsed] = useState(
    localStorage.get<boolean>(KEY_COLLAPSED),
  );

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectKeys] = useState<string[]>([]);

  useEffect(() => {
    const pathAry = matches[1].pathname.split('/').slice(1);
    const keys = pathAry.slice(0, 2);
    setOpenKeys(keys.length > 1 && !collapsed ? [keys[0]] : []);
    setSelectKeys([keys.at(-1)!]);
  }, [collapsed, matches]);

  const onSelect: SelectEventHandler = ({ keyPath }) => {
    navigate(keyPath.reverse().join('/'));
  };

  const onToggle = () => {
    setCollapsed(!collapsed);
    localStorage.set(KEY_COLLAPSED, !collapsed);
  };

  return (
    <Sider
      className='root-sider'
      width={220}
      collapsed={collapsed}
      collapsedWidth={56}
    >
      <Menu
        className='sider-menu'
        items={menulist}
        theme='dark'
        mode='inline'
        inlineIndent={16}
        onSelect={onSelect}
        onOpenChange={setOpenKeys}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        expandIcon={<GsIcon type='arrow-down' />}
        getPopupContainer={(e) => e.parentElement!}
      />
      <span className='collapsed-toggle' onClick={onToggle}>
        <GsIcon type={collapsed ? 'arrow-right' : 'arrow-left'} />
      </span>
    </Sider>
  );
};

export default RootSider;
