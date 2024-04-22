import { Layout } from 'antd';
import logo from '@/assets/images/logo.png';
// import { LocaleSelect } from '@/components';
import { SearchBox } from './SearchBox';
import { RoleMenu } from './RoleMenu';
import './index.less';

const { Header } = Layout;

const RootHeader: React.FC = () => {
  return (
    <Header className='root-header'>
      <div className='header-logo'>
        <img src={logo} alt='gs' />
        <span>GS Project</span>
      </div>
      <div className='header-main'>
        <div className='header-item'>
          <RoleMenu />
        </div>
        {/* <div className='header-item'>
          <LocaleSelect />
        </div> */}
        <span className='header-item-split'></span>
        <div className='header-item'>
          <SearchBox />
        </div>
      </div>
    </Header>
  );
};

export default RootHeader;
