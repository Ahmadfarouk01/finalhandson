import { createContext, useContext, useEffect, useState } from "react";
import { getApplicants } from "../api/applicants";

export const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  useEffect(() => {
    const loadApplicants = async () => {
      const data = await getApplicants();
      setApplicants(data);
    };

    loadApplicants();
  }, []);

  const value = {
    applicants,
    setApplicants,
    selectedApplicants,
    setSelectedApplicants
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);