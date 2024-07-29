import React from 'react';

export default function SectionHeaders({ subHeader, mainHeader }: { subHeader: string, mainHeader: string }) {
    return (
        <>
            <h3 className="uppercase text-gray-600 font-semibold leading-6">
                {subHeader}
            </h3>
            <h2 className="text-primary font-bold  text-4xl italic">
                {mainHeader}
            </h2>
        </>
    );
}