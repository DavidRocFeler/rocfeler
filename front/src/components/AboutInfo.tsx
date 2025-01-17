import { aboutInfoHelpers } from '@/helpers/AboutInfo.helpers';
import React from 'react';

const AboutInfo: React.FC = () => {
  const renderInfo = (id: number, reverse: boolean) => {
    const item = aboutInfoHelpers.find((helper) => helper.id === id);

    const marginClass = id === 1
      ? ''
      : id === 2
      ? ''
      : id === 3
      ? 'md:mt-[2rem] mt-[4rem]'
      : id === 4
      ? 'md:mt-[4rem] md:mb-[4rem] mt-[6rem] mb-[6rem]'
      : '';


    const marginClassText = id === 1
    ? ''
    : id === 2
    ? ''
    : id === 3
    ? ''
    : id === 4
    ? ''
    : '';

    return (
      <div
        className={`flex ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:justify-around md:items-center w-[90%] m-auto ${marginClass}`}
        key={item?.id}
      >
        <img src={item?.image} alt="" className='w-auto h-[20rem]'/>
        <p className={`text-center text-[#B2B2B2] md:w-[30%] w-[90%] mt-[2rem] m-auto md:m-0 ${marginClassText}`}>{item?.info}</p>
      </div>
    );
  };

  return (
    <>
      {renderInfo(1, false)}
      {renderInfo(2, true)}
      {renderInfo(3, false)}
      {renderInfo(4, true)}
    </>
  );
};

export default AboutInfo;
