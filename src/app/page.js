import Header from './components/layout/Header'
import Hero from './components/layout/Hero'
import HomeMenu from './components/layout/HomeMenu'
import SectionHeaders from './components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <HomeMenu></HomeMenu>
      <section className='text-center'>
        <SectionHeaders subHeader={'About'}></SectionHeaders>
            <div className="mt-4 container mx-auto text-center">
                <p className="text-lg text-gray-600 mb-8">
                    Welcome to Red Onion, where we believe that good food is not just a meal; its an experience. Our mission is to bring joy to your taste buds with every bite. Here's what we stand for:
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
                        <blockquote className="text-xl font-semibold text-gray-700">
                            Elevate your dining experience with the convenience of our seamless online ordering and delivery services.
                        </blockquote>
                    </div>
                </div>
            </div>
      </section>
      <section className='text-center mt-8'>
        <SectionHeaders subHeader={'Contact Us'}></SectionHeaders>
            <div className="mt-4 container mx-auto text-center">
                <p className="text-2xl text-gray-600 mb-8">+1 (123)-456-789</p>
            </div>
      </section>
    </>
  )
}
