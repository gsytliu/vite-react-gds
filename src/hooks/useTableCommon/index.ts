import React, { useMemo, useState, useCallback } from 'react';
import { type TableProps, type PaginationProps } from 'antd';
import { useContentLoading } from '@/store';
import msg from '@/components/msg';
import { useScrollY } from './useScrollY';

type Key = React.Key;

type RowSelection<T> = TableProps<T>['rowSelection'];

export type Options<RecordType> = {
  rowKey?: string;
  ctrl?: boolean;
  rs?: RowSelection<RecordType> | boolean;
  pag?: PaginationProps | boolean;
  scrollY?: number;
  scrollX?: number;
};

export const useTableCommon = <R = any>(
  options: Options<R> = {},
  loading = true,
) => {
  const { startLoading, stopLoading } = useContentLoading(loading);
  const [dataSource, setDataSource] = useState<R[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const {
    rowKey = 'key',
    rs = true,
    pag = true,
    ctrl = true,
    scrollX,
    scrollY,
  } = options;

  // 选择
  const rowSelection = useMemo(() => {
    if (!rs) {
      return undefined;
    }
    const _rs: RowSelection<R> = {
      selectedRowKeys: selected,
      onChange: (keys) => {
        setSelected(keys);
      },
    };

    if (typeof rs === 'object') {
      Object.assign(_rs, rs);
    }

    return _rs;
  }, [rs, selected]);

  const pagination = useMemo(() => {
    if (!pag) {
      return false;
    }

    const _pag: PaginationProps = {
      total,
      current: curPage,
      pageSize,
      pageSizeOptions: [1, 10, 20, 30, 40, 50],
      showSizeChanger: true,
      showLessItems: false,
      hideOnSinglePage: false,
      showQuickJumper: {
        goButton: true,
      },
      showTotal: (total) => `Total: ${total}`,
      onChange: (page, pageSize) => {
        setCurPage(page);
        setPageSize(pageSize);
        setSelected([]);
      },
    };

    if (typeof pag === 'object') {
      Object.assign(_pag, pag);
    }
    return _pag;
  }, [pag, curPage, pageSize, total]);

  const y = useScrollY(ctrl, pag, dataSource);

  const tableProps: TableProps<R> = useMemo(() => {
    const _scroll: TableProps<R>['scroll'] = y ? { y } : {};
    // 如果设置scrollY 则覆盖ctrl, ctrl无效
    if (scrollY) {
      _scroll.y = scrollY;
    }
    if (scrollX) {
      _scroll.x = scrollX;
    }
    return {
      className: 'table-common',
      tableLayout: 'fixed',
      rowKey,
      dataSource,
      rowSelection,
      pagination,
      scroll: _scroll,
      showSorterTooltip: false,
    };
  }, [dataSource, pagination, rowKey, rowSelection, scrollX, scrollY, y]);

  const msgSuccess = useCallback((txt: React.ReactNode) => {
    msg.tsuccess(txt);
  }, []);

  const msgFail = useCallback((txt: React.ReactNode) => {
    msg.terror(txt);
  }, []);

  return {
    dataSource,
    setDataSource,
    selected,
    setSelected,
    curPage,
    setCurPage,
    pageSize,
    setPageSize,
    total,
    setTotal,
    tableProps,
    msgSuccess,
    msgFail,
    startLoading,
    stopLoading,
  };
};
