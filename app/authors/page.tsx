import Card from "@/components/Card";
import { createApolloClient } from "@/lib/apolloClient";
import { GET_AUTHORS } from "./queries";

type PageInfo = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type Book = {
  id: number;
  title: string;
  description: string;
  published_date: Date;
  authors: [Author];
};

type Author = {
  id: number;
  name: string;
  biography: string;
  born_date: Date;
  books: [Book];
};

type AuthorConnection = {
  nodes: Array<Author>;
  pageInfo: PageInfo;
};

type AuthorQuery = {
  authors: AuthorConnection;
};

export default async function Authors() {
  const client = createApolloClient();
  const { data } = await client.query<AuthorQuery>({
    query: GET_AUTHORS,
    variables: {
        page: 1,
        pageSize: 5
    }
  });

  console.log(data?.authors.nodes);
  return (
    <>
      <div className="mx-4">
        <Card>
          <div className="mt-10 p-4 flex flex-col">
            <h4 className="font-bold"> Filter Authors</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Search by Name
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="text"
                  placeholder="Enter author name..."
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Birth Year
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="number"
                  placeholder="Year"
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500"></label>
                <button className="p-2 rounded-2xl bg-blue-500 uppercase cursor-pointer active:border-2">
                  {" "}
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </Card>
        {data?.authors.nodes.map((author) => (
          <Card key={author.id}>
            <div className="mt-10 p-4 flex flex-col">
              <h2 className="font-bold text-lg border-b-2 border-blue-900">
                {author.name}
              </h2>

              <div className="flex mt-4">
                <div className="text-gray-500 font-bold mr-2">Born: </div>
                <div>{author.born_date?.toISOString()}</div>
              </div>
              <div className="flex mt-4">
                <div className="text-gray-500 font-bold mr-2">Books: </div>
                <div>{author.books.length}</div>
              </div>
              <div className="mt-4">
              {author.biography}
              </div>
              <div className="mt-4 flex">
                <button className="p-2 rounded-lg cursor-pointer bg-blue-400 mr-4">
                  Edit
                </button>
                <button className="p-2 rounded-lg cursor-pointer bg-red-400">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
