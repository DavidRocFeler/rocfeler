import { IBrandingProps } from "@/interfaces/types";

import React from 'react'

const BrandingIcon: React.FC<IBrandingProps> = ({image, imageSize}) => {
  return (
    <div>
        <img style={{ width: imageSize, height: 'auto'}} src={image} alt="" />
    </div>
  )
}

export default BrandingIcon;