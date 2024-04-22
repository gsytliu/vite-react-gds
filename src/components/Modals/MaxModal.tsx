import React, { createContext, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Copyright } from '@/components';
import { GsIcon } from '../GsIcon';
import { Fade } from '../Transition';
import { noop } from '@/utils/tools';
import { useEl } from '@/hooks';
import './MaxModal.less';

type CancelFunc = (...arg: any) => any;

type Crumb = [React.ReactNode, CancelFunc];

const CrumbCtx = createContext<Crumb[]>([]);

// 面包屑生成
const useCrumbs = (crumb: Crumb, title: React.ReactNode) => {
  const crumbCtx = useContext(CrumbCtx);

  const crumbs = useMemo(() => {
    const tmp = [...crumbCtx];
    crumb && tmp.push(crumb);
    return tmp;
  }, [crumb, crumbCtx]);

  const crumbElement = useMemo(() => {
    const ary = [...crumbs, [title, noop] as Crumb];

    const doFn = (i: number) => {
      let j = ary.length - 1;
      while (j >= i) {
        ary[j][1]();
        j--;
      }
    };

    return (
      <div className='max-modal-crumbs'>
        {ary.map(([txt], i) => {
          return (
            <span className='crumb-item' key={i}>
              <strong onClick={() => doFn(i)}>{txt}</strong>
              {i >= ary.length - 1 ? null : <GsIcon type='arrow-right' />}
            </span>
          );
        })}
      </div>
    );
  }, [crumbs, title]);

  return { crumbs, crumbElement };
};

type MaxModalProps = {
  title: React.ReactNode;
  crumb: Crumb;
  visible: boolean;
  children?: React.ReactNode;
};

export const MaxModal: React.FC<MaxModalProps> = ({
  visible,
  children,
  crumb,
  title,
}) => {
  const { crumbElement, crumbs } = useCrumbs(crumb, title);
  const rootContent = useEl('#rootContent');

  return createPortal(
    <Fade in={visible}>
      <div className='max-modal'>
        {crumbElement}
        <div className='max-modal-body'>
          <div className='max-modal-content'>
            <CrumbCtx.Provider value={crumbs}>{children}</CrumbCtx.Provider>
          </div>
          <Copyright />
        </div>
      </div>
    </Fade>,
    rootContent!,
  );
};
