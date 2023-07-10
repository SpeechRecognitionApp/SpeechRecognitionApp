import React from "react";
import Slider from "react-slick";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";

// 导入 slick-carousel 的 CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BankCard from "./BankCard";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
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
        <BankCard />
      </div>
      <div>
        <BankCard />
      </div>
      <div>
        <BankCard />
      </div>
      {/* Add more Card components for each card */}
    </Slider>
  );
};

export default CardSelector;
