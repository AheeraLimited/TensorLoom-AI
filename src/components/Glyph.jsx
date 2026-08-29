const PATHS = {
  platform: 'M4 6h16v12H4z M4 10h16 M8 6v4',
  infra: 'M12 3v4 M12 17v4 M5 12H2 M22 12h-3 M6.3 6.3 4.2 4.2 M19.8 19.8l-2.1-2.1 M6.3 17.7l-2.1 2.1 M19.8 4.2l-2.1 2.1 M12 8a4 4 0 100 8 4 4 0 000-8z',
  cloud: 'M7 18a4 4 0 01-1-7.9 5 5 0 019.6-1.7A4.5 4.5 0 0119 18H7z',
  android: 'M6 9v7a1 1 0 001 1h1v3h2v-3h4v3h2v-3h1a1 1 0 001-1V9H6z M6 9a6 6 0 0112 0 M9 5l-1-2 M15 5l1-2 M9.5 12.5h.01 M14.5 12.5h.01',
  agent: 'M12 3v3 M9 6h6a3 3 0 013 3v3a3 3 0 01-3 3H9a3 3 0 01-3-3V9a3 3 0 013-3z M9.5 10.5h.01 M14.5 10.5h.01 M8 19h8 M12 15v4',
  llm: 'M4 5h16v10H8l-4 4z M8 9h8 M8 12h5',
  automation: 'M4 12a8 8 0 0114-5.3 M20 12a8 8 0 01-14 5.3 M18 4v3h-3 M6 20v-3h3',
  data: 'M4 5c0-1 3.6-2 8-2s8 1 8 2-3.6 2-8 2-8-1-8-2z M4 5v6c0 1 3.6 2 8 2s8-1 8-2V5 M4 11v6c0 1 3.6 2 8 2s8-1 8-2v-6',
}

export default function Glyph({ type }) {
  const d = PATHS[type] || PATHS.agent
  return (
    <svg className="svc-glyph" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
