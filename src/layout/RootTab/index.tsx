import {
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
  useRef,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSize, useDebounceEffect } from 'ahooks';
import classnames from 'classnames';
import { Copyright } from '@/components';
import { ContentLoading } from '../Loading';
import { useGetAccess } from '@/hooks';
import { $fm } from '@/intl';
import './index.less';

type TabItem = {
  title: string;
  path: string;
  access?: string | string[] | boolean;
};

interface RootTabProps {
  items: TabItem[];
  className?: string;
  indexPath?: string;
}

const RootTab: React.FC<RootTabProps> = ({ items, className, indexPath }) => {
  const linksRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [curPath, setCurPath] = useState(location.pathname);
  const { getAccess } = useGetAccess();
  const navigate = useNavigate();
  const size = useSize(linksRef);

  const goTab = useCallback(
    (path: string) => {
      setCurPath(path);
      navigate(path);
    },
    [navigate],
  );

  const filteredItem = useMemo(
    () => items.filter(({ access }) => getAccess(access)),
    [getAccess, items],
  );

  // 默认跳转第一个
  useLayoutEffect(() => {
    if (filteredItem.length && !filteredItem.some((i) => i.path === curPath)) {
      if (filteredItem.some((i) => i.path === indexPath)) {
        goTab(indexPath!);
      } else {
        goTab(filteredItem[0].path);
      }
    }
  }, [curPath, filteredItem, goTab, indexPath]);

  useDebounceEffect(
    () => {
      const activeTab = linksRef.current?.getElementsByClassName(
        'active',
      )?.[0] as HTMLDivElement | null;

      if (activeTab) {
        const [left, width] = [activeTab.offsetLeft, activeTab.offsetWidth];
        const firstWidth = (linksRef.current!.firstChild as HTMLDivElement)
          .offsetWidth;
        barRef.current!.style['width'] = firstWidth + 'px';
        barRef.current!.style[
          'transform'
        ] = `translate3d(${left}px, 0px, 0px) scaleX(${width / firstWidth})`;
      }
    },
    [curPath, size],
    { wait: 30 },
  );

  return (
    <div className={classnames(['root-tab', className])}>
      <div className='root-tab-list'>
        <div className='root-tab-links' ref={linksRef}>
          {filteredItem.map((item) => {
            return (
              <div
                className={classnames([
                  'tab-item',
                  { active: item.path === curPath },
                ])}
                key={item.path}
                onClick={() => goTab(item.path)}
              >
                <span>{$fm(item.title)}</span>
              </div>
            );
          })}
        </div>
        <div className='root-tab-bar' ref={barRef}></div>
      </div>
      <div className='root-tab-page'>
        <div className='root-tab-content main-view'>
          <ContentLoading>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </ContentLoading>
        </div>
        <Copyright />
      </div>
    </div>
  );
};

export default RootTab;
