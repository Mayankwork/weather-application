import React, { useEffect, lazy, Suspense } from "react";
import Card from "react-bootstrap/Card";
import arrow from "../assets/arrow.PNG";
import { useState } from "react";
import location from "../assets/location.PNG";
import meter from "../assets/meter.PNG";
import drop from "../assets/drop.PNG";
import { CITY } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { BASE_URL, API_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const WeatherInfo = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const city_key = searchParams.get("key");
  const city_name = searchParams.get("name");
  const [imageName, setImageName] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (city_key == null || !city_key) {
      navigate("/");
    }

    console.log(city_key);
    weatherdata();
  }, []);

  const weatherdata = async () => {
    const data = await fetch(
      BASE_URL + CITY + city_key + "?apikey=" + API_KEY + "&details=true"
    ).catch((error) => {});
    const json = await data.json();
    setWeather(json[0]);
    setImageName(`../images/icons/` + json[0].WeatherIcon + ".svg");
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {weather && (
          <Card className="weather-card">
            <Card.Header className="weather-title">
              <span>
                <img
                  onClick={() => navigate("/")}
                  src={arrow}
                  height={"18px"}
                  alt="image"
                />
              </span>{" "}
              Weather App
            </Card.Header>
            <Card.Body style={{ padding: "0px", paddingInline: "13px" }}>
              <img height={"120px"} src={imageName} className="w-100" />

              <div className="text-center" style={{ fontSize: "50px" }}>
                <b>{weather.Temperature.Metric.Value} &#8451;</b>
              </div>
              <div className="text-center mb-1 " style={{ fontWeight: "620" }}>
                {weather.WeatherText}
              </div>
              <div className="text-center mb-3" style={{ fontWeight: "620" }}>
                {" "}
                <span>
                  <img
                    src={location}
                    height={"18px"}
                    className="mx-2"
                    alt="image"
                  />
                </span>
                {city_name}
              </div>
              <div className="row">
                <div
                  className="col-6 "
                  style={{
                    borderTop: "1px solid ",
                    borderColor: "gray",
                    borderRight: "1px solid gray",
                  }}
                >
                  <div className="flex justify-content-center align-items-center">
                    <div className="d-flex">
                      <img
                        src={meter}
                        height={"50px"}
                        alt="image"
                        className="m-2"
                      />
                      <div>
                        <div
                          style={{
                            height: "30px",
                            paddingTop: "5px",
                            fontSize: "16px",
                          }}
                        >
                          <b> {weather.ApparentTemperature.Metric.Value} </b>
                          &#8451;
                        </div>
                        <div style={{ height: "10px" }}>Feels like</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-6"
                  style={{ borderTop: "1px solid ", borderColor: "gray" }}
                >
                  <div className="flex justify-content-center align-items-center">
                    <div className="d-flex">
                      <img
                        src={drop}
                        height={"50px"}
                        alt="image"
                        className="m-2"
                      />
                      <div>
                        <div
                          style={{
                            height: "30px",
                            paddingTop: "5px",
                            fontSize: "16px",
                          }}
                        >
                          <b>{weather.RelativeHumidity}</b> %
                        </div>
                        <div style={{ height: "10px" }}>Humidity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </Suspense>
    </>
  );
};

export default WeatherInfo;
