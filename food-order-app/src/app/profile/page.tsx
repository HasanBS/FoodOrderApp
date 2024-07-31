'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const userData = session.data?.user;
    const { status } = session;
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile', {
                method: 'GET',
            }).then(async (res) => {
                if (res.ok) {
                    return res.json().then(data => {
                        setUserName(data.name);
                        setImage(data.image);
                        setPhone(data.phone);
                        setCountry(data.country);
                        setCity(data.city);
                        setPostalCode(data.postalCode);
                        setAddress(data.address);
                    });
                } else {
                    toast.error('Bir hata oluştu!');
                    console.error('Failed to fetch user profile');
                }
            });
        }
    }, [status, session]);

    if (session.status === 'loading') {
        return 'Loading...';
    }

    if (session.status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileInfoUpdate(ev: React.FormEvent) {
        ev.preventDefault();
        await toast.promise(
            fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    image: image,
                    phone: phone,
                    country: country,
                    city: city,
                    postalCode: postalCode,
                    address: address
                }),
            }).then(async (res) => {
                if (res.ok) {
                } else {
                    console.error('Failed to update user profile');
                }
            })
            , {
                loading: 'Kullanıcı bilgileri kaydediliyor...',
                success: 'Kullanıcı bilgileri kaydedildi',
                error: 'Kullanıcı bilgileri kaydedilirken bir hata oluştu',
            });
    }

    async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];
        if (!file) {
            return;
        }
        const formData = new FormData;
        formData.set('file', file);

        const uploadPromise =
            fetch('/api/upload', {
                method: 'POST',
                body: formData
            }).then(async (res) => {
                if (res.ok) {
                    return res.json().then(data => {
                        setImage(data.url);
                    }
                    );
                } else {
                    throw new Error('Failed to upload image');
                }
            });

        await toast.promise(uploadPromise, {
            loading: 'Resim yükleniyor...',
            success: 'Resim yüklendi',
            error: 'Resim yüklenirken bir hata oluştu',
        });
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile Page
            </h1>
            <div className="max-w-xs mx-auto">
                <div className="flex justify-center gap-4">
                    <div className="p-2 rounded-lg relative  min-w-[180px] max-h-[250px]">
                        {
                            image &&
                            <Image className=" rounded-lg w-full h-full mb-1" src={image} height={250} width={250} alt="Avatar" />
                        }
                        <label>
                            <input type="file" className=" hidden" onChange={handleFileChange} />
                            <span className="block p-3 mt-4 border-gray-300 text-center rounded-lg border cursor-pointer">Değiştir</span>
                        </label>
                    </div>
                    <form onSubmit={handleProfileInfoUpdate} className="grow">
                        <label>İsim Soyisim</label>
                        <input type="text" placeholder="İsim Soyisim" value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <label>Email</label>
                        <input type="email" disabled value={userData?.email ?? ''} placeholder="Email" />
                        <label>Telefon</label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Telefon" />
                        <label>Ülke</label>
                        <input type="text" value={country} onChange={ev => setCountry(ev.target.value)} placeholder="Ülke" />
                        <div className="flex  gap-2">
                            <div>
                                <label>Şehir</label>
                                <input type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder="Şehir" />
                            </div>
                            <div>
                                <label>Posta Kodu</label>
                                <input type="text" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} placeholder="Posta Kodu" />
                            </div>
                        </div>
                        <label>Genel Adres</label>
                        <textarea value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Genel Adres" />
                        <button type="submit">Kaydet</button>
                    </form>
                </div>
            </div>
        </section>
    );
}