import _axios from '@/utils/_axios';

export const login = (username: string, password: string) => {
  return _axios({
    method: 'POST',
    url: '/api/login',
    data: {
      username,
      password,
    },
  });
};

export const getList = (page, pageSize) => {
  return _axios({
    method: 'GET',
    url: '/api/list',
    params: {
      page,
      pageSize,
    },
  });
};
