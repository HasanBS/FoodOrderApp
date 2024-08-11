"use client";

import { useEffect, useState } from "react";
import ArrowRight from "../components/Icons/ArrowRight";
import UseProfile from "../components/UseProfile";
import UserTabs from '../components/layout/UserTabs';
import Link from 'next/link';
import Image from 'next/image';


export default function MenuItemsPage() {

    const { isLoading: profileLoading, data: profileData } = UseProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(async (res) => {
            if (res.ok) {
                return res.json().then(data => {
                    setMenuItems(data);
                });
            } else {
                console.error('Failed to fetch menu items');
            }
        });

    }, []);

    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }


    return (
        <section className=" mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-10">
                <Link href={'/menu-items/new'} className="button">
                    Yeni Yemek Ekle
                    <ArrowRight></ArrowRight>
                </Link>

                <div>
                    <h2 className="text-sm text-gray-500 mt-4 my-[-15px]">Yemek Düzenle:</h2>
                    <div className=" grid grid-cols-3 gap-2">
                        {
                            menuItems.map((menuItem: any) => {
                                return (
                                    <Link className="button flex-col mb-1 bg-gray-100" href={'/menu-items/edit/' + menuItem._id} key={menuItem._id}>
                                        <div className=" relative">
                                            <Image className=" rounded-md" alt="" src={menuItem?.image} width={80} height={60} />
                                        </div>
                                        <div className=" text-center">
                                            {menuItem.name}
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}