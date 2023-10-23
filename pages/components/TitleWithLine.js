import React from 'react'

const TitleWithLine = ({ title }) => {
  return (
    <div className='title-with-line'>
      <h1>{title}</h1>
      <div className='horizontal-line'></div>
    </div>
  )
}

export default TitleWithLine
