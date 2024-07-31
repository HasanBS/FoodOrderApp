export default function ErrorBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-red-100 text-center p-4 rounded-lg border border-red-300">
            {children}
        </div>
    );
}