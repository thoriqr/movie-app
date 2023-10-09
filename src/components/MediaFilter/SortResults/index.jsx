/* eslint-disable react/prop-types */
import Select from "react-select";

const SortResults = ({ mediaType, setSortBy }) => {
  const options = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
  ];

  const handleMediaFilter = (selectedFilter) => {
    setSortBy(selectedFilter.value);
  };

  return (
    <Select
      key={mediaType}
      name="sortBy"
      options={options}
      defaultValue={options[0]}
      onChange={handleMediaFilter}
      styles={{
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "#D8A31A" : "",
          color: state.isSelected ? "#030712" : "#F5F9FF",
          ":hover": { backgroundColor: "#D8A31A", color: "#030712" },
        }),
        control: (base, state) => ({
          ...base,
          width: "100%",
          borderColor: state.isFocused ? "#F5F9FF" : "#9CA3Af",
          boxShadow: "none",
          backgroundColor: "black",
          color: "#F5F9FF",
          ":hover": { borderColor: "#F5F9FF" },
          // "@media only screen and (min-width: 768px)": {
          //   ...base["@media only screen and (min-width: 768px)"],
          //   width: "50%",
          // },
        }),
        singleValue: (base) => ({
          ...base,
          color: "#F5F9FF",
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          cursor: "pointer",
          color: state.isFocused ? "#F5F9FF" : "#9CA3Af",
          ":hover": { color: "#F5F9FF" },
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor: "#030712",
          borderColor: "#9CA3Af",
          borderWidth: "1px",
          borderRadius: "2px",
          padding: "0",
        }),
      }}
    />
  );
};

export default SortResults;
