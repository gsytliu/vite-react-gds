import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useInViewport } from 'ahooks';
import { useContentLoading, useScreenLoading } from '@/store';
import { useEl } from '@/hooks';
import style from './index.module.less';

export const StickyBottom: React.FC<{
  children: React.ReactNode;
  className?: string;
  to?: React.RefObject<Element>;
}> = ({ children, className = '', to }) => {
  const { loading: sl } = useScreenLoading();
  const { loading: cl } = useContentLoading();
  const rootContent = useEl('#rootContent');
  const root = to?.current || rootContent;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView] = useInViewport(wrapperRef, {
    threshold: 1,
    root: () => root,
  });

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ visibility: inView ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
      {inView || !root || sl || cl
        ? null
        : createPortal(
            <div className={`${style['sticky-btm-wrapper']} ${className}`}>
              {children}
            </div>,
            root,
          )}
    </>
  );
};
