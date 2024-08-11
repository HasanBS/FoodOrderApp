
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";

//! Sign got some errors check it 
export default function GoogleSignIn() {

    async function handleGoogleSignIn() {
        await toast.promise(
            signIn('google', { callbackUrl: '/' }),
            {
                loading: 'Giriş yapılıyor...',
                success: 'Başarıyla giriş yaptınız!',
                error: 'Bir hata oluştu'
            }
        );
    }
    return (
        <button type='button' onClick={() => handleGoogleSignIn()} className='flex justify-center gap-4'>
            <Image src="/google.png" width={24} height={24} alt="Google ile giriş yap" />
            Google ile giriş yap
        </button>
    );
}