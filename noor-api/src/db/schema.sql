-- ============================================================
-- NOOR Global Islamic Platform — PostgreSQL Database Schema
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users & Authentication (Profiles table linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en',
    prayer_calc_method VARCHAR(50) DEFAULT 'MWL',
    asr_madhab VARCHAR(20) DEFAULT 'standard',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    city TEXT,
    country TEXT,
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Prayer Logs (Tracking daily prayers)
CREATE TABLE IF NOT EXISTS public.prayer_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    prayer_name VARCHAR(20) NOT NULL, -- fajr, dhuhr, asr, maghrib, isha
    status VARCHAR(20) NOT NULL,      -- prayed, prayed_jamaah, missed, excused
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date, prayer_name)
);

-- 3. Quran Progress & Bookmarks
CREATE TABLE IF NOT EXISTS public.quran_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quran_reading_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    last_surah INT NOT NULL,
    last_ayah INT NOT NULL,
    total_ayahs_read INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dhikr & Tasbih Logs
CREATE TABLE IF NOT EXISTS public.dhikr_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    dhikr_phrase TEXT NOT NULL,
    count INT NOT NULL DEFAULT 0,
    target_count INT DEFAULT 33,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Content Management (Articles, Videos, Announcements)
CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- seerah, tafsir, fiqh, ramadan, etc.
    content_type VARCHAR(20) NOT NULL, -- article, video, podcast
    body TEXT,
    thumbnail_url TEXT,
    media_url TEXT,
    author_name TEXT,
    published_status VARCHAR(20) DEFAULT 'draft',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for scale
CREATE INDEX IF NOT EXISTS idx_prayer_logs_user_date ON public.prayer_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content_items(slug);
CREATE INDEX IF NOT EXISTS idx_content_status_cat ON public.content_items(published_status, category);
