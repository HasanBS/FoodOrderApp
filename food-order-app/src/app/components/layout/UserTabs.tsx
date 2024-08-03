"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }: { isAdmin: boolean }) {
    const path = usePathname();
    return (
        <div>
            {
                isAdmin &&
                <>
                    <div className=" tabs flex gap-2 justify-center  mx-auto">
                        <Link
                            href={"/profile"}
                            className={`tab ${path === '/profile' ? 'active' : ''}`}
                        >

                            Profil
                        </Link>
                        <Link
                            href={"/categories"}
                            className={`tab ${path === '/categories' ? 'active' : ''}`}
                        >
                            Kategoriler
                        </Link>
                        <Link
                            href={"/menu-items"}
                            className={/menu-items/.test(path) ? 'active' : ''}
                        >
                            Menü
                        </Link>
                        <Link
                            href={"/user"}
                            className={`tab ${path === '/user' ? 'active' : ''}`}
                        >
                            Kullanıcılar
                        </Link>
                    </div>
                </>
            }
            {
                !isAdmin &&
                <h1 className="text-center text-primary text-4xl mb-4">
                    Profil Bilgileri
                </h1>
            }
        </div>
    );
}