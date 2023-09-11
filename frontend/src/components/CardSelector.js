import React from "react";
import Slider from "react-slick";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BankCard from "./BankCard";
import CreditCard from "./CreditCard";
import styles from "./styles.css";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "red",
      }}
      onClick={onClick}
    >
      <ArrowBackIosRoundedIcon></ArrowBackIosRoundedIcon>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const CardSelector = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      <div>
        <CreditCard
          cardnumber={"4321123412341234"}
          cardname={"Morgan Bush"}
          carddate={"09/30"}
          cardcvc={"454"}
        />
      </div>
      <div>
        <CreditCard
          cardnumber={"4321123412341234"}
          cardname={"Morgan Bush"}
          carddate={"09/30"}
          cardcvc={"454"}
          chosen={true}
        />
      </div>
      <div>
        <CreditCard
          cardnumber={"4321123412341234"}
          cardname={"Morgan Bush"}
          carddate={"09/30"}
          cardcvc={"454"}
        />
      </div>
    
    </Slider>
  );
};

export default CardSelector;
