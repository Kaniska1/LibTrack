# LibTrack 📚

A modern, full-featured Library Management System built with Next.js, React, and Supabase. LibTrack provides an intuitive interface for managing books, members, borrowing records, and library analytics.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.97.0-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

## ✨ Features

- 📖 **Book Management** - Add, edit, delete, and search books with detailed information
- 👥 **Member Management** - Track library members and their borrowing history
- 🔄 **Borrowing System** - Issue and return books with automatic due date tracking
- 📊 **Analytics Dashboard** - Visualize library statistics and trends
- 🔍 **Advanced Search** - Quick search and filter capabilities
- 🌓 **Dark Mode** - Built-in theme switching for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Authentication** - Secure user authentication via Supabase
- ⚡ **Real-time Updates** - Live data synchronization using SWR

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm** package manager
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaniska1/LibTrack.git
   cd LibTrack
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Or using pnpm
   pnpm install

   # Or using yarn
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
LibTrack/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── scripts/              # Build and utility scripts
├── styles/               # Additional stylesheets
├── public/               # Static assets
├── components.json       # shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[Recharts](https://recharts.org/)** - Charting library for analytics
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[SWR](https://swr.vercel.app/)** - Data fetching and caching

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Other Tools
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/), a collection of beautifully designed components built with Radix UI and Tailwind CSS. Components are:
- Fully accessible
- Customizable
- Copy-paste friendly
- TypeScript ready

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom animations and themes. Configuration can be found in:
- `tailwind.config.js`
- `postcss.config.mjs`

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict mode enabled for better type safety.

### Next.js
Next.js configuration is in `next.config.mjs` with optimizations for production builds.

## 🌐 Database Setup

### Supabase Schema
You'll need to set up the following tables in your Supabase project:
- **books** - Store book information
- **members** - Library member details
- **transactions** - Borrowing and return records

Refer to the `scripts/` directory for database migration files (if available).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kaniska1**
- GitHub: [@Kaniska1](https://github.com/Kaniska1)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel](https://vercel.com/) for hosting
