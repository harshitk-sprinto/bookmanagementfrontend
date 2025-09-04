"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createApolloClient } from "@/lib/apolloClient";
import { GET_BOOK, UPDATE_BOOK } from "@/app/books/queries";
import { Author, fetchAuthors } from "@/lib/api/authors";
import { BookQuery } from "@/lib/api/books";

export default function EditBook(){
    const router = useRouter();
    const params = useParams();
    const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const id = idParam ? Number(idParam) : undefined;
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [description, setDescription] = useState("");
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const result = await fetchAuthors({ page: 1, pageSize: 1000 });
            setAuthors(result?.authors.nodes ?? []);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!id) return;
            const client = createApolloClient();
            const { data } = await client.query<BookQuery>({ query: GET_BOOK, variables: { id } });
            const b = data?.book;
            if (b) {
                setTitle(b.title ?? "");
                try { setPublishedDate(b.published_date ? new Date(b.published_date).toISOString().substring(0,10) : ""); } catch { setPublishedDate(""); }
                setDescription(b.description ?? "");
                setAuthorId(b.authors?.[0]?.id ? String(b.authors[0].id) : "");
            }
        })();
    }, [id]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!title.trim() || !id) { setError("Book title is required"); return; }
        if (!authorId) { setError("Author is required"); return; }
        try {
            setLoading(true);
            const client = createApolloClient();
            await client.mutate({
                mutation: UPDATE_BOOK,
                variables: {
                    id,
                    title: title.trim(),
                    description: description.trim() || null,
                    published_date: publishedDate ? new Date(publishedDate).toISOString() : null,
                    authorIds: [Number(authorId)],
                },
            });
            router.push("/books");
        } catch {
            setError("Failed to update book");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="m-10">
            <Card>
                <form onSubmit={onSubmit} className="rounded-lg border-2 border-gray-400 p-4 flex flex-col">
                    <h2 className="font-bold text-2xl">Edit Book</h2>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Book Title *</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="text" placeholder="Enter book title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Author *</label>
                        <select className="rounded-2xl border-2 border-gray-400 p-2" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                            <option value="">Select an Author</option>
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
                    <div className="flex mt-4">
                        <button type="submit" disabled={loading} className="mr-2 cursor-pointer bg-green-600 uppercase font-bold p-2 rounded-2xl disabled:opacity-60">{loading ? "Saving..." : "Save"}</button>
                        <button type="button" className="cursor-pointer bg-gray-300 uppercase font-bold p-2 rounded-2xl" onClick={() => router.push("/books")}>Cancel</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}


