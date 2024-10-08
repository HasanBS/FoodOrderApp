"use client";

import UseProfile from "@/app/components/UseProfile";
import { useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from "@/app/components/layout/UserTabs";
import Link from "next/link";
import ArrowLeft from '../../components/Icons/ArrowLeft';
import { redirect } from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";


export default function NewMenuItemPage() {
    const { isLoading: profileLoading, data: profileData } = UseProfile();
    const [menuItem, setMenuItem] = useState(null as any);

    const [redirectItems, setRedirectItems] = useState(false);

    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }

    async function handleMenuItemSave(ev: React.FormEvent, data: any) {
        ev.preventDefault();
        const menuItemSavePromise =
            fetch('/api/menu-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async (res) => {
                if (res.ok) {
                    setRedirectItems(true);
                } else {
                    throw new Error('Failed to save menu item');
                }
            });

        await toast.promise(menuItemSavePromise, {
            loading: 'Menü kaydediliyor...',
            success: 'Menü kaydedildi',
            error: 'Menü kaydedilirken bir hata oluştu',
        });
    }

    if (redirectItems) {
        return redirect('/menu-items');
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <Link href={'/menu-items'} className="button">
                <ArrowLeft></ArrowLeft>
                Tüm Yemekler
            </Link>
            <h1 className="text-center text-primary text-4xl mb-6 mt-8">
                Yeni Menü Ekle
            </h1>
            <MenuItemForm onSubmit={handleMenuItemSave} menuItem={menuItem} />
        </section>
    );
}