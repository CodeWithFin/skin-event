# Vitapharm Beauty & Academy Event App - Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Supabase account (free tier available)

### Step 1: Setup Supabase Database
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run these commands to create the database schema:

```sql
-- Enable real-time
alter publication supabase_realtime add table public.registrations;
alter publication supabase_realtime add table public.photos;
alter publication supabase_realtime add table public.chat_messages;
alter publication supabase_realtime add table public.polls;
alter publication supabase_realtime add table public.highlights;
alter publication supabase_realtime add table public.leaderboard;

-- Create tables
create table public.registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  phone text not null,
  organization text,
  interests text[] default '{}',
  qr_code text not null unique,
  checked_in boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.photos (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  title text,
  uploaded_by text not null,
  likes integer default 0,
  approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_name text not null,
  message text not null,
  emoji_reaction text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.polls (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  options text[] not null,
  votes jsonb default '{}',
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.highlights (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('announcement', 'photo', 'video', 'shoutout')),
  title text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.leaderboard (
  id uuid default gen_random_uuid() primary key,
  user_name text not null unique,
  points integer default 0,
  photos_uploaded integer default 0,
  polls_participated integer default 0,
  chat_messages integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies
alter table public.registrations enable row level security;
alter table public.photos enable row level security;
alter table public.chat_messages enable row level security;
alter table public.polls enable row level security;
alter table public.highlights enable row level security;
alter table public.leaderboard enable row level security;

-- Allow public read access
create policy "Allow public read access" on public.registrations for select using (true);
create policy "Allow public read access" on public.photos for select using (true);
create policy "Allow public read access" on public.chat_messages for select using (true);
create policy "Allow public read access" on public.polls for select using (true);
create policy "Allow public read access" on public.highlights for select using (true);
create policy "Allow public read access" on public.leaderboard for select using (true);

-- Allow public insert for user-generated content
create policy "Allow public insert" on public.registrations for insert with check (true);
create policy "Allow public insert" on public.photos for insert with check (true);
create policy "Allow public insert" on public.chat_messages for insert with check (true);
create policy "Allow public insert" on public.leaderboard for insert with check (true);

-- Allow public update for specific fields
create policy "Allow public update" on public.leaderboard for update using (true);
create policy "Allow public update" on public.photos for update using (true);
```

3. Get your Supabase URL and anon key from the Project Settings > API page

### Step 2: Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your GitHub repository
3. In the deployment settings, add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Deploy!

### Step 3: Test Your Deployment
- Visit your deployed URL
- Test registration, photo upload, chat, polls
- Verify real-time updates work across multiple browser tabs

## 🛠️ Alternative Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

### Self-Hosted
1. Set up a server with Node.js 18+
2. Clone the repository
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Start the server: `npm start`

## 📊 Database Schema Visualization

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   registrations │    │     photos      │    │  chat_messages  │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (uuid)       │    │ id (uuid)       │    │ id (uuid)       │
│ name            │    │ url             │    │ user_name       │
│ email           │    │ title           │    │ message         │
│ phone           │    │ uploaded_by     │    │ emoji_reaction  │
│ organization    │    │ likes           │    │ created_at      │
│ interests[]     │    │ approved        │    └─────────────────┘
│ qr_code         │    │ created_at      │
│ checked_in      │    └─────────────────┘
│ created_at      │
└─────────────────┘    ┌─────────────────┐    ┌─────────────────┐
                       │     polls       │    │   highlights    │
┌─────────────────┐    ├─────────────────┤    ├─────────────────┤
│   leaderboard   │    │ id (uuid)       │    │ id (uuid)       │
├─────────────────┤    │ question        │    │ type            │
│ id (uuid)       │    │ options[]       │    │ title           │
│ user_name       │    │ votes (jsonb)   │    │ content         │
│ points          │    │ active          │    │ image_url       │
│ photos_uploaded │    │ created_at      │    │ created_at      │
│ polls_participated│   └─────────────────┘    └─────────────────┘
│ chat_messages   │
│ updated_at      │
└─────────────────┘
```

## 🔧 Configuration Options

### Environment Variables
```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Custom Branding
Update these files to customize the branding:
- `tailwind.config.js` - Brand colors
- `src/app/layout.tsx` - Meta tags and title
- `public/` - Favicons and logos

## 📱 Features Included

✅ **Core Features (All Implemented)**
- Real-time event schedule with live updates
- HD photo gallery with real-time uploads
- E-commerce shop (Sip & Shop) with cart functionality
- Spin-to-win prize wheel game
- Live chat with emoji reactions
- Real-time polls and voting
- Event highlights and news feed
- QR code registration and check-in system

✅ **Advanced Features (All Implemented)**
- 🏆 **Leaderboard & Social Wall** - Real-time user rankings
- 💝 **Post-Event Memory Mode** - Event recap and memories
- 🌍 **Multilingual Support** - English/Kiswahili
- 📱 **Mobile-First Design** - Responsive navigation
- ⚡ **Real-time Updates** - Supabase integration
- 🔄 **Loading Screens** - Polished UX

✅ **Technical Excellence**
- TypeScript for type safety
- Supabase for real-time backend
- Mobile-responsive design
- SEO optimized
- Production-ready build

## 🚀 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting for faster loading
- Efficient state management
- Real-time subscriptions only when needed
- Lazy loading for better performance

## 📈 Analytics & Monitoring

Connect these services for production monitoring:
- Google Analytics for user tracking
- Sentry for error monitoring
- Vercel Analytics for performance insights

## 🎯 Go-Live Checklist

- [ ] Supabase database set up and configured
- [ ] Environment variables configured
- [ ] Domain name configured (optional)
- [ ] SSL certificate active
- [ ] Test all real-time features
- [ ] Test on mobile devices
- [ ] Load test with multiple users
- [ ] Backup strategy in place

Your Vitapharm Beauty & Academy Launch event app is now ready for the July 5, 2025 event! 🎉
