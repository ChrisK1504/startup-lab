import { FormEvent, useEffect, useState } from 'react';

type Feedback = { id: string; title: string; description: string; status: 'new' | 'planned' | 'done'; createdAt: string };
const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export default function App() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try { const response = await fetch(`${API}/feedback`); if (!response.ok) throw new Error(); setItems(await response.json()); setError(''); }
    catch { setError('Could not reach the API. Is PostgreSQL and the dev server running?'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`${API}/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: form.get('title'), description: form.get('description') }) });
    if (response.ok) { event.currentTarget.reset(); await load(); }
  };
  const cycle = async (id: string) => { await fetch(`${API}/feedback/${id}/status`, { method: 'PATCH' }); await load(); };

  return <main>
    <header><span className="eyebrow">PulseBoard · product feedback</span><h1>Build what users actually need.</h1><p>Capture requests, make a plan, and show customers what shipped.</p></header>
    <section className="layout">
      <form onSubmit={submit}><h2>Add feedback</h2><label>Short title<input name="title" maxLength={120} required placeholder="Dark mode" /></label><label>What problem does this solve?<textarea name="description" maxLength={1000} required placeholder="I work late and the bright screen…" /></label><button>Send feedback</button></form>
      <div className="feed"><div className="feed-title"><h2>Customer requests</h2><span>{items.length} total</span></div>{loading && <p>Loading…</p>}{error && <p className="error">{error}</p>}{!loading && !error && items.length === 0 && <div className="empty">No feedback yet. Add the first request.</div>}{items.map(item => <article key={item.id}><div><span className={`status ${item.status}`}>{item.status}</span><h3>{item.title}</h3><p>{item.description}</p></div><button className="secondary" onClick={() => void cycle(item.id)}>Move forward →</button></article>)}</div>
    </section>
  </main>;
}
