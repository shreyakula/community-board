# Anime Archive

## Description

Anime Archive is a community watch board for anime fans. It displays a curated collection of 12 must-watch anime titles in a magazine-style editorial layout inspired by print publications like Pitchfork and Vogue. Users can browse titles, search by name or genre, and filter by airing status. Cover art is fetched live from the Jikan API (MyAnimeList) so images are always up to date.

## Demo

![Walkthrough](walkthrough_small.gif)

## Features

### Required Features

- [x] The app has a cohesive, unique theme for events or resources relevant to a specific community
  - [x] Header/title describing the theme is displayed
- [x] At least 10 unique events or resources are displayed in a responsive card format
  - [x] There are at least 10 cards displayed for 10 different events
  - [x] The cards are displayed in an organized format (grid)
  - [x] Each card includes information about the event or resource

### Stretch Features

- [x] Buttons or links to related resources are on each card component
- [x] The site is responsive for both desktop and mobile formats

## How to Run

```bash
npm install
npm run dev
```

## Tech Stack

- React 18
- Vite
- Jikan API (MyAnimeList) for live cover images
- Google Fonts — Playfair Display + Barlow
