import { useState, useEffect } from 'react'
import Card from './components/Card'
import './App.css'

const animeList = [
  { id: 16498, title: 'Attack on Titan',                  genre: 'Action · Dark Fantasy',    episodes: 87,  status: 'Finished', rating: 9.0, year: 2013, description: 'Humanity fights for survival against giant humanoid Titans. One of the most gripping, gut-wrenching stories ever told in the medium.',                             link: 'https://myanimelist.net/anime/16498' },
  { id: 5114,  title: 'Fullmetal Alchemist: Brotherhood', genre: 'Adventure · Fantasy',       episodes: 64,  status: 'Finished', rating: 9.1, year: 2009, description: "Two brothers chase the Philosopher's Stone after alchemy goes catastrophically wrong. The benchmark for what anime storytelling can be.",                   link: 'https://myanimelist.net/anime/5114'  },
  { id: 1535,  title: 'Death Note',                       genre: 'Thriller · Supernatural',  episodes: 37,  status: 'Finished', rating: 8.6, year: 2006, description: 'A notebook that kills anyone whose name is written in it. A student who thinks he can fix the world. A detective who suspects everything.',             link: 'https://myanimelist.net/anime/1535'  },
  { id: 38000, title: 'Demon Slayer',                     genre: 'Action · Historical',       episodes: 44,  status: 'Airing',   rating: 8.7, year: 2019, description: "Ufotable's animation redefined what the medium looks like. The story matches the spectacle — emotional, brutal, and beautifully human.",               link: 'https://myanimelist.net/anime/38000' },
  { id: 11061, title: 'Hunter x Hunter',                  genre: 'Adventure · Fantasy',       episodes: 148, status: 'Finished', rating: 9.0, year: 2011, description: 'Starts as a classic shounen adventure and quietly becomes one of the darkest, most psychologically complex stories in all of anime.',                    link: 'https://myanimelist.net/anime/11061' },
  { id: 40748, title: 'Jujutsu Kaisen',                   genre: 'Action · Supernatural',     episodes: 48,  status: 'Airing',   rating: 8.6, year: 2020, description: 'Curses, sorcerers, and a protagonist who swallowed a finger. Modern shonen at its most visceral, with fights that genuinely hurt to watch.',            link: 'https://myanimelist.net/anime/40748' },
  { id: 37521, title: 'Vinland Saga',                     genre: 'Historical · Drama',        episodes: 48,  status: 'Finished', rating: 8.8, year: 2019, description: 'Vikings, vengeance, and the slow realization that strength alone cannot make a man free. A masterwork of historical drama.',                              link: 'https://myanimelist.net/anime/37521' },
  { id: 9253,  title: 'Steins;Gate',                      genre: 'Sci-Fi · Thriller',         episodes: 24,  status: 'Finished', rating: 9.1, year: 2011, description: 'Time travel invented by accident, in a lab above a TV repair shop. Slow, meticulous, and then suddenly devastating.',                                   link: 'https://myanimelist.net/anime/9253'  },
  { id: 1,     title: 'Cowboy Bebop',                     genre: 'Sci-Fi · Neo-noir',         episodes: 26,  status: 'Finished', rating: 8.8, year: 1998, description: 'Jazz. Blues. Bounty hunters adrift in 2071. A show about people running from who they are, set to the best soundtrack in anime history.',                link: 'https://myanimelist.net/anime/1'     },
  { id: 30276, title: 'One Punch Man',                    genre: 'Action · Comedy',           episodes: 24,  status: 'Airing',   rating: 8.7, year: 2015, description: 'The strongest hero alive can end any fight with one punch — and is completely miserable about it. A brilliant deconstruction of the genre.',           link: 'https://myanimelist.net/anime/30276' },
  { id: 30,    title: 'Neon Genesis Evangelion',          genre: 'Mecha · Psychological',     episodes: 26,  status: 'Finished', rating: 8.5, year: 1995, description: 'Giant mechs, angels, and a depressed teenager who cannot bring himself to run away. The most influential and dissected anime ever made.',                link: 'https://myanimelist.net/anime/30'    },
  { id: 44511, title: 'Chainsaw Man',                     genre: 'Action · Horror',           episodes: 12,  status: 'Airing',   rating: 8.6, year: 2022, description: 'Chainsaws for arms, a devil for a heart, and nothing left to lose. MAPPA directed this like a feature film and it absolutely shows.',                  link: 'https://myanimelist.net/anime/44511' },
]

const filters = ['All', 'Airing', 'Finished']

function App() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [images, setImages] = useState({})

  useEffect(() => {
    animeList.forEach(async (anime) => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime.id}`)
        const data = await res.json()
        const img = data?.data?.images?.jpg?.large_image_url
        if (img) setImages(prev => ({ ...prev, [anime.id]: img }))
      } catch (e) {}
    })
  }, [])

  const filtered = animeList.filter(a => {
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.genre.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'All' || a.status === activeFilter
    return matchesQuery && matchesFilter
  })

  const featured = animeList[0]

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
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-kicker">Editor&apos;s Pick</div>
            <h1>Your next<br /><em>obsession</em><br />is in here.</h1>
            <p className="hero-desc">A hand-picked collection of anime that define the medium. From legendary classics to shows still unfolding &mdash; this is where to start.</p>
          </div>
          <div className="hero-featured">
            <div className="hero-featured-label">Currently Featured</div>
            {images[featured.id]
              ? <img className="hero-featured-img" src={images[featured.id]} alt={featured.title} />
              : <div className="hero-featured-placeholder" />}
            <div className="hero-featured-title">{featured.title}</div>
            <div className="hero-featured-meta">{featured.genre} &middot; {featured.year} &middot; {featured.episodes} eps</div>
          </div>
        </div>
      </section>

      <p className="section-label">{filtered.length} title{filtered.length !== 1 ? 's' : ''}</p>

      <main className="card-container">
        {filtered.map(show => (
          <Card key={show.id} {...show} image={images[show.id]} />
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
