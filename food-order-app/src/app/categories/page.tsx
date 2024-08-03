"use client";
import { useEffect, useState } from 'react';
import UserTabs from '../components/layout/UserTabs';
import UseProfile from '../components/UseProfile';
import toast from 'react-hot-toast';
export default function CategoriesPage() {

    const { isLoading: profileLoading, data: profileData } = UseProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null as any);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories', {
            method: 'GET',
        }).then(async (res) => {
            if (res.ok) {
                return res.json().then(data => {
                    setCategories(data);
                });
            } else {
                toast.error('Kategoriler yüklenemedi!');
            }
        }
        )
    }


    if (profileLoading) {
        return 'Yükleniyor...';
    }

    if (!profileData?.admin && !profileLoading) {
        return 'Yetkiniz yok!';
    }

    async function handleCategorySubmit(ev: React.FormEvent) {
        ev.preventDefault();
        const data = {
            name: categoryName
        } as any;
        if (editedCategory) {
            data._id = editedCategory._id;
        }
        const categoryCreatePromise =
            fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async (res) => {
                fetchCategories();
                if (res.ok) {
                    setCategoryName('');
                } else {
                    throw new Error('Kategori oluşturulamadı!');
                }
            });

        await toast.promise(categoryCreatePromise, {
            loading: editedCategory ? 'Kategori güncelleniyor...' : 'Kategori oluşturuluyor...',
            success: editedCategory ? 'Kategori güncellendi!' : 'Kategori oluşturuldu!',
            error: editedCategory ? 'zortladın' : 'Kategori oluşturulamadı!',
        });
        setEditedCategory(null);
    }

    return (
        <section className='mt-8 max-w-lg mx-auto'>
            <UserTabs isAdmin={true} />
            <form className='mt-6' onSubmit={handleCategorySubmit}>
                <div className='gap-2 items-center flex'>
                    <div className='grow'>
                        <label>
                            {editedCategory ? 'Kategori Adı Güncelle' : 'Yeni Kategori Adı'}
                            {
                                editedCategory
                                && <> : <b>{editedCategory.name}</b></>
                            }
                        </label>
                        <input value={categoryName} onChange={ev => setCategoryName(ev.target.value)} type='text' />
                    </div>
                    <div className='mt-3'>
                        <button type='submit'>
                            {editedCategory ? 'Güncelle' : 'Kaydet'}
                        </button>
                    </div>
                </div>
            </form>
            {
                categories?.length > 0
                &&
                categories.map((category: any) => {
                    return (
                        <button onClick={() => {
                            setEditedCategory(category);
                            setCategoryName(category.name);
                        }
                        }
                            key={category._id}
                            className=' bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2'>
                            <span>
                                {category.name}
                            </span>
                        </button>
                    );
                }
                )
            }
        </section>
    );
}