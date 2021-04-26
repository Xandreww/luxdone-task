import { TextField } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import debounce from "lodash.debounce";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((inputValue) => {
        setDebouncedValue(inputValue);
      }, 1000),
    [setDebouncedValue]
  );

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search for gifs" onChange={handleChange} value={searchValue} />
      </form>
      <p>{debouncedValue}</p>
    </>
  );
};

export default Search;
