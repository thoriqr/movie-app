/* eslint-disable react/prop-types */
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../../api/themoviedbApi";

const Genres = ({ setSelectedGenres, mediaType }) => {
  const { data: genres } = useQuery({
    queryFn: () => getGenres({ mediaType }),
    queryKey: ["genres", mediaType],
  });

  const options = genres?.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const handleGenreChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions.map((option) => option.value));
  };

  return (
    <div className="">
      <Select
        key={mediaType} // indication for resetting genre name if mediaType is changing
        isMulti
        name="genres"
        options={options}
        placeholder="Select genres"
        onChange={handleGenreChange}
        styles={{
          input: (base) => ({
            ...base,
            color: "#F5F9FF",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#D8A31A" : "",
            color: state.isSelected ? "#030712" : "#F5F9FF",
            ":hover": { backgroundColor: "#D8A31A", color: "#030712" },
          }),
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#F5F9FF" : "#9CA3Af",
            boxShadow: "none",
            backgroundColor: "black",
            color: "#F5F9FF",
            ":hover": { borderColor: "#F5F9FF" },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingRight: "20px",
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
          placeholder: (base) => ({
            ...base,
            color: "#F5F9FF",
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#D8A31A",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#030712",
            fontWeight: "600",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#030712",
            ":hover": { color: "initial" },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: "#9CA3Af",
            ":hover": { color: "#F5F9FF" },
            cursor: "pointer",
          }),
          noOptionsMessage: (base) => ({
            ...base,
            color: "#F5F9FF",
            fontStyle: "italic",
          }),
        }}
      />
    </div>
  );
};

export default Genres;
