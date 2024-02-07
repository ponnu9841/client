import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
	"/images/banner/banner-1.webp",
	"/images/banner/banner-2.webp",
	"/images/banner/banner-3.webp",
];

export default function Banner() {
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <></>,
		prevArrow: <></>,
	};

	return (
		<Slider {...settings}>
			{images?.map((item, index) => (
				<img src={item} alt="" key={index} className="max-w-full" />
			))}
		</Slider>
	);
}
