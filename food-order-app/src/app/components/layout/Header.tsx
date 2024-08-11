'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName?.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <header className="flex items-center justify-between  ">
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href="/">Hasso Lahmacun</Link>
                <Link href={'/'}>Anasayfa</Link>
                <Link href={'/menu'}>Menü</Link>
                <Link href={'/about'}>Hakkımızda</Link>
                <Link href={'/contact'}>İletişim</Link>
            </nav>
            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                {
                    status === 'authenticated'
                    &&
                    <>
                        <Link className="whitespace-nowrap" href={'/profile'}>Merhaba, {userName}</Link>
                        <button className="bg-primary my-0 text-white rounded-full px-6  py-2" onClick={() => signOut()}>
                            Çıkış
                        </button>
                    </>
                }
                {
                    status !== 'authenticated'
                    &&
                    <>
                        <Link href={'/login'}>Giriş</Link>
                        <Link className="bg-primary text-white rounded-full px-6  py-2" href={'/register'}>Kayıt ol</Link>
                    </>
                }
            </nav>
        </header>
    );
}