import React, {useEffect, useState} from 'react';

export default function usePersistedState(defaultValue,key) {
    //console.log(defaultValue)
    const [state, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    //console.log(state)
    return [state, setState];
  }