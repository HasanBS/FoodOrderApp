export default function InfoBox({ children }: { children: React.ReactNode }) {
    return (
        <div className=" bg-blue-100 text-center p-4 rounded-lg border border-blue-300">
            {children}
        </div>
    );
}