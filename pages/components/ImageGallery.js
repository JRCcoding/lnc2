import Image from 'next/image'
import React from 'react'
import TitleWithLine from './TitleWithLine'

const ImageGallery = ({ products, category }) => {
  const width = 260
  const aspectRatio = 3 / 4
  const height = Math.round(width / aspectRatio)
  return (
    <div>
      <h1
        style={{
          textShadow: '2px 2px 15px gray',
          color: 'var(--purple)',
          textAlign: 'center',
        }}
      >
        <TitleWithLine title={category} />
      </h1>
      {products &&
        products.map((product, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 55,
              alignItems: index % 2 === 0 ? 'end' : 'start',
            }}
          >
            <h3>{product.title}</h3>
            <Image
              src={product.image}
              alt={product.title}
              height={height}
              width={width}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
    </div>
  )
}

export default ImageGallery
