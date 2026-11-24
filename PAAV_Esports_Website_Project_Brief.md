# PAAV Esports Website --- Frontend Project Brief

## 1. Project Overview

Build a modern, responsive website for **PAAV Esports** that serves as
the central entry point for the organisation's tournament history and
upcoming seasons.

The website should present all five existing seasons in one place, let
visitors explore each season, learn about PAAV Esports, and register
their interest in the next season.

The initial release is **frontend-only**. Do not build or assume a
backend, database, authentication system, or live tournament API.

## 2. Project Goals

-   Establish a central online presence for PAAV Esports.
-   Showcase the journey and history of Seasons 1--5.
-   Give every season a clear place for its own information and media.
-   Promote the upcoming season.
-   Provide a simple registration form UI for the next season.
-   Deliver a polished experience on desktop, tablet, and mobile.

## 3. Visual Direction

Create a premium esports / competitive gaming aesthetic.

### Design language

-   Dark, cinematic visual style.
-   Black and charcoal backgrounds with a strong accent colour.
-   Bold, modern typography and clear visual hierarchy.
-   Large tournament artwork and season-specific banners.
-   Subtle glow, gradients, borders, and hover states.
-   Smooth but restrained page transitions and scroll animations.
-   Strong contrast and accessible text sizes.
-   Responsive layouts; avoid desktop-only compositions.

Use PAAV Esports' existing logo, brand colours, tournament artwork, and
approved assets if they are provided. Do not invent official sponsors,
winners, team names, dates, statistics, or tournament results. Use
clearly labelled placeholder content where details are not yet
available.

## 4. Site Structure

### Main navigation

-   Home
-   Seasons
    -   Season 1
    -   Season 2
    -   Season 3
    -   Season 4
    -   Season 5
-   About
-   Register for Next Season

Include a clear call-to-action in the navigation for the upcoming
season. On mobile, use an accessible menu that can be opened and closed.

## 5. Pages and Sections

### 5.1 Home page

The home page is the main entry point.

Recommended sections:

1.  **Hero section**
    -   PAAV Esports branding.
    -   A strong headline, for example: "Every Season. Every Battle. One
        Legacy."
    -   Short introduction to the tournament.
    -   Primary CTA: "Explore Seasons".
    -   Secondary CTA: "Register for Next Season".
    -   Large esports-themed background artwork or video placeholder.
2.  **About preview**
    -   A short introduction to PAAV Esports.
    -   A link to the full About section/page.
3.  **Season archive**
    -   Display Season 1 through Season 5 as cards.
    -   Each card should include season number/name, artwork, a short
        description, and an "Explore Season" action.
    -   Make the current or latest season visually distinct only when
        that status is confirmed.
4.  **Upcoming season**
    -   A promotional banner for the next season.
    -   A short call-to-action leading to the registration form.
    -   Do not display an invented start date or countdown.
5.  **Footer**
    -   PAAV Esports logo/name.
    -   Navigation links.
    -   Social links only when official URLs are supplied.
    -   Copyright line.

### 5.2 Seasons overview

Create a dedicated Seasons page or section showing all five seasons in a
consistent card grid.

Each season card should navigate to its own detail page. Keep the card
layout consistent while allowing each season to use its own artwork and
content.

### 5.3 Individual season detail pages

Create a reusable season detail page template, populated with
season-specific static data.

Suggested content:

-   Season banner / cover artwork.
-   Season title and short introduction.
-   Overview and format.
-   Tournament highlights.
-   Participating teams or players, if information is supplied.
-   Winners and results, if confirmed.
-   Gallery for images and videos.
-   Related links or social content, if supplied.
-   A link back to the season archive.

Do not fabricate historical details. If content is unavailable, use
clearly marked placeholders or hide that section until content is
provided.

### 5.4 About PAAV page or section

Include:

-   What PAAV Esports is.
-   Its purpose and community.
-   A short tournament journey / history.
-   Relevant imagery.
-   Official social links, when available.

Use editable placeholder copy until the official About content is
supplied.

### 5.5 Upcoming season registration

Create a simple, visually consistent registration page or section.

Suggested fields:

-   Team name.
-   Team leader name.
-   Contact number.
-   Email address.
-   Discord ID (optional).
-   Player / team roster details.

Form requirements:

-   Clearly label every field.
-   Mark required and optional fields.
-   Validate required fields and email format on the client.
-   Show helpful inline validation messages.
-   Provide a clear submit button and loading/success/error UI states as
    appropriate.
-   Since there is no backend in this phase, do not claim that a
    registration has been saved or officially submitted.
-   For the frontend demo, show a clear demo confirmation after valid
    submission and explain that backend integration is pending.
-   Do not collect unnecessary personal information.

## 6. Frontend-Only Scope

### Included

-   Responsive page layouts.
-   Navigation and routing.
-   Reusable UI components.
-   Static season content stored locally in structured data.
-   Client-side form validation.
-   Interactive buttons, menus, tabs, and cards.
-   Motion and hover interactions where they improve usability.
-   Empty, error, and success presentation states for the frontend demo.

### Not included in this phase

-   Backend APIs.
-   Database or persistent form submissions.
-   User accounts or authentication.
-   Admin dashboard or content management system.
-   Live match scores, brackets, or tournament integrations.
-   Payment processing.
-   Email, SMS, or Discord notifications.

Keep the code structured so backend registration and a content
management system can be integrated later without redesigning the entire
frontend.

## 7. Suggested Technology

Use the following stack unless the existing repository requires
something different:

-   **Next.js** with App Router.
-   **TypeScript**.
-   **Tailwind CSS** for styling.
-   **Framer Motion** for purposeful animations, if needed.
-   Reusable React components.
-   Local TypeScript data objects for season content.

Avoid adding unnecessary dependencies. Use semantic HTML and accessible
controls.

## 8. Suggested Component Structure

``` text
src/
  app/
    page.tsx
    about/
      page.tsx
    seasons/
      page.tsx
      [season]/
        page.tsx
    register/
      page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx
    home/
      HeroSection.tsx
      AboutPreview.tsx
      SeasonGrid.tsx
      UpcomingSeasonBanner.tsx
    seasons/
      SeasonCard.tsx
      SeasonHero.tsx
      SeasonOverview.tsx
      SeasonGallery.tsx
    registration/
      RegistrationForm.tsx
      FormField.tsx
  data/
    seasons.ts
  types/
    season.ts
  public/
    images/
    videos/
```

This is a suggested structure, not a requirement to create every file if
a simpler structure is more suitable.

## 9. Suggested Season Data Model

Keep season content in one structured local data source so that cards
and detail pages use the same information.

``` ts
export type Season = {
  slug: string;
  number: number;
  title: string;
  shortDescription: string;
  description?: string;
  bannerImage?: string;
  status?: "completed" | "upcoming" | "in-progress";
  highlights?: string[];
  winners?: string[];
  gallery?: string[];
};

export const seasons: Season[] = [
  {
    slug: "season-1",
    number: 1,
    title: "Season 1",
    shortDescription: "Season introduction and highlights.",
  },
  {
    slug: "season-2",
    number: 2,
    title: "Season 2",
    shortDescription: "Season introduction and highlights.",
  },
  {
    slug: "season-3",
    number: 3,
    title: "Season 3",
    shortDescription: "Season introduction and highlights.",
  },
  {
    slug: "season-4",
    number: 4,
    title: "Season 4",
    shortDescription: "Season introduction and highlights.",
  },
  {
    slug: "season-5",
    number: 5,
    title: "Season 5",
    shortDescription: "Season introduction and highlights.",
  },
];
```

Replace placeholder copy and add verified details when the official
season information and assets are available.

## 10. Responsive and Accessibility Requirements

-   Design mobile-first and test common desktop, tablet, and mobile
    widths.
-   Ensure navigation works with keyboard and touch.
-   Use semantic headings, buttons, links, and form labels.
-   Provide visible focus states.
-   Add meaningful alt text to informative images.
-   Respect reduced-motion preferences.
-   Maintain readable contrast and avoid text embedded in images where
    possible.
-   Prevent horizontal overflow and layout shifts.

## 11. Quality Checklist

-   [ ] Home page clearly introduces PAAV Esports.
-   [ ] All five seasons are visible in the season archive.
-   [ ] Each season card opens the correct detail page.
-   [ ] Season detail pages use a reusable template.
-   [ ] About content is present or clearly marked as placeholder.
-   [ ] Upcoming season CTA opens the registration page/section.
-   [ ] Registration form validates input on the client.
-   [ ] Frontend demo does not claim to persist or submit registrations.
-   [ ] Navigation and footer work on all screen sizes.
-   [ ] No invented tournament facts, results, sponsors, or dates.
-   [ ] No broken images, links, or console errors.
-   [ ] Project builds successfully.

## 12. Development Instructions for an AI Coding Assistant

Before coding, inspect the existing repository and identify its
framework, package manager, styling setup, and current conventions.
Reuse the existing setup where possible rather than replacing
configuration unnecessarily.

Then implement the website in stages:

1.  Set up the shared layout, typography, colour tokens, navigation, and
    footer.
2.  Build the home page and season archive.
3.  Add dynamic season detail pages driven by local data.
4.  Add the About page/section.
5.  Build the registration form with client-side validation and
    demo-only submission behaviour.
6.  Add responsive behaviour, accessibility, and restrained animations.
7.  Run the available lint, type-check, and build commands; fix issues.

Prioritise a cohesive, production-quality UI over excessive animation or
decorative effects. Keep components reusable and code maintainable.

## 13. Information Needed Before Final Content

The following assets and details can be added when available:

-   Official PAAV Esports logo.
-   Brand colours and fonts, if defined.
-   Season 1--5 posters, banners, and gallery images.
-   Verified season descriptions, dates, formats, winners, and results.
-   Official social media URLs.
-   Upcoming season details and registration rules.
-   Final registration fields and privacy wording.

**Final outcome:** A polished PAAV Esports website that introduces the
brand, preserves the story of its five seasons, and gives visitors a
clear way to express interest in the next season --- with the first
release implemented entirely on the frontend.
