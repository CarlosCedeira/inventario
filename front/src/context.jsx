import React, { createContext, useContext, useState } from "react";

const ContadorContext = createContext();

export function useContadorContext() {
  return useContext(ContadorContext);
}

export function ContadorProvider({ children }) {
  const [contador, setContador] = useState(0);

  return (
    <ContadorContext.Provider value={{ contador, setContador }}>
      {children}
    </ContadorContext.Provider>
  );
}
