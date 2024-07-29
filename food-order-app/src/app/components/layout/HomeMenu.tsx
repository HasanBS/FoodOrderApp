import React from "react";
import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image src={'/sallad1.png'} width={109} height={189} alt="salad" />
        </div>
        <div className="absolute right-0 -top-[100px] text-right -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt="salad" />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders subHeader={'Ödemeye Geç'} mainHeader={'Menü'} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
