import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {
  CITY_BY_LOCATION,
  BASE_URL,
  PARAM_FOR_LOCATION,
  API_KEY,
} from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetDeviceLocation = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported on this device.");
    }
  };

  useEffect(() => {
    if (location) {
      cityData();
    }
  }, [location]);

  const cityData = async () => {
    const data = await fetch(
      BASE_URL +
        CITY_BY_LOCATION +
        API_KEY +
        "&q=" +
        location.latitude +
        "," +
        location.longitude +
        PARAM_FOR_LOCATION
    )
      .then((info) => {
        const res = async () => {
          const val = await info.json();
          console.log(val.LocalizedName + "," + val.Country.LocalizedName);
          console.log(val.Key);
          navigate(
            "/weather-info?key=" +
              val.Key +
              "&name=" +
              val.LocalizedName +
              "," +
              val.Country.LocalizedName
          );
        };
        res();
      })
      .catch((error) => {
        toast("Some Network Error Occured");
      });
  };

  return (
    <div className="mb-3">
      <Button
        className="get-device-location-button w-100 mt-2"
        onClick={handleGetLocation}
      >
        Get Location
      </Button>
      <ToastContainer />
    </div>
  );
};

export default GetDeviceLocation;
