import { useContext } from "react";
import { DataContext } from "./DataContext";

const FilterComponent = () => {
  const { filters, setFilters } = useContext(DataContext);

  const handleFilterChange = (filterType, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: filterValue,
    }));
  };

  return (
    <div>
      <label>Age:</label>
      <select
        value={filters.age}
        onChange={(e) => handleFilterChange("age", e.target.value)}
      >
        <option value="">All</option>
        <option value="15-25">15-25</option>
        <option value=">25">`&gt25`</option>
      </select>

      <label>Gender:</label>
      <select
        value={filters.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label>Start Date : </label>

      <input
        type="date"
        name="start-date"
        placeholder="Start Date"
        value={filters.sdate}
        onChange={(e) => handleFilterChange("sdate", e.target.value)}
      />

      <label>End Date : </label>
      <input
        type="date"
        name="end-date"
        placeholder="End Date"
        value={filters.edate}
        onChange={(e) => handleFilterChange("edate", e.target.value)}
      />
    </div>
  );
};

export default FilterComponent;
