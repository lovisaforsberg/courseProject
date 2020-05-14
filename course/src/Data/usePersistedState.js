import React, {useEffect, useState} from 'react';

export default function usePersistedState(key, defaultValue) {
    console.log(key)
    console.log(defaultValue)
    const [state, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }