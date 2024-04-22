import { useEffect } from 'react';
import { Form } from 'antd';
import {
  PwItem,
  SelectItem,
  CheckboxItem,
  CheckboxGroupItem,
} from '@/components';
import { useFormCommon } from '@/hooks';

interface Fields {
  P271: string;
  P333: '0' | '1';
  P400: string;
}

const Eth = () => {
  const { tl, formProps, initFields, stopLoading } = useFormCommon<
    Fields,
    'P271' | 'P333' | 'P400'
  >('status.eth');

  useEffect(() => {
    setTimeout(() => {
      initFields({
        P271: '123',
        P333: '0',
        P400: 'DAF',
      });
      stopLoading();
    }, 2000);
  }, [initFields, stopLoading]);

  return (
    <Form
      {...formProps}
      onFieldsChange={(v) => {
        console.log(v);
      }}
    >
      <PwItem
        {...tl.P271}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <SelectItem {...tl.P333} />
      <CheckboxGroupItem {...tl.P333} />
      <CheckboxItem {...tl.P400} onChange={(v) => console.log(v)} />
    </Form>
  );
};

export default Eth;
