import React from 'react';
import { BookmarkPlus, ExternalLink } from 'lucide-react';

function NewsCard({ article, categoryLabel, onSave, isSaving }) {
  const image = article.urlToImage;
  const title = article.title || 'Untitled';
  const description = article.description || '';
  const url = article.url;

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-blue-500/40 transition shadow-lg">
      <div className="aspect-video bg-gray-800 relative">
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No image
          </div>
        )}
        {categoryLabel && (
          <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
            {categoryLabel}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-400 line-clamp-3 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            Read more
            <ExternalLink size={14} />
          </a>
          <button
            type="button"
            disabled={isSaving || !url}
            onClick={() => onSave(article)}
            className="inline-flex items-center gap-1 ml-auto text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-600"
          >
            <BookmarkPlus size={16} />
            {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
