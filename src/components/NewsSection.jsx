import React from "react";

export default function NewsSection({ news = [], filtered = [] }) {
  // Better debugging with more details
  console.log("NewsSection props:", { 
    news: Array.isArray(news) ? news : typeof news,
    filtered: Array.isArray(filtered) ? filtered : typeof filtered
  });

  // Handle cases where news might be malformed
  if (!Array.isArray(news)) {
    return (
      <div className="mt-4">
        <h2 className="font-semibold">General News</h2>
        <p className="text-gray-500 text-sm">News data is not in expected format.</p>
      </div>
    );
  }

  // Handle empty news array
  if (news.length === 0) {
    return (
      <div className="mt-4">
        <h2 className="font-semibold">General News</h2>
        <p className="text-gray-500 text-sm">No news available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="font-semibold">Latest Market News ({news.length})</h2>
      <ul className="list-disc ml-6 text-sm space-y-1">
        {news.map((n, i) => {
          // Safely handle each news item
          if (!n || typeof n !== 'object') return null;
          
          const title = n.title || 'Untitled news item';
          const link = n.link || '#';
          const source = n.source ? `- ${n.source}` : '';

          return (
            <li key={i} className="hover:text-blue-600">
              <a 
                href={link} 
                target="_blank" 
                rel="noreferrer"
                className="hover:underline"
              >
                {title}
              </a>
              {source && (
                <span className="text-gray-500 ml-2">{source}</span>
              )}
            </li>
          );
        })}
      </ul>

      {Array.isArray(filtered) && filtered.length > 0 && (
        <>
          <h2 className="mt-4 font-semibold">Filtered News ({filtered.length})</h2>
          <ul className="list-disc ml-6 text-sm text-blue-700 space-y-1">
            {filtered.map((item, i) => {
              // Handle both cases where filtered is array of strings or objects
              const title = typeof item === 'string' ? item : 
                          (item?.title || 'Untitled filtered news');
              return <li key={i}>{title}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}