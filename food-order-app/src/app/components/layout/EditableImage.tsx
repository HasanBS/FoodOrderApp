import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }: { link: string, setLink: (link: string) => void }) {
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
                        setLink(data.url);
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
        <div className="p-2 rounded-lg relative  min-w-[150px] max-h-[100px] h-[200px]">
            {
                link &&
                <Image className=" rounded-lg w-full h-full mb-1" src={link} height={150} width={150} alt="Avatar" />
            }
            {
                !link &&
                <Image className=" rounded-lg w-full h-full mb-1" src="/placeholder_transparent.png" height={150} width={150} alt="Avatar" />
            }
            <label>
                <input type="file" className=" hidden" onChange={handleFileChange} />
                <span className="block p-3 mt-4 border-gray-300 text-center rounded-lg border cursor-pointer">Değiştir</span>
            </label>
        </div>
    );
}