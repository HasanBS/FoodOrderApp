"use client";
import Image from 'next/image';
import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        setCreatingUser(true);
        setUserCreated(false);
        setError(false);
        try {
            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }).then(async (res) => {
                if (res.ok) {
                    setUserCreated(true);
                    console.log('User registered');
                } else {
                    setError(true);
                    console.error('Failed to register user');
                }
                setCreatingUser(false);
            }
            );
        } catch (error) {
            setError(true);
        }
    }
    return (
        <section className="mt-8">
            <h1 className="mb-4 text-primary text-center text-4xl" >Kayıt ol</h1>
            {
                userCreated &&
                <div className="text-green-500 text-center my-4">
                    Kullanıcı oluşturuldu
                    <br />
                    Şimidi giriş yapabilirsiniz{' '}
                    <Link className=' underline' href={'/login'}>Giriş Yap &raquo;</Link>
                </div>
            }
            {
                error &&
                <div className="text-red-500 text-center my-4">
                    Bir hata oluştu
                </div>
            }
            <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Email" disabled={creatingUser} value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="Şifre" disabled={creatingUser} value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={creatingUser}>Kayıt ol</button>
                <div className="my-4 text-gray-500 text-center">veya</div>
                <button type='button' onClick={() => signIn('google', { callbackUrl: '/' })} className='flex justify-center gap-4'>
                    <Image src="/google.png" width={24} height={24} alt="Google ile giriş yap" />
                    Google ile giriş yap
                </button>
                <div className='my-4 text-center text-gray-500 border-t pt-4'>
                    Zaten bir hesabınız var mı?{' '}
                    <Link className=' underline' href={'/login'}>Giriş yapın &raquo;</Link>
                </div>
            </form>
        </section>
    );
}