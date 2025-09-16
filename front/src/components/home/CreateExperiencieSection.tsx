import LazyIframe from "../LazyIframe";
import MacBookMockup from "../ui/MacBookMuckUp";

interface CreatingExperiencesSectionProps {
    styles: any; // Ajusta el tipo según tus estilos
    handleNavigationUX: () => void;
    handleNavigationRepo: () => void;
  }
  
  const CreatingExperiencesSection: React.FC<CreatingExperiencesSectionProps> = ({ 
    styles, 
    handleNavigationUX, 
    handleNavigationRepo 
  }) => {
    return (
      <div className='w-[100%] m-auto mt-[10rem] h-auto flex-col hidden md:flex mb-[20rem]'>
        <div className='flex flex-col-reverse xxl:flex-row justify-around w-[90%] m-auto items-center'>

          <aside className='w-[80%] xxl:w-[30%] h-fit relative mt-[2rem] lg:mt-0'>
            <div className="hidden xxl:block">
                <h2 className={styles.rocTitle4}>
                Creating experiences
                </h2>
            </div>
            <p className='text-[#B2B2B2] font-light text-[1.5rem] mt-[2rem] xxl:mt-[4rem] text-center lg:text-start'>
              I&#39;m deeply passionate about design, I master advanced tools to create innovative solutions. Understanding customer needs drives my focus and commitment to delivering quality user experiences. I have transformed my passion into a satisfying profession that I truly enjoy.
            </p>

            <div className='xxl:hidden mt-[3rem]'>
                <button
                    onClick={handleNavigationRepo}
                    className={styles.rocButton}>
                    See more
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 16"
                    fill="currentColor"
                    className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
                    >
                    </svg>
                </button>
            </div>
          </aside>

          <div className='flex flex-col items-center'>
            <div className="block xxl:hidden">
                <h2 className={styles.rocTitle3}>
                    Creating experiences
                </h2>
            </div>
            <MacBookMockup>
                <LazyIframe/>
            </MacBookMockup>
            <button onClick={handleNavigationUX} className='text-[#2dbd2d] text-[1.5rem] ml-auto mt-[2rem] hidden xxl:block'>
                See more
            </button>
          </div>

        </div>
   
      </div>
    );
  };
  
  export default CreatingExperiencesSection;