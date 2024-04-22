import { useRef, useMemo, useCallback } from 'react';
import { Form, type FormProps } from 'antd';
import { useContentLoading } from '@/store';
import { deepClone, noop } from '@/utils/tools';
import msg from '@/components/msg';

export type Fields = Record<string, any>;

export const useFormCore = <F extends Fields = Fields>(
  defValue = {} as F,
  initLoading = true,
) => {
  const { startLoading, stopLoading } = useContentLoading(initLoading);
  const [form] = Form.useForm<F>();
  const INIT_VALUE = useRef<F>();
  const DEF_VALUE = useRef<F>(defValue);

  // 通用属性
  const formProps: FormProps = useMemo(
    () => ({
      className: 'form-common',
      labelAlign: 'left',
      form: form,
      initialValues: DEF_VALUE.current,
    }),
    [form],
  );

  // 初始化
  const initFields = useCallback(
    (fields: F) => {
      INIT_VALUE.current = fields;
      form.setFieldsValue(deepClone(fields));
    },
    [form],
  );

  // 监听值
  const useField = (name: keyof F) => {
    return Form.useWatch(name, form);
  };

  // 重置
  const resetFields = useCallback(() => {
    if (INIT_VALUE.current) {
      form.setFieldsValue(deepClone(INIT_VALUE.current));
    }
  }, [form]);

  const validateFields = useCallback(
    (succ = noop as (values: Partial<F>) => void, fail = noop) => {
      return form.validateFields().then(succ).catch(fail);
    },
    [form],
  );

  const msgSuccess = useCallback((txt: React.ReactNode) => {
    msg.tsuccess(txt);
  }, []);

  const msgFail = useCallback((txt: React.ReactNode) => {
    msg.terror(txt);
  }, []);

  return {
    form,
    INIT_VALUE,
    initFields,
    resetFields,
    validateFields,
    startLoading,
    stopLoading,
    formProps,
    msgSuccess,
    msgFail,
    gfv: form.getFieldValue,
    sfv: form.setFieldValue,
    useField,
  };
};
