"use client";

import UseProfile from "@/app/components/UseProfile";
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditableImage from "@/app/components/layout/EditableImage";
import UserTabs from "@/app/components/layout/UserTabs";
import Link from "next/link";
import ArrowLeft from '../../components/Icons/ArrowLeft';
import { redirect } from "next/navigation";


export default function NewMenuItemPage() {
    const { isLoading: profileLoading, data: profileData } = UseProfile();
    const [editMenuItem, setEditMenuItem] = useState(null as any);

    const [name, setMenuItemName] = useState('');
    const [description, setMenuItemDescription] = useState('');
    const [category, setMenuItemCategory] = useState('');
    const [basePrice, setMenuItemPrice] = useState('');
    const [image, setMenuItemImage] = useState('');

    const [redirectItems, setRedirectItems] = useState(false);

    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }

    async function handleMenuItemSave(ev: React.FormEvent) {
        ev.preventDefault();
        const data = {
            name: name,
            description: description,
            category: category,
            basePrice: basePrice,
            image: image
        } as any;
        if (editMenuItem) {
            data._id = editMenuItem._id;
        }
        const menuItemSavePromise =
            fetch('/api/menu-items', {
                method: editMenuItem ? 'PUT' : 'POST',
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
            <form onSubmit={handleMenuItemSave} className='mt-8'>
                <div className='gap-2 items-start flex'>
                    <div >
                        <EditableImage link={image} setLink={setMenuItemImage} />
                    </div>
                    <div className='grow'>
                        <label>Adı</label>
                        <input value={name} onChange={ev => setMenuItemName(ev.target.value)} type='text' />
                        <label>Açıklama</label>
                        <input value={description} onChange={ev => setMenuItemDescription(ev.target.value)} type='text' />
                        <label>Kategori</label>
                        <input value={category} onChange={ev => setMenuItemCategory(ev.target.value)} type='text' />
                        <label>Fiyat</label>
                        <input value={basePrice} onChange={ev => setMenuItemPrice(ev.target.value)} type='text' />
                    </div>
                </div>
                <button type="submit">Kaydet</button>
            </form>
        </section>
    );
}