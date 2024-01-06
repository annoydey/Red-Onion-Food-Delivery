import Image from "next/image"
import Right from "../icons/Right";
import { Inder } from "next/font/google";

export default function Hero(){
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 mt-6">
            <div className="py-8 md:pr-8 flex flex-col justify-center items-center md:items-center">
                <h1 className="text-4xl font-semibold text-center md:text-left">Welcome to Red Onion Foods</h1>
                <p className="font-bold my-4 text-gray-500 text-center md:text-left">Where every dish tells a story of flavor and passion. Indulge your senses in a culinary journey, where flavors dance on your palate, and every dish tells a story of passion and perfection. Experience the extraordinary, taste the unforgettable.</p>
                <div className="flex gap-4 mb-6">
                    <button className="bg-red-600 text-sm uppercase text-white px-4 py-2 rounded-full flex gap-2 items-center">Order now <Right></Right></button>
                    <button className="text-gray-600 font-semibold px-8 py-2 rounded-full">Learn More</button>
                </div>
            </div>
            <div className="relative flex justify-center md:justify-center">
                <Image className="md:w-full md:h-full" src="/images/burrito-chicken-close-up-461198.png" width={600} height={600} alt={'food1'}></Image>
            </div>
        </section>
    );
}