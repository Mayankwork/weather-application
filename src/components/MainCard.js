import React from "react";
import Card from "react-bootstrap/Card";
import SearchComponents from "./SearchComponents";
import GetDeviceLocation from "./GetDeviceLocation";
import Divider from "./Divider";

const MainCard = () => {
  return (
    <>
      <Card className="weather-card">
        <Card.Header className="weather-title">Weather App</Card.Header>
        <Card.Body>
          <SearchComponents />
          <Divider />
          <GetDeviceLocation />
        </Card.Body>
      </Card>
    </>
  );
};

export default MainCard;
