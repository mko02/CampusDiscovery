import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import locations from "../../constants";
import { searchLocation } from "../../constants/helpers";
import * as Styled from "./LocationSearch.styled";

export function LocationSearch({ setSelectedLocation }) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleLocationClick = (location) => {
    console.log(location);
  };

  useEffect(() => {
    if (value && open) {
      setResults(searchLocation(value));
    } else if (value === "") {
      setResults([]);
    }
  }, [value]);

  function select(location) {
    setValue(location);
    setOpen(false);
    setResults([]);
    setSelectedLocation(location);
  }

  return (
    <div
      style={{ width: "100%", position: "relative" }}
      tabIndex={0}
      onFocus={() => {
        setOpen(true);
      }}
    >
      {open && results.length > 0 &&  (
        <Styled.ResultsContainer>
          <Styled.ResultsHeader>
            <IoCloseCircleOutline
              size={20}
              color={"#943734"}
              style={{
                position: "absolute",
                top: "5",
                right: "5",
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
            ></IoCloseCircleOutline>
            {results.length} result{results.length == 1 ? "" : "s"}
          </Styled.ResultsHeader>
          {results.map((location) => (
            <Styled.Result
              key={location.name}
              onClick={() => select(location.name)}
            >
              <Styled.ResultText>{location.name}</Styled.ResultText>
            </Styled.Result>
          ))}
        </Styled.ResultsContainer>
      )}
      <Styled.SearchContainer>
        <input
          onChange={(e) => {
            if (e.currentTarget.value != value) {
              setValue(e.currentTarget.value);
              setOpen(true);
              setSelectedLocation(undefined);
            }
          }}
          placeholder="Search Locations"
          value={value}
          style={{ margin: "auto" }}
        />
      </Styled.SearchContainer>
    </div>
  );
}
