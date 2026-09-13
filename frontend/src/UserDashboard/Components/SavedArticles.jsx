import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';

function SavedArticles({ items, loading, onRemove, removingId }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-4">Saved for later</h2>

      {loading && (
        <p className="text-gray-400 text-sm">Loading saved articles…</p>
      )}

      {!loading && items.length === 0 && (
        <p className="text-gray-400 text-sm border border-dashed border-white/20 rounded-xl p-6 text-center">
          No saved articles yet. Use Save on a card to add one here.
        </p>
      )}

      {!loading && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((a) => (
            <li
              key={a._id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium line-clamp-2">{a.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {a.category}
                  {a.createdAt && ` · ${new Date(a.createdAt).toLocaleDateString()}`}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 px-2"
                >
                  Open
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => onRemove(a._id)}
                  disabled={removingId === a._id}
                  className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {removingId === a._id ? '…' : 'Remove'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SavedArticles;
