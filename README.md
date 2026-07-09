# Snippets Vault

A secure, multi-user code snippet management web application. Store, organize, and manage your code snippets with syntax highlighting and enterprise-grade authentication.

## Features

- **Secure Vault**: Store your code snippets privately with strict data isolation
- **Multi-User Support**: Sign in with GitHub, Google, or Facebook
- **Syntax Highlighting**: Beautiful code display for multiple programming languages
- **Fast & Reliable**: Optimized server actions for lightning-fast saves and retrieval
- **Professional Environment**: Manage snippets in an intuitive dashboard

## Tech Stack

- **Frontend**: Next.js 16 with React 19, Tailwind CSS
- **Backend**: Next.js App Router with server actions
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Better Auth with social providers (GitHub, Google, Facebook)
- **Validation**: React Hook Form + Zod
- **Hosting**: Deployed on Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (e.g., Neon)
- OAuth credentials for at least one social provider

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (`.env.local`):
```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=your-neon-postgres-url

# Social providers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Project Structure

- `/src/app` - Next.js pages and routes
- `/src/components` - Reusable React components
- `/src/db` - Database schema and connection
- `/src/lib` - Utilities, authentication, and server actions
- `/public` - Static assets

## Live Demo

Visit [https://snippets-ebon-two.vercel.app](https://snippets-ebon-two.vercel.app)

## License

MIT
