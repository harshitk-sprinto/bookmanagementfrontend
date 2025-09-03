export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            {children}
        </div>
    )
}