import {createContext, useContext, useState} from 'react';

const TextInputContext = createContext();

export const useTextInputContext = () => {
  return useContext(TextInputContext);
};

export const TextInputProvider = ({children}) => {
  const [textInputValue, setTextInputValue] = useState('');

  const setInputTextValue = text => {
    setTextInputValue(text);
  };

  const contextValue = {
    textInputValue,
    setInputTextValue,
  };

  return (
    <TextInputContext.Provider value={contextValue}>
      {children}
    </TextInputContext.Provider>
  );
};

export default TextInputContext;
