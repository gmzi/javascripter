import axios from 'axios';
import uuid from 'uuid';
import React, { useState } from 'react';

const useFlip = (initialState = true) => {
  const [state, setState] = useState(initialState);

  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
};

const useAxios = (url) => {
  const [obj, setObj] = useState([]);

  const addObjToArray = async (name) => {
    if (name.length > 0) {
      url = `${url}/${name}`;
    }

    const res = await axios.get(url);
    setObj((obj) => [...obj, { ...res.data, id: uuid() }]);
  };

  const removeAll = () => {
    setObj((obj) => []);
  };

  return [obj, addObjToArray, removeAll];
};

export { useFlip, useAxios };
