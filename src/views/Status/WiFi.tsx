import { msg, MaxModal } from '@/components';
import { $fm } from '@/intl';
import { useDefineStore } from '@/store';
import { useEffect, useState } from 'react';

const WiFi = () => {
  const { define, setDefine } = useDefineStore();
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const [v3, setV3] = useState(false);

  useEffect(() => {
    msg.terror('444');
  }, []);

  return (
    <div
      onClick={() =>
        setDefine({ role: define.role === 'admin' ? 'user' : 'admin' })
      }
    >
      WiFi
      <span onClick={() => setV1(true)}>open v1</span>
      <MaxModal
        title='LvL1'
        visible={v1}
        crumb={[
          $fm('STATUS'),
          () => {
            setV1(false);
          },
        ]}
      >
        <span onClick={() => setV2(true)}>open v2</span>
        <div style={{ height: 1000 }}></div>
        <MaxModal
          title='LvL2'
          visible={v2}
          crumb={[
            'LvL1',
            () => {
              setV2(false);
            },
          ]}
        >
          <span onClick={() => setV3(true)}>open v3</span>
          <MaxModal
            title='LvL3'
            visible={v3}
            crumb={[
              'LvL2',
              () => {
                setV3(false);
              },
            ]}
          >
            123123
          </MaxModal>
        </MaxModal>
      </MaxModal>
    </div>
  );
};

export default WiFi;
