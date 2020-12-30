import React, { useState, createContext } from "react";

export const DaftarBuahContext = createContext();

export const DaftarBuahProvider = props => {
  const [daftarBuah, setDaftarBuah] = useState({
    lists: null,
    selectedId: 0,
    statusForm: "create"
  });

  return (
    <DaftarBuahContext.Provider value={[daftarBuah, setDaftarBuah]}>
      {props.children}
    </DaftarBuahContext.Provider>
  );
};
