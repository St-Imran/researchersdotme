"use client";

import React from 'react'

const Title = (props) => {
  return (
    <div className='pageTitle' style={{backgroundImage:`url(${props.img})`}}>{props.text}</div>
  )
}

export default Title