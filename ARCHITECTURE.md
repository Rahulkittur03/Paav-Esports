# 📐 Project Architecture, UI/UX Design System & Redux Toolkit Blueprint

> **Starter Guide & Architecture Standard**  
> Use this specification as a blueprint and reusable standard for other repositories, web applications, and e-commerce/gaming portals.

---

## 📑 Table of Contents
1. [Tech Stack & Core Technologies](#1-tech-stack--core-technologies)
2. [Folder & Directory Structure](#2-folder--directory-structure)
3. [Design System, Colors & Typography](#3-design-system-colors--typography)
4. [UI/UX Patterns & Micro-Interactions](#4-uiux-patterns--micro-interactions)
5. [Redux Toolkit (RTK) Architecture](#5-redux-toolkit-rtk-architecture)
6. [Contexts vs. Redux: State Separation Principle](#6-contexts-vs-redux-state-separation-principle)
7. [New Implementation Step-by-Step Guide](#7-new-implementation-step-by-step-guide)
8. [Best Practices, Code Quality & Conventions](#8-best-practices-code-quality--conventions)

---

## 1. Tech Stack & Core Technologies

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.x` / `15.x` | React Server Components, server actions & file-based routing |
| **View Library** | React | `19.x` | Modern component architecture, hooks & concurrent rendering |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/postcss` | `^4.x` | Utility-first CSS, modern CSS nesting & theme variables |
| **Global State** | `@reduxjs/toolkit` + `react-redux` | `^2.x` / `^9.x` | Async server data fetching, entity caching, typed dispatch |
| **Local / Session State** | React Context (`CartContext`, `TransitionContext`) | Native | Instant UI state (cart persistence, cross-route wipes, transitions) |
| **Animations** | GSAP (`^3.15`) + Motion (`motion/react` `^12.x`) | Latest | High-performance hero animations, marquees, spring transitions |
| **Icons** | Lucide React | `^1.x` | Clean, lightweight SVG icon system |
| **Database / Auth** | Supabase (`@supabase/supabase-js`) | `^2.x` | PostgreSQL backend, storage, edge functions, admin auth |
| **Toast Notifications** | Sonner | `^2.x` | Modern stacked toasts with dark-mode styling |
| **Image Compression** | `browser-image-compression` | `^2.x` | Client-side optimization before uploading to cloud storage |

---

## 2. Folder & Directory Structure

Adopt this scalable feature-driven architecture:

```text
├── app/                        # Next.js App Router (pages, layouts, route handlers)
│   ├── (public)/               # Main user-facing pages
│   │   ├── page.tsx            # Landing / Homepage
│   │   ├── shop/               # Shop grid & [slug] dynamic product view
│   │   ├── vp/                 # Currency / Points packages
│   │   ├── cart/               # Cart checkout review & WhatsApp integration
│   │   ├── review/             # User reviews and rating breakdown
│   │   ├── contact/            # Contact channels & contact form
│   │   └── terms/ / privacy/   # Legal documentation
│   ├── admin/                  # Protected management dashboard
│   │   ├── dashboard/          # Tabs for products, reviews, inquiries
│   │   └── page.tsx            # Admin authentication / login gate
│   ├── api/                    # Serverless route handlers (/api/products, /api/auth, etc.)
│   ├── layout.tsx              # Root layout (Fonts, Providers, Navbar, Footer)
│   └── globals.css             # Tailwind v4 import, custom keyframes & design variables
│
├── components/                 # Presentation & UI Components
│   ├── Common/                 # Shared widgets (Navbar, Footer, Search, Navigation)
│   ├── ui/                     # Primitives (ScrollReveal, AnimatedCounter, CursorGlow, Marquee)
│   ├── home-page/              # Section components for landing page
│   ├── shop/                   # ProductCard, ProductDetailClient, SkinPicker
│   ├── admin/                  # AdminTable, AdminModal, DeleteConfirm modal
│   └── review/                 # ReviewCard, WriteReviewForm, ReviewStats
│
├── contexts/                   # React Context Providers (Fast UI & session-bound states)
│   ├── CartContext.tsx         # LocalStorage backed cart operations
│   └── TransitionContext.tsx   # Smooth page-to-page exit/entry transitions
│
├── features/                   # Redux Toolkit Slices & Thunks (Divided by domain)
│   ├── products/               # Public products fetch & slice
│   ├── admin/                  # Admin product toggle, status mutations
│   ├── reviews/                # Reviews read & submission thunks
│   ├── contacts/               # Contact message submission thunks
│   └── valorant/               # Custom game data/skins search slice
│
├── hooks/                      # Custom Reusable React Hooks
│   ├── useAdminAuth.ts         # Session verification and role check
│   ├── useScrollReveal.ts      # Intersection observer triggers
│   └── useCountUp.ts           # Interpolated numeric counters
│
├── store/                      # Redux Root Store Configuration
│   ├── store.ts                # configureStore setup & RootState/AppDispatch exports
│   ├── hooks.ts                # Typed useAppDispatch and useAppSelector
│   └── ReduxProvider.tsx       # "use client" Provider wrapper for Root Layout
│
├── utils/                      # Utilities, API Config, Constants & Route Constants
│   ├── routes.ts               # Centralized endpoint & client route URLs
│   ├── config.ts               # Brand constants, social URLs, site meta
│   ├── axiosInstance.ts        # Configured HTTP client with interceptors
│   ├── products.ts             # Rank colors, badges, mock fallbacks
│   └── supabaseClient.ts       # Supabase client instantiation
└── public/                     # Static media, icons, brand assets, logos
```

---

## 3. Design System, Colors & Typography

### 🎨 Color Palette (Cyber / Gaming Dark Theme)

The UI leverages a high-contrast dark aesthetic with deep carbon blacks, neutral zinc surfaces, electric crimson/red accents, and emerald/cyan indicators:

| Token / Usage | Hex / Tailwind Value | Purpose |
| :--- | :--- | :--- |
| **Background (Deep Dark)** | `#080808` / `#0d0d0d` (`bg-[#0d0d0d]`) | Main canvas, navbar backdrop, hero backdrop |
| **Card / Surface Default** | `rgba(255, 255, 255, 0.05)` (`bg-white/5`) | Card backgrounds, section containers, panels |
| **Surface Hover / Active** | `rgba(255, 255, 255, 0.08)` to `0.10` | Hover states, tab pills, button backgrounds |
| **Border Subtle** | `rgba(255, 255, 255, 0.10)` (`border-white/10`) | Default subtle borders on cards, inputs, nav |
| **Border Hover / Focus** | `rgba(255, 255, 255, 0.25)` or `red-500/50` | Interactive card hover borders, focused inputs |
| **Primary Accent (Brand Red)**| `#ef4444` (`red-500`) / `#dc2626` (`red-600`)| Call-to-actions, badges, brand logos, active glows |
| **Accent Glow** | `rgba(239, 68, 68, 0.35)` to `0.6` | Drop shadows, radial glow, neon text highlights |
| **Positive / Verified** | `#10b981` (`emerald-500`) / `#059669` | Instant delivery tags, stock status, verified badges |
| **Warning / Rating** | `#f59e0b` (`amber-500`) / `#eab308` | Star ratings, highlight badges, tier markers |
| **Muted Text** | `text-white/40` to `text-white/60` | Descriptions, timestamps, secondary parameters |
| **Headings & Body Text** | `#ffffff` (`text-white`) | Primary titles, price tags, emphasized text |

### 🏆 Rank Badges & Game Category Accents
```typescript
// Standardized Badge & Tier Color Tokens
export const RANK_COLORS = {
  Iron:      "text-gray-400 border-gray-500/30",
  Bronze:    "text-orange-700 border-orange-700/30",
  Silver:    "text-gray-300 border-gray-300/30",
  Gold:      "text-yellow-400 border-yellow-400/30",
  Platinum:  "text-cyan-400 border-cyan-400/30",
  Diamond:   "text-blue-400 border-blue-400/30",
  Ascendant: "text-emerald-400 border-emerald-400/30",
  Immortal:  "text-red-400 border-red-400/30",
  Radiant:   "text-yellow-300 border-yellow-300/50",
};
```

### ✍️ Typography Guidelines
- **Primary Font**: `Geist Sans` or `Inter` (`--font-geist`) for crisp numerals and modern UI readability.
- **Headings**: `tracking-widest uppercase font-extrabold` for headers, brand names, and banner typography.
- **Micro-labels**: `text-[10px]` or `text-xs font-bold tracking-wider uppercase` for tags, badges, and delivery pills.

---

## 4. UI/UX Patterns & Micro-Interactions

### 1. Card Elevation & Ambient Glow
Cards use translucent white backgrounds with subtle borders and lift on hover:
```tsx
<div className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 
                hover:border-white/20 transition-all duration-300 
                hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
  {/* Content */}
</div>
```

### 2. Cursor Glow Effect
An ambient radial gradient that follows the user's cursor across the viewport (`components/ui/CursorGlow.tsx`), providing depth without hurting performance.

### 3. Infinite Smooth Marquee
Used for sponsor bars, live stats, or customer testimonials using GSAP continuous scrolling (`components/ui/GsapMarquee.tsx`).

### 4. Custom CSS Keyframe Animations
Included in `globals.css` for consistent, lightweight UI motions:
- `animate-fade-in`: Opacity 0 to 1 with a subtle 12px Y translation.
- `animate-scale-in`: Snappy 0.95 to 1.0 scale for modals and badge counts.
- `animate-glow`: Pulsing drop shadow for hot deals and badges.
- `animate-scroll-dot`: Vertical mouse-scroll indicator for hero banners.

---

## 5. Redux Toolkit (RTK) Architecture

### A. Store Configuration (`store/store.ts`)
```typescript
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/productsSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import contactsReducer from "@/features/contacts/contactsSlice";
import adminProductsReducer from "@/features/admin/adminProductsSlice";
import skinsReducer from "@/features/valorant/skinsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    reviews: reviewsReducer,
    contacts: contactsReducer,
    adminProducts: adminProductsReducer,
    skins: skinsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### B. Typed Hooks Pattern (`store/hooks.ts`)
Always import and use `useAppDispatch` and `useAppSelector` rather than default `react-redux` hooks:
```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### C. Standard Slice Blueprint (`features/<domain>/<name>Slice.ts`)
Follow this pattern for asynchronous data handling with `createSlice` and `createAsyncThunk`:

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ROUTE_SHOP_PRODUCTS } from "@/utils/routes";

export interface Item {
  id: string;
  title: string;
  price: number;
}

interface FeatureState {
  list: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  list: [],
  loading: false,
  error: null,
};

// 1. Thunk
export const fetchItems = createAsyncThunk<Item[], void, { rejectValue: string }>(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ success: boolean; data: Item[] }>(ROUTE_SHOP_PRODUCTS);
      return response.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.error || err.message);
      }
      return rejectWithValue("Failed to fetch items");
    }
  }
);

// 2. Slice
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unexpected error occurred";
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
```

### D. Redux Provider Integration in App Router (`store/ReduxProvider.tsx`)
Because Next.js App Router defaults to Server Components, wrap the Redux Provider in a client boundary:
```tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```
Mount `ReduxProvider` inside `app/layout.tsx`.

---

## 6. Contexts vs. Redux: State Separation Principle

To keep application performance optimal and prevent Redux bloat:

| State Type | Solution | Reason |
| :--- | :--- | :--- |
| **Server Data / Entities** | **Redux Toolkit** | Products catalog, admin dashboards, reviews, skins list, asynchronous fetch lifecycles. |
| **Cart & Local Purchase State** | **React Context** (`CartContext`) | Synced with `localStorage`, high write-frequency, local quantity toggles, WhatsApp checkout payload assembly. |
| **Transitions & Page Animations** | **React Context** (`TransitionContext`) | Controls full-screen exit/entry routing animations without triggering global store redraws. |

---

## 7. New Implementation Step-by-Step Guide

Follow these steps whenever adding a new feature or copying this architecture to another repo:

### Step 1: Define API Routes & Constants
1. Add URL path to `utils/routes.ts`:
   ```typescript
   export const ROUTE_ORDERS = "/api/orders";
   ```
2. Define TypeScript models in a types file or slice (e.g., `interface Order { ... }`).

### Step 2: Implement the Feature Slice
1. Create `features/<feature>/<feature>Slice.ts`.
2. Write async thunks for GET, POST, or PUT actions with typed `rejectWithValue`.
3. Handle `.pending`, `.fulfilled`, and `.rejected` states in `extraReducers`.
4. Register the new reducer in `store/store.ts`.

### Step 3: Create Serverless API Handler
1. Create `app/api/<feature>/route.ts`.
2. Handle validation, database interaction via Supabase or ORM, and return standard format:
   ```typescript
   return NextResponse.json({ success: true, data: result });
   ```

### Step 4: Build Client View Components
1. Create client component in `components/<feature>/<Feature>Client.tsx`.
2. Consume state via `useAppDispatch` and `useAppSelector`:
   ```tsx
   "use client";
   import { useEffect } from "react";
   import { useAppDispatch, useAppSelector } from "@/store/hooks";
   import { fetchItems } from "@/features/items/itemsSlice";

   export default function ItemsView() {
     const dispatch = useAppDispatch();
     const { list, loading, error } = useAppSelector((state) => state.items);

     useEffect(() => {
       dispatch(fetchItems());
     }, [dispatch]);

     if (loading) return <div>Loading...</div>;
     return <div>{list.map(i => <div key={i.id}>{i.title}</div>)}</div>;
   }
   ```
3. Attach modern UI tokens (`bg-white/5`, `border-white/10`, `rounded-2xl`, hover states).

---

## 8. Best Practices, Code Quality & Conventions

1. **Strict Type Safety**:
   - Never use `any`. Always declare models for entities, thunk arguments, and API returns.
2. **Centralized Routes**:
   - Avoid hardcoded URLs inside components or thunks; consume `utils/routes.ts`.
3. **Mobile-First Responsiveness**:
   - Ensure grids use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
4. **Optimistic Updates**:
   - For fast UI feedback (such as admin toggle switches or cart item additions), update local state immediately and roll back on error.
5. **Next.js Server / Client Split**:
   - Keep page metadata generation on server (`page.tsx`) and delegate interactive views to a client component (e.g., `ShopClient.tsx`).
