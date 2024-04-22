import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, Input } from 'antd';
import { useBoolean, useClickAway } from 'ahooks';
import { GsIcon } from '@/components';
import { useGetAccess } from '@/hooks';
import { TEMPLATE } from '@/template';
import { useSearchStore } from '@/store';
import { IconMap } from '../RootSider';
import { $t } from '@/intl';
import { wait } from '@/utils/tools';

type TlItem = {
  lvl?: string;
  lang: string;
  access?: AccessType;
  sub?: TlItem[];
  name?: string;
};

type SearchResult = {
  [i: string]: { title: string; path: string; item: TlItem }[];
};

const SearchPopover: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { setTarget } = useSearchStore();
  const navigate = useNavigate();
  const { getAccess } = useGetAccess();
  const [result, setResult] = useState<SearchResult>({});
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const resArray = useMemo(() => {
    const keys = Object.keys(result);
    return keys.map((k) => ({
      i: k,
      list: result[k],
    }));
  }, [result]);

  const handeJump = (path: string, item: TlItem) => {
    onClose();
    navigate(path);
    wait(300).then(() => {
      setTarget(item);
    });
  };

  const doSearch = (e: any) => {
    if (e.keyCode !== 13) return false;
    const keyword = e.target.value;
    if (!keyword) return false;
    const keywordReg = new RegExp(`(${keyword})`, 'ig');
    const tmp: SearchResult = {};

    // 是否match
    const isMatch = (lang: string) => {
      return (
        $t(lang)
          .toLocaleLowerCase()
          .indexOf(keyword.trim().toLocaleLowerCase()) >= 0
      );
    };

    // 构建结果
    const buildResItem = (item: TlItem, title: string[], path: string[]) => {
      let _title = title.filter((t) => t).map((t) => $t(t));
      const matchedTitle = $t(item.lang).replace(keywordReg, '<span>$1</span>');
      _title.push(matchedTitle);

      return {
        path: '/' + path.filter((p) => p).join('/'),
        title: _title.join(' > '),
        item,
      };
    };

    const find = (tl: TlItem[], path: string[] = [], title: string[] = []) => {
      for (let i = 0; i < tl.length; i++) {
        let item = tl[i];
        // 如果没有权限
        if (!getAccess(item.access)) {
          if (i === tl.length - 1) {
            path.pop();
            title.pop();
          }
          continue;
        }

        // 如果是页面级别
        if (item.lvl) {
          // 二级菜单 Tab页面级别也需要被搜索到
          if (path.length > 0 && isMatch(item.lang)) {
            let title0 = title[0];
            if (!(title0 in tmp)) {
              tmp[title0] = [];
            }
            tmp[title0].push(buildResItem(item, title, [...path!, item.lvl]));
          }
          if (item.sub && item.sub.length > 0) {
            title.push(item.lang);
            path.push(item.lvl);
            find(item.sub, path, title);
          }
        } else {
          // 进行匹配
          if (isMatch(item.lang)) {
            let title0 = title[0];
            if (!(title0 in tmp)) {
              tmp[title0] = [];
            }
            tmp[title0].push(buildResItem(item, title, path));
          }
        }
        // 遍历到最后时跳出该递归了，需要回退一个位置
        if (i === tl.length - 1) {
          path.pop();
          title.pop();
        }
      }
    };

    find(TEMPLATE as TlItem[]);

    setResult(tmp);
    setSearched(true);
  };

  return (
    <div className='search-popover-content'>
      <div className='search-input'>
        <Input ref={inputRef} allowClear onKeyDown={doSearch} />
      </div>
      {resArray.length > 0 ? (
        <div className='search-result'>
          {resArray.map(({ i, list }) => (
            <div key={i}>
              <h5>
                <GsIcon type={IconMap[i]} />
                {$t(i)}
              </h5>
              {list.map(({ title, item, path }, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: title }}
                  onClick={() => handeJump(path, item)}
                ></p>
              ))}
            </div>
          ))}
        </div>
      ) : searched ? (
        <div className='no-match-tip'>无搜索结果</div>
      ) : null}
    </div>
  );
};

export const SearchBox: React.FC = () => {
  const dom = useRef<HTMLSpanElement>(null);
  const [open, { setFalse, setTrue }] = useBoolean(false);
  useClickAway(() => {
    setFalse();
  }, dom);

  return (
    <span className='header-search-btn' ref={dom}>
      <Popover
        trigger='click'
        placement='bottomRight'
        overlayClassName='search-popover'
        transitionName='ant-fade'
        arrowPointAtCenter
        open={open}
        content={<SearchPopover onClose={setFalse} />}
        getPopupContainer={(e) => e.parentElement!}
      >
        <GsIcon type='search' className='icon-search' onClick={setTrue} />
      </Popover>
    </span>
  );
};
