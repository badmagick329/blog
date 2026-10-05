# Frontend

The blog's Next.js app, with [Payload CMS](https://payloadcms.com/) serving the admin at `/admin` and storing posts, covers and site copy in Postgres.

## Local development

1. Start the dev database from the repository root:

   ```bash
   docker compose -f docker-compose-db.yml -p blog-dev up -d
   ```

2. Create `frontend/.env.development.local` with `DATABASE_URI` (`postgres://blog:blog@127.0.0.1:5433/blog`) and any `PAYLOAD_SECRET`.
3. From `frontend/`, install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

The site is at http://localhost:5000 and the admin at http://localhost:5000/admin. Development pushes the schema straight to the database; production applies the migrations in `src/migrations/`.

## Layout

- `src/app/(frontend)/`: the site's routes. `src/app/(payload)/`: Payload's generated admin and API routes.
- `src/collections/` and `src/globals/`: the Payload schema. After changing it, run `pnpm generate:types` and add a migration with `pnpm payload migrate:create <name>`.
- `src/styles/theme.css`: the site's look, on top of the tokens in `src/app/(frontend)/globals.css`.

Fonts are self-hosted variable fonts in `src/fonts/`, loaded with `next/font/local` in `src/app/(frontend)/layout.tsx` and applied in `src/styles/theme.css`: Vollkorn for body text, Dancing Script for headings and accents, JetBrains Mono for code.
