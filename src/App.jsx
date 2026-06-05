import { useState } from 'react'
import Card from './components/Card'
import './App.css'

const anime = [
  {
    id: 1,
    title: 'Attack on Titan',
    genre: 'Action · Dark Fantasy',
    episodes: 87,
    status: 'Finished',
    rating: 9.0,
    year: 2013,
    description: 'Humanity fights for survival against giant humanoid Titans. One of the most gripping, gut-wrenching stories ever told in the medium.',
    image: 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg',
    link: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin',
  },
  {
    id: 2,
    title: 'Fullmetal Alchemist: Brotherhood',
    genre: 'Adventure · Fantasy',
    episodes: 64,
    status: 'Finished',
    rating: 9.1,
    year: 2009,
    description: "Two brothers chase the Philosopher's Stone after alchemy goes catastrophically wrong. The benchmark for what anime storytelling can be.",
    image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    link: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
  },
  {
    id: 3,
    title: 'Death Note',
    genre: 'Thriller · Supernatural',
    episodes: 37,
    status: 'Finished',
    rating: 8.6,
    year: 2006,
    description: 'A notebook that kills anyone whose name is written in it. A student who thinks he can fix the world. A detective who suspects everything.',
    image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    link: 'https://myanimelist.net/anime/1535/Death_Note',
  },
  {
    id: 4,
    title: 'Demon Slayer',
    genre: 'Action · Historical',
    episodes: 44,
    status: 'Airing',
    rating: 8.7,
    year: 2019,
    description: "Ufotable's animation redefined what the medium looks like. The story matches the spectacle — emotional, brutal, and beautifully human.",
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    link: 'https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba',
  },
  {
    id: 5,
    title: 'Hunter x Hunter',
    genre: 'Adventure · Fantasy',
    episodes: 148,
    status: 'Finished',
    rating: 9.0,
    year: 2011,
    description: 'Starts as a classic shounen adventure and quietly becomes one of the darkest, most psychologically complex stories in all of anime.',
    image: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    link: 'https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011',
  },
  {
    id: 6,
    title: 'Jujutsu Kaisen',
    genre: 'Action · Supernatural',
    episodes: 48,
    status: 'Airing',
    rating: 8.6,
    year: 2020,
    description: 'Curses, sorcerers, and a protagonist who swallowed a finger. Modern shonen at its most visceral, with fights that genuinely hurt to watch.',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    link: 'https://myanimelist.net/anime/40748/Jujutsu_Kaisen',
  },
  {
    id: 7,
    title: 'Vinland Saga',
    genre: 'Historical · Drama',
    episodes: 48,
    status: 'Finished',
    rating: 8.8,
    year: 2019,
    description: 'Vikings, vengeance, and the slow realization that strength alone cannot make a man free. A masterwork of historical drama.',
    image: 'https://cdn.myanimelist.net/images/anime/1500/103005.jpg',
    link: 'https://myanimelist.net/anime/37521/Vinland_Saga',
  },
  {
    id: 8,
    title: 'Steins;Gate',
    genre: 'Sci-Fi · Thriller',
    episodes: 24,
    status: 'Finished',
    rating: 9.1,
    year: 2011,
    description: 'Time travel invented by accident, in a lab above a TV repair shop. Slow, meticulous, and then suddenly devastating.',
    image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    link: 'https://myanimelist.net/anime/9253/Steins_Gate',
  },
  {
    id: 9,
    title: 'Cowboy Bebop',
    genre: 'Sci-Fi · Neo-noir',
    episodes: 26,
    status: 'Finished',
    rating: 8.8,
    year: 1998,
    description: 'Jazz. Blues. Bounty hunters adrift in 2071. A show about people running from who they are, set to the best soundtrack in anime history.',
    image: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
    link: 'https://myanimelist.net/anime/1/Cowboy_Bebop',
  },
  {
    id: 10,
    title: 'One Punch Man',
    genre: 'Action · Comedy',
    episodes: 24,
    status: 'Airing',
    rating: 8.7,
    year: 2015,
    description: 'The strongest hero alive can end any fight with one punch — and is completely miserable about it. A brilliant deconstruction of the genre.',
    image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
    link: 'https://myanimelist.net/anime/30276/One_Punch_Man',
  },
  {
    id: 11,
    title: 'Neon Genesis Evangelion',
    genre: 'Mecha · Psychological',
    episodes: 26,
    status: 'Finished',
    rating: 8.5,
    year: 1995,
    description: 'Giant mechs, angels, and a depressed teenager who cannot bring himself to run away. The most influential and dissected anime ever made.',
    image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    link: 'https://myanimelist.net/anime/30/Neon_Genesis_Evangelion',
  },
  {
    id: 12,
    title: 'Chainsaw Man',
    genre: 'Action · Horror',
    episodes: 12,
    status: 'Airing',
    rating: 8.6,
    year: 2022,
    description: 'Chainsaws for arms, a devil for a heart, and nothing left to lose. MAPPA directed this like a feature film and it absolutely shows.',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
    link: 'https://myanimelist.net/anime/44511/Chainsaw_Man',
  },
]

const filters = ['All', 'Airing', 'Finished']

function App() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = anime.filter(a => {
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.genre.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'All' || a.status === activeFilter
    return matchesQuery && matchesFilter
  })

  const featured = anime[0]

  return (
    <div className="app">

      <header className="site-header">
        <div className="logo">
          <div className="logo-title">Anime Archive</div>
          <div className="logo-sub">The Community Watch Board</div>
        </div>
      </header>

      <div className="issue-bar">
        <div className="issue-bar-left">
          <span>Now Watching</span>
          12 titles curated by the community &mdash; updated June 2026
        </div>
        <div className="issue-bar-right">
          <div className="search-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search"
              type="text"
              placeholder="Search titles…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-kicker">Editor's Pick</div>
            <h1>Your next<br /><em>obsession</em><br />is in here.</h1>
            <p className="hero-desc">
              A hand-picked collection of anime that define the medium.
              From legendary classics to shows still unfolding — this is where to start.
            </p>
          </div>
          <div className="hero-featured">
            <div className="hero-featured-label">Currently Featured</div>
            <img className="hero-featured-img" src={featured.image} alt={featured.title} />
            <div className="hero-featured-title">{featured.title}</div>
            <div className="hero-featured-meta">{featured.genre} &middot; {featured.year} &middot; {featured.episodes} eps</div>
          </div>
        </div>
      </section>

      <p className="section-label">{filtered.length} title{filtered.length !== 1 ? 's' : ''}</p>

      <main className="card-container">
        {filtered.map(show => (
          <Card key={show.id} {...show} />
        ))}
      </main>

      <footer>
        <div className="footer-left">&#169; 2026 Anime Archive &mdash; Built with React + Vite</div>
        <div className="footer-logo">Anime Archive</div>
        <nav className="footer-right">
          <a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer">MAL</a>
          <a href="https://anilist.co" target="_blank" rel="noopener noreferrer">AniList</a>
          <a href="https://www.crunchyroll.com" target="_blank" rel="noopener noreferrer">Crunchyroll</a>
        </nav>
      </footer>

    </div>
  )
}

export default App
