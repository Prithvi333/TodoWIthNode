import { useEffect, useRef, useState } from "react";

const useDebounce = (delay) => {
  const [reqFlag, setReqFlag] = useState(false);

  let { current } = useRef();

  current && clearTimeout(current);
  current = setTimeout(() => {
    setReqFlag(true);
  }, delay);

  return reqFlag;
};

export { useDebounce };
