import React from 'react';

type FormSubTitleProps = {
  children?: React.ReactNode;
  tip?: React.ReactNode;
  title?: React.ReactNode;
};

export const FormSubTitle: React.FC<FormSubTitleProps> = ({
  children,
  title,
  tip,
}) => {
  return (
    <div className='form-sub-title'>
      <span className='title-main'>{title || children}</span>
      {tip ? <span className='title-tip'>{tip}</span> : null}
    </div>
  );
};
