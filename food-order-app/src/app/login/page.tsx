"use client";
import Image from 'next/image';
import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import { signIn } from "next-auth/react";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        setLoggingIn(true);
        setLoginSuccess(false);
        setError(false);
        await signIn('credentials', { email, password, callbackUrl: '/' });
        try {
            console.log('logging in');

        } catch (error) {
            setError(true);
        }
    }

    return (
        <section className="mt-8">
            <h1 className="mb-4 text-primary text-center text-4xl">Giriş Yap</h1>
            {
                loginSuccess &&
                <div className="text-green-500 text-center my-4">
                    Başarıyla giriş yaptınız!
                </div>
            }
            {
                error &&
                <div className="text-red-500 text-center my-4">
                    Bir hata oluştu
                </div>
            }
            <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="Email" disabled={loggingIn} value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" name="password" placeholder="Şifre" disabled={loggingIn} value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={loggingIn}>Giriş Yap</button>
                <div className="my-4 text-gray-500 text-center">veya</div>
                <button type='button' onClick={() => signIn('google', { callbackUrl: '/' })} className='flex justify-center gap-4'>
                    <Image src="/google.png" width={24} height={24} alt="Google ile giriş yap" />
                    Google ile giriş yap
                </button>
                <div className='my-4 text-center text-gray-500 border-t pt-4'>
                    Henüz bir hesabınız yok mu?{' '}
                    <Link className=' underline' href={'/register'}>Kayıt olun &raquo;</Link>
                </div>
            </form>
        </section>
    );
}
