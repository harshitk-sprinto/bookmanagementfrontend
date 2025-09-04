## Book Management Frontend

Next.js (App Router) frontend for the Book Management app using Apollo Client.

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm (comes with Node). You can also use yarn/pnpm/bun if you prefer.

### 1) Clone and install
```bash
git clone https://github.com/harshitk-sprinto/bookmanagementfrontend.git
cd book-management-frontend
npm install
```

### 2) Configure environment
Create a `.env.local` file in the project root and set the API URL for the GraphQL backend.
- The app reads `NEXT_PUBLIC_API_URL` in `lib/apolloClient.ts`.
- For local development, point it to your local backend, for example:
  - `NEXT_PUBLIC_API_URL=http://localhost:4000/api/graphql`

### 3) Run the app (development)
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4) Type-check and lint (optional but recommended)
```bash
npm run lint
```

### 5) Build and run (production)
```bash
npm run build
npm run start
```

By default the app starts on port 3000.

### Common issues
- If you see network errors in the app, verify `NEXT_PUBLIC_API_URL` is correct and reachable from the browser.
- After changing `.env.local`, restart the dev server.

### Tech
- Next.js 15, React 19
- Apollo Client 4
