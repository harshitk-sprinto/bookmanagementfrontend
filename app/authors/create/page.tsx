import Card from "@/components/Card";

export default function CreateAuthors(){
    return (
        <div className="m-10">
            <Card>
                <div className="rounded-lg border-2 border-gray-400 p-4 flex flex-col">
                    <h2 className="font-bold text-2xl">Add New Author</h2>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Author Name *</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="text" placeholder="Enter author's full name"></input>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Birth Date</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="date"></input>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Biography</label>
                        <textarea className="border-2 border-gray-500 rounded-2xl p-2" placeholder="Enter author's biography..."></textarea>
                    </div>
                    <button className="mt-4 cursor-pointer bg-green-600 uppercase font-bold p-2 rounded-2xl">Add Author</button>
                </div>
            </Card>
        </div>
    )
}