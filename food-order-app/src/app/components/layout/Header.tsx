import Link from "next/link";
import React from "react";

export default function () {
    return (
        <header className="flex items-center justify-between  ">
            <Link className="text-primary font-semibold text-2xl" href="">Hasso Lahmacun</Link>
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                <Link href={''}>Anasayfa</Link>
                <Link href={''}>Menü</Link>
                <Link href={''}>Hakkımızda</Link>
                <Link href={''}>İletişim</Link>
                <Link className="bg-primary text-white rounded-full px-6  py-2" href={''}>Giriş</Link>
            </nav>
        </header>
    );
}