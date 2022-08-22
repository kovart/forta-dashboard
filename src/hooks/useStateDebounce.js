import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

function useStateDebounce(initValue, { wait = 400 } = {}) {
  const [value1, setValue1] = useState(initValue);
  const [value2, setValue2] = useState(initValue);

  const setValue2Debounced = useMemo(
    () => debounce(setValue2, wait),
    [setValue2]
  );

  const setValue = (val) => {
    setValue1(val);
    setValue2Debounced(val);
  };

  return [value1, value2, setValue];
}

export default useStateDebounce;
