import { useEffect, useCallback } from 'react';
import { useTableCommon } from '@/hooks';
import { Table } from 'antd';
import API from '@/api';

const SIP = () => {
  const {
    tableProps,
    setDataSource,
    stopLoading,
    pageSize,
    curPage,
    setTotal,
  } = useTableCommon({
    rowKey: 'id',
    rs: true,
    ctrl: true,
    pag: true,
  });

  const getList = useCallback(() => {
    return API.getList(curPage, pageSize)
      .then((data) => {
        setTotal(data.total);
        setDataSource(data.list);
      })
      .finally(() => {
        stopLoading();
      });
  }, [curPage, pageSize, setDataSource, setTotal, stopLoading]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Table {...tableProps}>
      <Table.Column
        title='Name'
        key='name'
        dataIndex='name'
        sorter={true}
      ></Table.Column>
      <Table.Column title='Age' key='age' dataIndex='age'></Table.Column>
    </Table>
  );
};

export default SIP;
