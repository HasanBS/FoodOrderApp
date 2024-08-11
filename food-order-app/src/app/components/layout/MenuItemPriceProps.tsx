import { use, useEffect, useState } from "react";
import Plus from "../Icons/Plus";
import Trash from "../Icons/Trash";
import UpDown from '../Icons/UpDown';

export default function MenuItemPriceProps({ name, addLabel, props, setProps }: { name: string, addLabel: string, props: any, setProps: any }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps((oldSizes: any) => [...oldSizes, { name: '', price: 0 }]);
    }

    function editProps(value: any, index: number, key: string) {
        setProps((oldSizes: any) => {
            const newSizes = [...oldSizes];
            newSizes[index][key] = value;
            return newSizes;
        });
    }

    function deleteProps(index: number) {
        setProps((oldSizes: any) => {
            const newSizes = [...oldSizes];
            newSizes.splice(index, 1);
            return newSizes;
        });
    }

    return (
        <div className="bg-gray-100 rounded-md mb-2 mr-2 ml-[-5px]">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex px-1 m-0 border-0 justify-start" type="button">
                <UpDown />
                <span className="text-gray-700">{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={`${isOpen ? "block" : "hidden"} m-2`}>
                <button
                    type="button"
                    onClick={() => { addProps(); }}
                    className=" bg-white"
                >
                    {addLabel} <Plus /></button>
                {props?.length > 0 &&
                    props.map((size: any, index: number) => {
                        return (
                            <div key={index} className="flex items-end gap-2 m-2">
                                <div className="">
                                    <label>Ad</label>
                                    <input
                                        className="!bg-white"
                                        value={size.name}
                                        onChange={ev => {
                                            editProps(ev.target.value, index, 'name');
                                        }}
                                        type="text"
                                        placeholder="Boyut Adı"
                                    />
                                </div>
                                <div>
                                    <label>Ek Fiyat</label>
                                    <input
                                        className="!bg-white !min-w-[85px]  m-1"
                                        value={size.price}
                                        onChange={ev => {
                                            editProps(ev.target.value, index, 'price');
                                        }}
                                        type="text"
                                        placeholder="Fiyat"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => { deleteProps(index) }}
                                        className="bg-white mb-2 px-3" >
                                        <Trash />
                                    </button>
                                </div>

                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}