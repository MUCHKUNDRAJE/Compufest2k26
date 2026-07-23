import Footer from '@/components/footer'
import Image from 'next/image'


const images = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  src: `/core/${i + 1}.png`,
  alt: `Core team member ${i + 1}`,
}))

const semiimages = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  src: `/semicore/${i + 1}.png`,
  alt: `Semicore team member ${i + 1}`,
}))

function Page() {
  return (
    <div className="relative min-h-screen w-full ">
      {/* Fixed background layer — stays put while content scrolls */}
      <div className="fixed inset-0 -z-10">
        <Image src="/back.jpg" alt="background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        <h2
          className={`mt-30 text-center text-4xl text-white p-2 bg-red-600 md:text-5xl  drop-shadow-lg`}
          style={{fontFamily:"Minecraft"}}
        >
        
          Core Committee
        </h2>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="w-80 h-96 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-full">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

          <h2
          className={`mt-30 mb-10 text-center text-4xl text-white p-2 bg-[#704eb4] md:text-5xl  drop-shadow-lg`}
          style={{fontFamily:"Minecraft"}}
        >
        
          SemiCore Comitee
        </h2>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          {semiimages.map((img) => (
            <div
              key={img.id}
              className="w-80 h-96 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-full">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

           <h2
          className={`mt-30 mb-10 text-center text-4xl text-white p-2 bg-green-700 md:text-5xl  drop-shadow-lg`}
          style={{fontFamily:"Minecraft"}}
        >
        
       Website Developed by
        </h2>
        <div className="flex mb-20 flex-wrap justify-center gap-4 p-6">
        
            <div
              key={"32"}
              className="w-80 h-96 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-full">
                <Image src={"/semicore/32.png"} alt={"Muchkundraje thote"} fill className="object-cover" />
              </div>
            </div>
        <div
              key={"33"}
              className="w-80 h-96 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-full">
                <Image src={"/semicore/33.png"} alt={"Muchkundraje thote"} fill className="object-cover" />
              </div>
            </div>

             
        </div>
   {/* <div className='w-full flex items-center justify-center mb-20'>

          <div
              key={"33"}
              className="w-1/2 h-30 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg"
            >
              Compufest Technical team
            </div>
   </div> */}
        
  
      </div>
      <Footer/>
    </div>
  )
}

export default Page