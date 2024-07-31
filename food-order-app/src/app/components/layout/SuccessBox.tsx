export default function SuccessBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-green-100 text-center p-4 rounded-lg border border-green-300">
            {children}
        </div>
    );
}