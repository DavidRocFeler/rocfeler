import CoverDeploy from "@/components/CoverDeploy"
import { coverDeployHelpers } from "@/helpers/CoverDeploys.helpers"
import React from "react"

const DeploysView: React.FC = () => {

  return (
      <div className='flex flex-col'>
        <CoverDeploy items={coverDeployHelpers} />
        <section className='mt-[3rem] xxl:mt-[5rem]'>
            <h1 className='text-white font-bold mb-[1rem] w-[96%] m-auto'>Delpoy Projects</h1>
            <article className='grid grid-cols-1 xxl:grid-cols-3 gap-5 w-[96%] m-auto'>

              <div className='relative border w-full border-purple-500 rounded-2xl shadow-lg p-4 hover:shadow-purple-500 transition'>

                <img src="/VectorIngenius.svg" alt="" />

                <div className='absolute bottom-[1rem] right-[1rem] flex flex-row'>
                  <button className='font-bold text-[1rem] mr-[1rem] text-white pt-[0.2rem]'>
                    See Project
                  </button>
                  <img src="/VectorRedirect.svg" alt="" />     

                </div> 

              </div>      

              <div className='relative border w-full border-purple-500 rounded-2xl shadow-lg p-4 hover:shadow-purple-500 transition'>

                <img src="/VectorIngenius.svg" alt="" />

                <div className='absolute bottom-[1rem] right-[1rem] flex flex-row'>
                  <button className='font-bold text-[1rem] mr-[1rem] text-white pt-[0.2rem]'>
                    See Project
                  </button>
                  <img src="/VectorRedirect.svg" alt="" />     

                </div> 

              </div>   

              <div className='relative border w-full border-purple-500 rounded-2xl shadow-lg p-4 hover:shadow-purple-500 transition'>

                <img src="/VectorIngenius.svg" alt="" />

                <div className='absolute bottom-[1rem] right-[1rem] flex flex-row'>
                  <button className='font-bold text-[1rem] mr-[1rem] text-white pt-[0.2rem]'>
                    See Project
                  </button>
                  <img src="/VectorRedirect.svg" alt="" />     

                </div> 

              </div>   
              
            </article>
        </section>
      </div>
  )
}

export default DeploysView



