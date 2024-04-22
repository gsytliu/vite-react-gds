import { useLayoutEffect, useState } from 'react';
import { useSize, useThrottleEffect } from 'ahooks';
import { useEl } from '@/hooks';

export const useScrollY = (ctrl: boolean, pag: any, dataSource: any[]) => {
  const [y, setY] = useState(0);
  const viewEl = useEl<HTMLDivElement>('.main-view');
  const tableEl = useEl('.table-common');
  const viewSize = useSize(viewEl);
  const theadSize = useSize(() => document.querySelector('.ant-table-thead'));
  const winSize = useSize(() => document.body);
  // padding bottom + footer height + pagination height (maybe)
  const minusHeight = 40 + 36 + (pag ? 56 : 0);

  useThrottleEffect(
    () => {
      const rect = tableEl?.getBoundingClientRect();
      if (rect && winSize && viewSize && theadSize) {
        const y =
          winSize.height -
          rect.top -
          theadSize.height -
          minusHeight -
          (winSize.width < 1280 ? 6 : 0);

        setY(y);
      }
    },
    [minusHeight, tableEl, theadSize, viewSize, winSize, dataSource.length],
    {
      wait: 80,
    },
  );

  useLayoutEffect(() => {
    ctrl && viewEl && (viewEl.style.overflowY = 'hidden');
    return () => {
      ctrl && viewEl && (viewEl.style.overflowY = 'initial');
    };
  }, [ctrl, viewEl, y]);

  return ctrl ? y : 0;
};
