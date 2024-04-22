import { useRef, cloneElement } from 'react';
import { Transition } from 'react-transition-group';

const duration = 240;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

type TrProps = {
  className?: string;
  children: React.ReactNode;
  in: boolean;
};

export const Fade: React.FC<TrProps> = ({ in: inProp, children }) => {
  const nodeRef = useRef(null);
  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      appear={inProp}
      timeout={duration}
      unmountOnExit
    >
      {(state) => {
        // 为了少加一层div
        const el =
          children !== null &&
          typeof children === 'object' &&
          !(Symbol.iterator in children) ? (
            children
          ) : (
            <div>{children}</div>
          );
        return cloneElement(el, {
          ref: nodeRef,
          style: {
            ...defaultStyle,
            ...transitionStyles[state],
          },
        });
      }}
    </Transition>
  );
};
