import Typed, { TypedOptions } from 'typed.js';
import { useRef, useEffect } from 'react';

export function TypedText({
  options = {},
  ...props
}: {
  options: TypedOptions;
} & Record<any, any>) {
  const el = useRef(null);
  const conf: TypedOptions = {
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    cursorChar: '|',
    ...options
  };
  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, conf);
      return () => typed.destroy();
    }
  }, [el]);
  return <div ref={el} {...props}></div>;
}
