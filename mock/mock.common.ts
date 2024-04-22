import { defineMock } from 'vite-plugin-mock-dev-server';
import Mock from 'mockjs';

export default defineMock([
  {
    url: '/api/login',
    body: {
      code: 200,
      msg: 'success',
      data: {
        token: 'a(?@!#bd/efge',
        username: 'user',
        firstLogin: 1,
        errorCode: 3,
        retryTimes: parseInt('' + Math.random() * 10),
        lockTime: 10,
      },
    },
  },

  {
    url: '/api/list',
    delay: 100,
    body: () => {
      return {
        code: 200,
        msg: 'success',
        data: Mock.mock({
          'total|200-205': 200,
          'list|10': [
            {
              'id|+1': 1,
              name: '@string',
              age: '@integer(10,100)',
            },
          ],
        }),
      };
    },
  },
]);
