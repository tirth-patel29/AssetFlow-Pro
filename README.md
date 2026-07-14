# AssetFlow

AssetFlow is a React + Vite frontend for an enterprise asset management dashboard built with Supabase authentication and data storage.

## Key features

- User authentication via Supabase
- Role-based routing and protected pages
- Asset directory with creation and search
- Allocation / transfer management
- Maintenance work orders with live asset selection
- Audit and booking pages
- Dashboard KPI cards and analytics reports
- Responsive sidebar navigation with glass UI styling
- Vercel-compatible client-side routing support


## Tech stack

- React 19
- Vite
- Tailwind CSS
- React Router Dom
- Supabase JS
- Recharts
- Lucide icons

## Getting started

1. Install dependencies

```bash

npm install
```

2. Create your `.env` file from the example

```bash
cp .env.example .env
```

3. Fill in Supabase environment variables in `.env`

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Run the development server

```bash
npm run dev
```

5. Open the local URL shown in the terminal

## Supabase configuration

The app expects the following tables in Supabase:

- `profiles` or `employees` for user profile data
- `assets` for asset inventory
- `allocations` for transfer requests
- `maintenance_requests` for work orders

The app also uses Supabase Auth for email/password signup and sign-in.

## Deployment

This project is configured for Vercel client-side routing. The `vercel.json` file rewrites incoming routes to `index.html` so refreshes and deep links work correctly.

To deploy to Vercel:

1. Push the project to a GitHub repository
2. Connect the repository to Vercel
3. Set the same environment variables in Vercel
4. Deploy

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - run Oxlint

## Notes

- Keep `.env` out of source control
- Use `.env.example` to document required environment variables
- If Supabase auth sends temporary errors, signup messages are normalized in the app

## Project structure

- `src/App.jsx` - main router and protected routes
- `src/components/Layout.jsx` - sidebar, navbar, shell
- `src/components/AuthProvider.jsx` - auth/context state
- `src/pages` - feature pages like `Dashboard`, `Assets`, `Maintenance`, `Reports`, `OrganizationSetup`
- `src/lib/supabaseClient.js` - Supabase client initialization
- `src/lib/auth.js` - auth helper functions

## Troubleshooting

- If routes 404 on refresh, verify `vercel.json` exists and is deployed
- If assets do not appear, confirm the `assets` table contains rows and the Supabase env vars are correct
- If signup fails due to email rate limits, retry after a few minutes and confirm the Supabase project is configured correctly

- 
