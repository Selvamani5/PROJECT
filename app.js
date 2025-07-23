const API_KEY = '16ba61e79995446ea7bd33be3526861c'; // Replace with your NewsAPI.org key
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`;

const newsFeed = document.getElementById('news-feed');
const refreshBtn = document.getElementById('refresh-btn');

function renderNews(articles) {
  newsFeed.innerHTML = '';
  articles.forEach(article => {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.innerHTML = `
      <a class="news-title" href="${article.url}" target="_blank">${article.title}</a>
      <div class="news-meta">
        ${article.source.name} | ${new Date(article.publishedAt).toLocaleString()}
      </div>
      <div>${article.description || ''}</div>
    `;
    newsFeed.appendChild(item);
  });
}

async function fetchNews() {
  newsFeed.innerHTML = '<div>Loading news...</div>';
  try {
    const res = await fetch(NEWS_URL);
    const data = await res.json();
    if (data.status === 'ok') {
      renderNews(data.articles);
    } else {
      newsFeed.innerHTML = `<div>Error loading news: ${data.message}</div>`;
    }
  } catch (err) {
    newsFeed.innerHTML = `<div>Error fetching news.</div>`;
  }
}

refreshBtn.addEventListener('click', fetchNews);

// Load on page load
fetchNews();

// Auto-refresh every 60 seconds
setInterval(fetchNews, 60000);
