import { useEffect, useMemo, useState } from 'react';
import {
  cases,
  evidence,
  getCase,
  getEvidenceForCase,
  gestaltShowcase,
  imageUrls,
  principleLabels,
  timelineEvents,
} from './data';

const navItems = [
  { href: '/', label: 'Home', short: '00' },
  { href: '/archive', label: 'Archive', short: '01' },
  { href: '/evidence', label: 'Evidence Room', short: '02' },
  { href: '/timeline', label: 'Timeline', short: '03' },
  { href: '/process', label: 'Design Process', short: '04' },
];

function routeFromPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { type: 'home' };
  if (path === '/archive') return { type: 'archive' };
  if (path === '/evidence') return { type: 'evidence' };
  if (path === '/timeline') return { type: 'timeline' };
  if (path === '/process') return { type: 'process' };
  if (path.startsWith('/cases/')) return { type: 'case', slug: path.split('/')[2] };
  return { type: 'not-found' };
}

function G({ active, principle, tag = 'div', className = '', children, ...props }) {
  const Tag = tag;
  return (
    <Tag
      className={`${className} ${active ? 'g-highlight' : ''}`.trim()}
      data-gestalt={active ? principleLabels[principle] : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" role="presentation">
        <path d="M24 5c10.4 0 19 8.6 19 19S34.4 43 24 43 5 34.4 5 24 13.6 5 24 5Z" className="seal-ring" />
        <path d="M14 35 24 12l10 23M18.4 25h11.2" className="seal-mark" />
      </svg>
    </span>
  );
}

function SiteHeader({ activePath, gestaltOn, setGestaltOn, navigate }) {
  return (
    <header className="site-header">
      <a href="/" className="wordmark" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
        <BrandMark compact />
        <span className="wordmark-text"><strong>VANISHING</strong><em>INDEX</em></span>
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link ${activePath === item.href ? 'is-active' : ''}`}
            onClick={(event) => { event.preventDefault(); navigate(item.href); }}
          >
            <span className="nav-number">{item.short}</span>{item.label}
          </a>
        ))}
        <a
          href="/archive"
          className={`nav-link nav-link--cases ${activePath.startsWith('/cases') ? 'is-active' : ''}`}
          onClick={(event) => { event.preventDefault(); navigate('/archive'); }}
        >
          <span className="nav-number">CF</span>Case Files
        </a>
      </nav>
      <button
        type="button"
        className={`gestalt-toggle ${gestaltOn ? 'is-on' : ''}`}
        aria-pressed={gestaltOn}
        onClick={() => setGestaltOn((value) => !value)}
      >
        <span className="toggle-dot" aria-hidden="true" />
        <span>Gestalt in Action</span>
        <span className="toggle-state">{gestaltOn ? 'ON' : 'OFF'}</span>
      </button>
    </header>
  );
}

function PageIntro({ index, eyebrow, title, children, action, active }) {
  return (
    <div className="page-intro">
      <div className="page-intro-index">{index}<span>/</span>06</div>
      <div className="page-intro-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {action && <div className="page-intro-action">{action}</div>}
      <div className="page-intro-line" />
    </div>
  );
}

function SourceLink({ href, label }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      <span className="source-arrow">↗</span>{label}
    </a>
  );
}

function Home({ navigate, gestaltOn }) {
  return (
    <main className="home-screen">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-backdrop" style={{ backgroundImage: `url(${imageUrls.archiveDesk})` }} />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-side-meta">
          <span>ARCHIVE / 00</span>
          <span>FIELD NOTES · 1966—1987</span>
          <span>DESIGN FOUNDATION / 2026</span>
        </div>
        <G active={gestaltOn} principle="figure-ground" className="hero-content">
          <div className="eyebrow eyebrow--light">A DIGITAL ARCHIVE OF THE UNKNOWN</div>
          <h1 id="home-title"><span>The</span> Vanishing<br /><i>Index</i></h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">An Interactive Digital Archive of the Unknown</p>
          <p className="hero-tagline">Some things disappear.<br /><em>Their stories don't.</em></p>
          <div className="hero-actions">
            <button type="button" className="button button--bronze" onClick={() => navigate('/archive')}>
              Enter the Archive <span>→</span>
            </button>
            <button type="button" className="text-button text-button--light" onClick={() => navigate('/cases/lead-masks')}>
              Explore the cases <span>↗</span>
            </button>
          </div>
        </G>
        <div className="hero-footnote"><span className="footnote-rule" /> Contextual image — archival desk study</div>
        <G active={gestaltOn} principle="closure" className="hero-seal" aria-hidden="true"><BrandMark /><span>INDEX<br />OF THE<br />UNEXPLAINED</span></G>
      </section>
      <section className="home-brief">
        <G active={gestaltOn} principle="proximity" className="brief-statement">
          <div className="eyebrow">01 / THE ARCHIVE</div>
          <p>Three documented mysteries. One reading room for the record, the gaps around it, and the questions that survive.</p>
        </G>
        <div className="brief-grid">
          {cases.map((item) => (
            <button type="button" className="brief-case" key={item.slug} onClick={() => navigate(`/cases/${item.slug}`)}>
              <span className="brief-case-number">{item.number}</span>
              <span className="brief-case-title">{item.shortTitle}</span>
              <span className="brief-case-meta">{item.location} · {item.year}</span>
              <span className="brief-case-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function CaseCard({ item, index, navigate, gestaltOn }) {
  return (
    <G active={gestaltOn} principle={index === 0 ? 'focal-point' : 'proximity'} className={`case-card case-card--${item.accent}`}>
      <div className="case-card-image" style={{ backgroundImage: `url(${item.image})` }}>
        <span className="image-note">CONTEXTUAL IMAGE</span>
        <span className="case-card-index">CASE {item.number}</span>
      </div>
      <div className="case-card-body">
        <div className="case-card-topline"><span>{item.category}</span><span>{item.status}</span></div>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <div className="case-card-meta"><span>{item.location}</span><span>{item.year}</span></div>
        <button type="button" className="card-link" onClick={() => navigate(`/cases/${item.slug}`)}>Open case file <span>↗</span></button>
      </div>
    </G>
  );
}

function Archive({ navigate, gestaltOn }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All records');
  const categories = ['All records', ...new Set(cases.map((item) => item.category))];
  const visibleCases = cases.filter((item) => {
    const haystack = `${item.title} ${item.location} ${item.year} ${item.category} ${item.summary}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (filter === 'All records' || item.category === filter);
  });

  return (
    <main className="page page--archive">
      <PageIntro index="01" eyebrow="The index / case register" title="Archive">
        Three records held open. Search by name, place or classification, then read the case file without collapsing uncertainty into an answer.
      </PageIntro>
      <section className="archive-tools" aria-label="Archive controls">
        <label className="search-field">
          <span className="search-icon">⌕</span>
          <span className="sr-only">Search records</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, place or year…" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
        </label>
        <div className="filter-group" role="group" aria-label="Filter archive by category">
          {categories.map((category) => (
            <button key={category} type="button" className={`filter-pill ${filter === category ? 'is-selected' : ''}`} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </div>
        <span className="result-count">{String(visibleCases.length).padStart(2, '0')} / 03 records</span>
      </section>
      <section className="archive-grid" aria-live="polite">
        {visibleCases.length ? visibleCases.map((item, index) => <CaseCard key={item.slug} item={item} index={index} navigate={navigate} gestaltOn={gestaltOn} />) : (
          <div className="empty-state"><span className="eyebrow">No matching record</span><p>Try a broader search or return to all records.</p><button className="text-button" type="button" onClick={() => { setQuery(''); setFilter('All records'); }}>Reset archive ↗</button></div>
        )}
      </section>
      <div className="archive-note"><span className="note-mark">i</span><p>Classification is descriptive, not evidentiary. Unconfirmed theories are kept outside the known-facts panels.</p></div>
    </main>
  );
}

function CaseFile({ item, navigate, gestaltOn }) {
  const [tab, setTab] = useState('Overview');
  const caseEvidence = getEvidenceForCase(item.slug);
  const caseIndex = cases.findIndex((entry) => entry.slug === item.slug);
  const previous = cases[(caseIndex - 1 + cases.length) % cases.length];
  const next = cases[(caseIndex + 1) % cases.length];
  const tabs = ['Overview', 'Chronology', 'Evidence', 'Known Facts', 'Unanswered Questions', 'Sources'];

  return (
    <main className={`page page--case page--case-${item.accent}`}>
      <section className="case-file-hero">
        <div className="case-file-hero-image" style={{ backgroundImage: `url(${item.image})` }}>
          <span className="image-note">CONTEXTUAL IMAGE · NOT A HISTORICAL PHOTOGRAPH</span>
          <span className="case-file-stamp">CASE {item.number}<br /><small>RECORD OPEN</small></span>
        </div>
        <G active={gestaltOn} principle="proximity" className="case-file-heading">
          <div className="eyebrow">Case File / {item.number}</div>
          <h1>{item.title}</h1>
          <p className="case-lede">{item.summary}</p>
          <div className="case-meta-row"><span><b>Location</b>{item.location}</span><span><b>Year</b>{item.year}</span><span><b>Status</b>{item.status}</span></div>
        </G>
      </section>
      <nav className="case-tabs" aria-label="Case file sections">
        {tabs.map((label) => (
          <button type="button" key={label} className={tab === label ? 'is-active' : ''} onClick={() => setTab(label)}>{label}</button>
        ))}
      </nav>
      <section className="case-file-content">
        {tab === 'Overview' && (
          <div className="case-overview-layout">
            <div className="case-main-copy"><div className="eyebrow">The record</div><h2>A case held between fact and interpretation.</h2><p>{item.overview}</p><p className="disclaimer"><strong>Reading note.</strong> The archive keeps documented facts, later reporting and open interpretation visually separate. This file does not present an explanation as settled.</p></div>
            <aside className="case-sidebar"><div className="sidebar-label">At a glance</div><div className="fact-stack"><div><span>Case number</span><strong>VN—{item.number}</strong></div><div><span>Filed</span><strong>{item.year}</strong></div><div><span>Classification</span><strong>{item.category}</strong></div></div><SourceLink href={item.source} label="Open starting source" /></aside>
          </div>
        )}
        {tab === 'Chronology' && (
          <div className="chronology-panel"><div className="eyebrow">Sequence / documented record</div><div className="case-chronology">{item.chronology.map((event, index) => <G active={gestaltOn} principle="continuity" className="chronology-item" key={event.date}><div className="chronology-marker">{String(index + 1).padStart(2, '0')}</div><div><span className="mono-label">{event.date}</span><h3>{event.label}</h3><p>{event.text}</p></div></G>)}</div></div>
        )}
        {tab === 'Evidence' && (
          <div className="case-evidence-panel"><div className="eyebrow">Evidence / contextual studies</div><div className="case-evidence-grid">{caseEvidence.map((entry) => <EvidenceTile key={entry.id} entry={entry} onOpen={() => navigate(`/evidence?open=${entry.id}`)} gestaltOn={gestaltOn} />)}</div></div>
        )}
        {tab === 'Known Facts' && (
          <ListPanel title="Known facts" eyebrow="Documented / reported" items={item.knownFacts} principle="common-region" active={gestaltOn} />
        )}
        {tab === 'Unanswered Questions' && (
          <ListPanel title="Unanswered questions" eyebrow="The gap in the record" items={item.questions} principle="common-region" active={gestaltOn} numbered />
        )}
        {tab === 'Sources' && (
          <div className="sources-panel"><div className="eyebrow">Sources / start here</div><h2>Trace the record beyond the interface.</h2><p>This archive uses the supplied starting source for each case. The site keeps its own copy concise and labels contextual reconstructions rather than passing them off as historical evidence.</p><SourceLink href={item.source} label={item.sourceLabel} /></div>
        )}
      </section>
      <div className="case-next-prev"><button type="button" onClick={() => navigate(`/cases/${previous.slug}`)}><span>← Previous case</span><strong>{previous.shortTitle}</strong></button><span className="case-next-index">{item.number} / 03</span><button type="button" onClick={() => navigate(`/cases/${next.slug}`)}><span>Next case →</span><strong>{next.shortTitle}</strong></button></div>
    </main>
  );
}

function ListPanel({ title, eyebrow, items, principle, active, numbered = false }) {
  return <div className="list-panel"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><div className="list-panel-items">{items.map((item, index) => <G active={active} principle={principle} className="list-panel-item" key={item}><span>{numbered ? String(index + 1).padStart(2, '0') : '●'}</span><p>{item}</p></G>)}</div></div>;
}

function EvidenceTile({ entry, onOpen, gestaltOn }) {
  return <G active={gestaltOn} principle="figure-ground" tag="button" type="button" className="evidence-tile" onClick={onOpen}><div className="evidence-tile-image" style={{ backgroundImage: `url(${entry.image})` }}><span>{entry.id}</span></div><div className="evidence-tile-copy"><div className="mono-label">{entry.classification}</div><h3>{entry.title}</h3><p>{entry.caption}</p><span className="tile-open">Inspect record ↗</span></div></G>;
}

function EvidenceRoom({ gestaltOn, onOpenEvidence }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All cases');
  const visibleEvidence = evidence.filter((entry) => {
    const haystack = `${entry.id} ${entry.title} ${entry.caseName} ${entry.classification} ${entry.caption}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (filter === 'All cases' || entry.caseSlug === filter);
  });
  return <main className="page page--evidence"><PageIntro index="02" eyebrow="The evidence room / contextual studies" title="Evidence Room">A visual index of objects, documents, locations and transmissions. Every item states what it is — and what it is not.</PageIntro><section className="evidence-controls"><label className="search-field"><span className="search-icon">⌕</span><span className="sr-only">Search evidence</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence ID, case or classification…" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className="filter-group" role="group" aria-label="Filter evidence by case"><button type="button" className={`filter-pill ${filter === 'All cases' ? 'is-selected' : ''}`} onClick={() => setFilter('All cases')}>All cases</button>{cases.map((item) => <button type="button" key={item.slug} className={`filter-pill ${filter === item.slug ? 'is-selected' : ''}`} onClick={() => setFilter(item.slug)}>{item.shortTitle}</button>)}</div><span className="result-count">{String(visibleEvidence.length).padStart(2, '0')} / 06 items</span></section><section className="evidence-shelf" aria-live="polite">{visibleEvidence.length ? visibleEvidence.map((entry, index) => <G active={gestaltOn} principle={index === 0 ? 'focal-point' : 'common-region'} tag="button" type="button" className={`shelf-item shelf-item--${index === 0 ? 'feature' : 'standard'}`} key={entry.id} onClick={() => onOpenEvidence(entry)}><div className="shelf-image" style={{ backgroundImage: `url(${entry.image})` }}><span>{entry.id}</span><small>CONTEXTUAL STUDY</small></div><div className="shelf-copy"><div className="mono-label">{entry.caseName} · {entry.date}</div><h2>{entry.title}</h2><p>{entry.caption}</p><span className="shelf-arrow">Inspect ↗</span></div></G>) : <div className="empty-state"><span className="eyebrow">No matching evidence</span><p>Reset the room to return to the complete index.</p><button type="button" className="text-button" onClick={() => { setQuery(''); setFilter('All cases'); }}>Reset room ↗</button></div>}</section><div className="evidence-footer-note"><span className="note-mark">!</span><p>Visuals marked “Contextual study” are editorial reconstructions or location studies. They are not presented as original historical photographs or documents.</p></div></main>;
}

function EvidenceModal({ entry, onClose, navigate }) {
  if (!entry) return null;
  const item = getCase(entry.caseSlug);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="evidence-modal" role="dialog" aria-modal="true" aria-labelledby="evidence-modal-title"><button type="button" className="modal-close" onClick={onClose} aria-label="Close evidence detail">×</button><div className="modal-image" style={{ backgroundImage: `url(${entry.image})` }}><span>{entry.id}</span><small>CONTEXTUAL STUDY</small></div><div className="modal-copy"><div className="eyebrow">{entry.caseName} / {entry.classification}</div><h2 id="evidence-modal-title">{entry.title}</h2><p>{entry.caption}</p><p className="modal-note">{entry.note}</p><div className="modal-meta"><span><b>Evidence ID</b>{entry.id}</span><span><b>Date</b>{entry.date}</span></div><div className="modal-actions"><SourceLink href={entry.source} label={entry.sourceLabel} /><button type="button" className="text-button" onClick={() => { onClose(); navigate(`/cases/${item.slug}`); }}>Read case file ↗</button></div></div></section></div>;
}

function Timeline({ navigate, gestaltOn }) {
  const [filter, setFilter] = useState('All cases');
  const [paused, setPaused] = useState(false);
  const visibleEvents = timelineEvents.filter((event) => filter === 'All cases' || event.caseSlug === filter);
  return <main className="page page--timeline"><PageIntro index="03" eyebrow="The historical timeline / 1966—1987" title="Continuity">Follow the record across three cases. Change the filter and watch related events move as one group.</PageIntro><section className="timeline-controls"><div className="filter-group" role="group" aria-label="Filter timeline by case"><button type="button" className={`filter-pill ${filter === 'All cases' ? 'is-selected' : ''}`} onClick={() => setFilter('All cases')}>All cases</button>{cases.map((item) => <button type="button" key={item.slug} className={`filter-pill filter-pill--${item.accent} ${filter === item.slug ? 'is-selected' : ''}`} onClick={() => setFilter(item.slug)}>{item.shortTitle}</button>)}</div><button type="button" className="pause-button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}><span>{paused ? 'Resume motion' : 'Pause motion'}</span><span className="pause-icon">{paused ? '▶' : 'Ⅱ'}</span></button></section><section className={`timeline-rail ${paused ? 'is-paused' : ''}`} aria-live="polite">{visibleEvents.map((event, index) => { const item = getCase(event.caseSlug); return <G active={gestaltOn} principle="common-fate" tag="button" type="button" className={`timeline-event timeline-event--${item.accent}`} key={event.id} onClick={() => navigate(`/cases/${event.caseSlug}`)}><span className="timeline-date">{event.date}</span><span className="timeline-node" aria-hidden="true" /><span className="timeline-event-copy"><small>{item.shortTitle} / {event.type}</small><strong>{event.label}</strong><span>{event.text}</span><em>Open case file ↗</em></span><span className="timeline-index">{String(index + 1).padStart(2, '0')}</span></G>; })}</section><div className="timeline-key"><span><i className="key-dot key-dot--bronze" />Lead Masks Case</span><span><i className="key-dot key-dot--terracotta" />Isdal Woman</span><span><i className="key-dot key-dot--olive" />Max Headroom</span></div></main>;
}

function Process({ gestaltOn }) {
  return (
    <main className="page page--process">
      <PageIntro index="04" eyebrow="Design process / studio notes" title="Design Process">A concise record of the decisions behind the interface. The website is the primary Gestalt demonstration; this section makes the choices inspectable.</PageIntro>
      <section className="process-intro"><div className="process-statement"><div className="eyebrow">01 / Problem statement</div><h2>How do you design for uncertainty without turning it into spectacle?</h2><p>The Vanishing Index gives documented mysteries a quiet reading room. It lets visitors move from record to question while keeping contextual imagery, reported facts and interpretation visibly distinct.</p></div><div className="process-stamp"><BrandMark /><span>DESIGN<br />FOUNDATION<br />/ 2026</span></div></section>
      <section className="process-grid"><ProcessRow number="02" title="Target audience" text="Students, museum visitors and curious readers who need enough context to investigate without being told what to believe." principle="common-region" active={gestaltOn} /><ProcessRow number="03" title="Design direction" text="A private historical archive meets an investigative documentary interface: warm paper, dark reading-room fields, serif display type and mono provenance marks." principle="figure-ground" active={gestaltOn} /><ProcessRow number="04" title="Gestalt integration" text="Proximity groups each record, Similarity makes controls predictable, Continuity carries chronology, Closure becomes the open seal, and Figure–Ground keeps evidence readable. Common Region frames related facts, Common Fate explains filters through movement, and Focal Point gives every screen one next action." principle="similarity" active={gestaltOn} /><ProcessRow number="05" title="Final design decisions" text="Keep the process short. Let the archive do the teaching. Use contextual studies honestly, make sources one click away, and preserve a readable hierarchy at desktop scale before adapting downward." principle="focal-point" active={gestaltOn} /></section>
      <section className="showcase"><div className="showcase-header"><div><div className="eyebrow">Gestalt showcase</div><h2>Eight principles, in the interface.</h2></div><p>Switch “Gestalt in Action” on in the header to see the same choices annotated across the site.</p></div><div className="showcase-grid">{gestaltShowcase.map((item, index) => <article className="showcase-card" key={item.key}><div className="showcase-card-top"><span>0{index + 1}</span><strong>{item.name}</strong></div><div className={`mini-example mini-example--${item.key}`} aria-hidden="true"><span /><span /><span /></div><div className="showcase-example-copy">{item.example}</div><p>{item.definition}</p><div className="showcase-detail"><span>Applied</span><strong>{item.applied}</strong></div><div className="showcase-detail"><span>Why / benefit</span><strong>{item.why} {item.benefit}</strong></div></article>)}</div></section>
    </main>
  );
}

function ProcessRow({ number, title, text, principle, active }) {
  return <G active={active} principle={principle} className="process-row"><span className="process-row-number">{number}</span><h2>{title}</h2><p>{text}</p><span className="process-row-arrow">↗</span></G>;
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div className="footer-brand"><BrandMark /><span>THE VANISHING INDEX</span></div><p>An interactive digital archive of the unknown.<br />Built as a Design Foundation study in Gestalt and evidence.</p><div className="footer-links"><button type="button" onClick={() => navigate('/archive')}>Archive ↗</button><button type="button" onClick={() => navigate('/process')}>Design process ↗</button></div><span className="footer-year">VN—2026</span></footer>;
}

function NotFound({ navigate }) {
  return <main className="page not-found"><div className="eyebrow">404 / record missing</div><h1>This page vanished.</h1><p>The archive could not locate that route.</p><button type="button" className="button button--bronze" onClick={() => navigate('/')}>Return home ↗</button></main>;
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [gestaltOn, setGestaltOn] = useState(false);
  const [modalEvidence, setModalEvidence] = useState(null);
  const [queryEvidenceId, setQueryEvidenceId] = useState(null);
  const route = routeFromPath(pathname);

  const navigate = (path) => {
    const [nextPath, query] = path.split('?');
    window.history.pushState({}, '', path);
    setPathname(nextPath);
    if (query) {
      const params = new URLSearchParams(query);
      setQueryEvidenceId(params.get('open'));
    } else {
      setQueryEvidenceId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('gestalt-mode', gestaltOn);
    return () => document.body.classList.remove('gestalt-mode');
  }, [gestaltOn]);

  useEffect(() => {
    const title = route.type === 'home' ? 'The Vanishing Index' : `The Vanishing Index / ${route.type.replace('-', ' ')}`;
    document.title = title;
  }, [route.type]);

  useEffect(() => {
    if (queryEvidenceId) {
      const found = evidence.find((entry) => entry.id === queryEvidenceId);
      if (found) setModalEvidence(found);
    }
  }, [queryEvidenceId]);

  const closeModal = () => { setModalEvidence(null); setQueryEvidenceId(null); if (window.location.search) window.history.replaceState({}, '', window.location.pathname); };
  const activePath = route.type === 'case' ? '/cases' : pathname;
  const renderScreen = useMemo(() => {
    if (route.type === 'home') return <Home navigate={navigate} gestaltOn={gestaltOn} />;
    if (route.type === 'archive') return <Archive navigate={navigate} gestaltOn={gestaltOn} />;
    if (route.type === 'evidence') return <EvidenceRoom gestaltOn={gestaltOn} onOpenEvidence={setModalEvidence} />;
    if (route.type === 'timeline') return <Timeline navigate={navigate} gestaltOn={gestaltOn} />;
    if (route.type === 'process') return <Process gestaltOn={gestaltOn} />;
    if (route.type === 'case') {
      const item = cases.find((entry) => entry.slug === route.slug);
      return item ? <CaseFile item={item} navigate={navigate} gestaltOn={gestaltOn} /> : <NotFound navigate={navigate} />;
    }
    return <NotFound navigate={navigate} />;
  }, [route.type, route.slug, pathname, gestaltOn]);

  return <div className={`app-shell ${route.type === 'home' ? 'app-shell--home' : ''}`}><SiteHeader activePath={activePath} gestaltOn={gestaltOn} setGestaltOn={setGestaltOn} navigate={navigate} /><div className="route-transition" key={pathname}>{renderScreen}</div>{route.type !== 'home' && <Footer navigate={navigate} />}{modalEvidence && <EvidenceModal entry={modalEvidence} onClose={closeModal} navigate={navigate} />}</div>;
}
