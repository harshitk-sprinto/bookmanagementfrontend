"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { Author, fetchAuthors } from "@/lib/api/authors";
import { useRouter } from "next/navigation";
import { CREATE_BOOK } from "@/app/books/queries";
import { createApolloClient } from "@/lib/apolloClient";

export default function CreateBooks(){
    const router = useRouter();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [title, setTitle] = useState("");
    const [authorIds, setAuthorIds] = useState<string[]>([]);
    const [publishedDate, setPublishedDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await fetchAuthors({ page: 1, pageSize: 1000 });
            setAuthors(result?.authors.nodes ?? []);
        })();
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!title.trim()) { setError("Book title is required"); return; }
        if (!authorIds.length) { setError("At least one author is required"); return; }
        try {
            setLoading(true);
            const client = createApolloClient();
            await client.mutate({
                mutation: CREATE_BOOK,
                variables: {
                    title: title.trim(),
                    description: description.trim() || null,
                    published_date: publishedDate ? new Date(publishedDate).toISOString() : null,
                    authorIds: authorIds.map((v) => Number(v)),
                }
            });
            router.push("/books");
        } catch (err) {
            setError("Failed to create book");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="m-10">
            <Card>
                <form onSubmit={onSubmit} className="rounded-lg border-2 border-gray-400 p-4 flex flex-col">
                    <h2 className="font-bold text-2xl">Add New Book</h2>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Book Title *</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="text" placeholder="Enter book title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Authors *</label>
                        <select
                            className="rounded-2xl border-2 border-gray-400 p-2"
                            multiple
                            value={authorIds}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                                setAuthorIds(selected);
                            }}
                        >
                            {authors.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Publication Date</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Description</label>
                        <textarea className="border-2 border-gray-500 rounded-2xl p-2" placeholder="Enter book description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    {error ? <div className="text-red-600 mt-2">{error}</div> : null}
                    <button type="submit" disabled={loading} className="mt-4 cursor-pointer bg-green-600 uppercase font-bold p-2 rounded-2xl disabled:opacity-60">{loading ? "Saving..." : "Add Book"}</button>
                </form>
            </Card>
        </div>
    )
}