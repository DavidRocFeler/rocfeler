import { ITechIconProps } from '@/interfaces/types'
import React from 'react'

const TechIcon: React.FC <ITechIconProps> = ({image, imageSize}) => {
  return (
    <div>
        <img src={image} alt="" />
    </div>
  )
}

export default TechIcon;