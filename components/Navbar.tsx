import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="grid grid-cols-2 gap-1 justify-items-center text-gray-500">
            <Link href="/books" className="hover:text-blue-500 w-full p-4 bg-red-50 text-center cursor-pointer">Books</Link>
            <Link href="/authors" className="hover:text-blue-500 w-full p-4 bg-red-50 text-center cursor-pointer">Authors</Link>
            <Link href="/add-book" className="hover:text-blue-500 w-full p-4 bg-red-50 text-center cursor-pointer"> + Add Book</Link>
            <Link href="/add-author" className="hover:text-blue-500 w-full p-4 bg-red-50 text-center cursor-pointer"> + Add Author</Link>
        </nav>
    )
}