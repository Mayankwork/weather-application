import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import { BASE_URL, SEARCH_SUGGESTIONS, API_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SearchComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const searchCache = useSelector((store) => store.search);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getSearchSuggestions = async () => {
    if (inputValue == "" || !inputValue) return;
    const data = await fetch(
      BASE_URL +
        SEARCH_SUGGESTIONS +
        API_KEY +
        "&q=" +
        inputValue +
        "&language=en-us"
    ).catch((error) => {
      toast("something went wrong");
    });
    const json = await data.json();
    setSuggestions(json.splice(0, 5));

    dispatch(cacheResults({ [inputValue]: json.splice(0, 5) }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[inputValue]) {
        setSuggestions(searchCache[inputValue]);
      } else {
        getSearchSuggestions();
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);
  const handleNavigate = (info) => {
    console.log(info);
    navigate(
      "/weather-info?key=" +
        info.Key +
        "&name=" +
        info.LocalizedName +
        "," +
        info.Country.LocalizedName
    );
  };
  return (
    <>
      <Form>
        <Form.Control
          type="text"
          placeholder="Enter City Name"
          value={inputValue}
          onChange={handleInputChange}
          className="text-center"
        />
        {suggestions && suggestions.length > 0 && (
          <ul ref={suggestionsRef} className="list">
            {suggestions.map((suggestion, index) => (
              <React.Fragment key={suggestion.Key}>
                <li
                  className="item"
                  onClick={() => {
                    handleNavigate(suggestion);
                  }}
                >
                  {suggestion.LocalizedName}
                </li>
              </React.Fragment>
            ))}
          </ul>
        )}
      </Form>
      <ToastContainer />
    </>
  );
};

export default SearchComponents;
