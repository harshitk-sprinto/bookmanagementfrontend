"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createApolloClient } from "@/lib/apolloClient";
import { GET_AUTHOR, UPDATE_AUTHOR } from "@/app/authors/queries";
import { AuthorQuery } from "@/lib/api/authors";

export default function EditAuthor(){
    const router = useRouter();
    const params = useParams();
    const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const id = idParam ? Number(idParam) : undefined;
    const [name, setName] = useState("");
    const [bornDate, setBornDate] = useState("");
    const [biography, setBiography] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (!id) return;
            const client = createApolloClient();
            const { data } = await client.query<AuthorQuery>({ query: GET_AUTHOR, variables: { id } });
            const a = data?.author;
            if (a) {
                setName(a.name ?? "");
                try { setBornDate(a.born_date ? new Date(a.born_date).toISOString().substring(0,10) : ""); } catch { setBornDate(""); }
                setBiography(a.biography ?? "");
            }
        })();
    }, [id]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!name.trim() || !id) { setError("Author name is required"); return; }
        try {
            setLoading(true);
            const client = createApolloClient();
            await client.mutate({
                mutation: UPDATE_AUTHOR,
                variables: {
                    id,
                    name: name.trim(),
                    biography: biography.trim() || null,
                    born_date: bornDate ? new Date(bornDate).toISOString() : null,
                },
            });
            router.push("/authors");
        } catch {
            setError("Failed to update author");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="m-10">
            <Card>
                <form onSubmit={onSubmit} className="rounded-lg border-2 border-gray-400 p-4 flex flex-col">
                    <h2 className="font-bold text-2xl">Edit Author</h2>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Author Name *</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="text" placeholder="Enter author's full name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Birth Date</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="date" value={bornDate} onChange={(e) => setBornDate(e.target.value)} />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Biography</label>
                        <textarea className="border-2 border-gray-500 rounded-2xl p-2" placeholder="Enter author's biography..." value={biography} onChange={(e) => setBiography(e.target.value)} />
                    </div>
                    {error ? <div className="text-red-600 mt-2">{error}</div> : null}
                    <div className="flex mt-4">
                        <button type="submit" disabled={loading} className="mr-2 cursor-pointer bg-green-600 uppercase font-bold p-2 rounded-2xl disabled:opacity-60">{loading ? "Saving..." : "Save"}</button>
                        <button type="button" className="cursor-pointer bg-gray-300 uppercase font-bold p-2 rounded-2xl" onClick={() => router.push("/authors")}>Cancel</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}


