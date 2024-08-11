import { useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from './MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }: { onSubmit: (ev: React.FormEvent, data: any) => void, menuItem: any }) {

    const [name, setMenuItemName] = useState(menuItem?.name || '');
    const [description, setMenuItemDescription] = useState(menuItem?.description || '');
    const [category, setMenuItemCategory] = useState(menuItem?.category || '');
    const [basePrice, setMenuItemPrice] = useState(menuItem?.basePrice || 0);
    const [image, setMenuItemImage] = useState(menuItem?.image || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || [] as any);
    const [extraIngredients, setExtraIngredients] = useState(menuItem?.extraIngredients || [] as any);

    return (
        <form
            onSubmit={ev => onSubmit(ev, { name, description, category, basePrice, image, sizes, extraIngredients })}
            className='mt-8  max-w-3xl mx-auto'>
            <div className='md:grid items-start gap-4' style={{ gridTemplateColumns: '.3fr .7fr' }}>
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
                    <MenuItemPriceProps name='Boy' addLabel='Boyut Ekle' props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps name='Ek Malzemeler' addLabel='Malzeme Ekle' props={extraIngredients} setProps={setExtraIngredients} />
                    <button type="submit">Kaydet</button>
                </div>
            </div>
        </form>
    );
}