"use client";

import ArrowRight from "../components/Icons/ArrowRight";
import UseProfile from "../components/UseProfile";
import UserTabs from '../components/layout/UserTabs';
import Link from 'next/link';


export default function MenuItemsPage() {

    const { isLoading: profileLoading, data: profileData } = UseProfile();

    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }


    return (
        <section className=" mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link href={'/menu-items/new'} className="button">
                    Yeni Yemek Ekle
                    <ArrowRight></ArrowRight>
                </Link>
            </div>
        </section>
    );
}