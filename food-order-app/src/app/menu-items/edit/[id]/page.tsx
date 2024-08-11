"use client";

import UseProfile from "@/app/components/UseProfile";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from "@/app/components/layout/UserTabs";
import Link from "next/link";
import ArrowLeft from '../../../components/Icons/ArrowLeft';
import { redirect, useParams } from "next/navigation";
import MenuItemForm from '../../../components/layout/MenuItemForm';


export default function EditMenuItemPage() {
    const { id } = useParams();

    const { isLoading: profileLoading, data: profileData } = UseProfile();
    const [menuItem, setMenuItem] = useState(null as any);
    const [redirectItems, setRedirectItems] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(async (res) => {
            if (res.ok) {
                return res.json().then(data => {
                    const menuItem = data.find((menuItem: any) => menuItem._id === id);
                    setMenuItem(menuItem);
                });
            } else {
                console.error('Failed to fetch menu item');
            }
        });
    }
        , []);


    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }

    async function handleMenuItemEdit(ev: React.FormEvent, data: any) {
        ev.preventDefault();
        data._id = id;
        const menuItemSavePromise =
            fetch('/api/menu-items', {
                method: 'PUT',
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
                Menü Düzenle
            </h1>
            <MenuItemForm onSubmit={handleMenuItemEdit} menuItem={menuItem} />
        </section>
    );
}