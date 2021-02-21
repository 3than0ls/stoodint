import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel as ReactCarousel } from 'react-responsive-carousel'

export default function Carousel({ generateCarouselCards }) {
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
  }
  return (
    <ReactCarousel className="shadow-lg z-40 sm:h-72 xl:h-96 mb-4" {...config}>
      {generateCarouselCards()}
    </ReactCarousel>
  )
}
