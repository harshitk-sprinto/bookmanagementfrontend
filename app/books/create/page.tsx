import Card from "@/components/Card";

export default function CreateBooks(){
    return (
        <div className="m-10">
            <Card>
                <div className="rounded-lg border-2 border-gray-400 p-4 flex flex-col">
                    <h2 className="font-bold text-2xl">Add New Book</h2>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Book Title *</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="text" placeholder="Enter book title"></input>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Author *</label>
                        <select className="rounded-2xl border-2 border-gray-400 p-2">
                  <option value="">Select an Author</option>
                </select>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Publication Date</label>
                        <input className="border-2 border-gray-500 rounded-2xl p-2" type="date"></input>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-gray-500 font-bold mb-2">Description</label>
                        <textarea className="border-2 border-gray-500 rounded-2xl p-2" placeholder="Enter book description..."></textarea>
                    </div>
                    <button className="mt-4 cursor-pointer bg-green-600 uppercase font-bold p-2 rounded-2xl">Add Book</button>
                </div>
            </Card>
        </div>
    )
}