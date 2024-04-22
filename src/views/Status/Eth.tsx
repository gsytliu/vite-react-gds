import { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  PwItem,
  SelectItem,
  CheckboxItem,
  CheckboxGroupItem,
  FormBtns,
  MiniModal,
  UnitItem,
} from '@/components';
import { useFormCommon } from '@/hooks';

type Fields = {
  P271: string;
  P333: string;
  P400: '0' | '1';
};

const Eth = () => {
  const { tl, formProps, initFields, stopLoading, useField, validateFields } =
    useFormCommon<Fields, keyof Fields | '_upload'>('status.eth');

  useEffect(() => {
    setTimeout(() => {
      initFields({
        P271: '123123',
        P333: '12',
        P400: '1',
      });
      stopLoading();
    }, 200);
  }, [initFields, stopLoading]);

  const P333 = useField('P333');

  console.log(P333);

  const [visi, setVisi] = useState(false);
  console.log(tl);
  return (
    <Form {...formProps}>
      <PwItem
        {...tl.P271}
        rules={[{ required: true }]}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <PwItem
        {...tl.P271}
        rules={[{ required: true }]}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <UnitItem {...tl._upload}>上传</UnitItem>
      <SelectItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxItem {...tl.P400} onChange={(v) => console.log(v)} />
      <FormBtns
        onOk={() => {
          validateFields((values) => {
            console.log(values);
          });
        }}
      />
      <span onClick={() => setVisi(true)}>open mini modal</span>
      <MiniModal title='1234' open={visi} onCancel={() => setVisi(false)} />
    </Form>
  );
};

export default Eth;
