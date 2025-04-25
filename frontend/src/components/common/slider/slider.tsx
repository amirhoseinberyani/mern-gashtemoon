import React, { Component, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Grid, IconButton, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import './slider.css'
import { Box } from '@mui/system'
import ArrowLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRight'
import { API } from 'config'

interface SimpleSlidersProps {
  slides: {
    title: String
    image: String
  }[]
}

const Slide = (props: any) => {
  return (
    <Grid container direction='column'>
      <img
        src={props.image}
        width='99%'
        height='100%'
        style={{ margin: 'auto', borderRadius: 10 }}
        alt={props.title}
      />
    </Grid>
  )
}
export default function SimpleSlider({ slides }: SimpleSlidersProps) {
  const settings = {
    dots: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowLeftIcon />,
    prevArrow: <ArrowRightIcon />,
  }
  const sliderRef = useRef<any>()
  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => {
          return (
            <Grid key={index}>
              {/* <Slide image={`${API.BASE_URL}${slide}_md.png`} title="slide" /> */}
              <Slide image={`${API.BASE_URL}${slide}_org.png`} title='slide' />
            </Grid>
          )
        })}
      </Slider>
      <Box position='absolute' top='40%' left={0}>
        <IconButton
          onClick={() => {
            if (sliderRef) {
              sliderRef.current.slickPrev()
            }
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </Box>
      <Box position='absolute' top='40%' right={0}>
        <IconButton
          onClick={() => {
            if (sliderRef) {
              sliderRef.current.slickNext()
            }
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </>
  )
}
