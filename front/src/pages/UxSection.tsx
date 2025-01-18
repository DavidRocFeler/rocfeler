'use client'
import React from 'react'
import Infinity from '@/components/Infinitiy'
import ScrollListCard from '@/components/ScrollListCard'
import { titleCarruselCardHelpers } from '@/helpers/titleCarruselCard.helpers'
import { lazyFrameBehanceHelpers } from '@/helpers/LazyFrame.helpers'
import RenderFigmaWrapper from '@/components/RenderFigmaWrapper'

const UxSection: React.FC = () => {
  const titleCarruselFilterOne = titleCarruselCardHelpers.find((item) => item.id === 1)
  const titleCarruselFilterTwo = titleCarruselCardHelpers.find((item) => item.id === 2)

  return (
    <div>
      <Infinity />
      <div className='mt-[24rem]'>
        { titleCarruselFilterOne && <ScrollListCard id={titleCarruselFilterOne.id} title={titleCarruselFilterOne.title} lazyFrames={lazyFrameBehanceHelpers} />}
        { titleCarruselFilterTwo && <RenderFigmaWrapper id={titleCarruselFilterTwo.id} title={titleCarruselFilterTwo.title} />}
      </div> 
    </div>
  )
}

export default UxSection