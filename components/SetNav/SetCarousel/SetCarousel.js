import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export default function SetCarousel({ generateSetCarouselCards }) {
  const config = {
    showArrows: true,
    showStatus: false,
    showIndicators: true,
    autoPlay: true,
    showThumbs: false,
    stopOnHover: true,
    infiniteLoop: true,
    thumbWidth: 250,
    interval: 5000,
    transitionTime: 500,
    centerMode: true,
    centerSlidePercentage: 80,
  }
  return (
    <Carousel className="shadow-xl z-40" {...config}>
      {generateSetCarouselCards()}
    </Carousel>
  )
}
