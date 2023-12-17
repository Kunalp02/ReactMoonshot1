import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    sdate: "",
    edate: "",
  });
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://retoolapi.dev/hSWuL1/data");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        filters,
        setFilters,
        filteredData,
        setFilteredData,
        selectedFeature,
        setSelectedFeature, 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
