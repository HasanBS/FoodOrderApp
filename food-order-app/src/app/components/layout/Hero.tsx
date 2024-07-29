import React from "react";
import Image from "next/image";
import ArrowRight from "../Icons/ArrowRight";

export default function Hero ()
{
    return(
        <section className="hero "> 
            <div className="py-12">
            <h1 className="text-4xl font-semibold">
                Yemeyen <br/> bin&nbsp; 
                <span className="text-primary">
                    Pişman
                </span> 
              </h1>  
              <p className="my-4 text-gray-500 text-sm">
                Lezzetli ve taze lahmacunlarımızla sizi bekliyoruz. Lahmacun keyfi Hasso Lahmacun'da yaşanır. 
              </p>  
              <div className="flex gap-4 text-sm ">
                <button className="items-center bg-primary flex gap-2 text-white rounded-full px-4 py-2 ">
                    Sipariş Ver 
                    <ArrowRight/> 
                </button>
                <button className="items-center  flex text-gray-500 font-semibold  py-2 gap-2">
                    Daha fazla bilgi edinin <ArrowRight/> 
                 </button>
              </div>
            </div>
            <div className="relative">   
                <Image src={'/kurekte_lahmacun.png'} layout="fill" objectFit="contain" alt={'Lahmacun '}></Image>
            </div>
        </section>
    );
}