export default function MenuItem() {
    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div>
                <img className="h-auto max-h-24 block mx-auto" src="/lahmacun.png " alt="Lahmacun" />
            </div>
            <h4 className="text-primary font-semibold text-xl  my-2">Lahmacun</h4>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-full mt-4">Sepete Ekle 10$  </button>
        </div>
    );
}