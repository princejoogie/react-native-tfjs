import React, { useState, useEffect, createContext } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await tf.ready();
      const res = await mobilenet.load();
      setModel(res);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <DataContext.Provider value={{ model, loading, dm: [isDark, setIsDark] }}>
      {children}
    </DataContext.Provider>
  );
};
