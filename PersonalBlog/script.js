/* -----------------------------
   Embedded posts (no JSON used)
   ----------------------------- */
const POSTS = [
  {
    id: 1,
    title: "Mastering Responsive Web Design",
    date: "2025-02-20",
    tags: ["css", "responsive", "frontend"],
    excerpt: "Techniques and practical tips for building fluid, accessible layouts with Grid, Flexbox and modern CSS.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    body: `
      <p>Responsive web design is the practice of building websites that adapt gracefully to different screen sizes and device capabilities.</p>
      <h3>Practical tips</h3>
      <ul>
        <li>Start mobile-first — design for small screens and scale up.</li>
        <li>Use relative units (%, rem, vw) instead of fixed px when possible.</li>
        <li>Leverage CSS Grid for layout and Flexbox for component alignment.</li>
      </ul>
      <p>By combining these approaches you can craft robust, maintainable interfaces.</p>`
  },
  {
    id: 2,
    title: "Clean Code: Principles for Maintainable Projects",
    date: "2024-11-10",
    tags: ["best-practices", "coding"],
    excerpt: "Practical rules to keep your codebase readable, testable, and refactorable over time.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=1200&auto=format&fit=crop",
    body: `
      <p>Clean code is about communication. Your code should be clear to future readers — including future you.</p>
      <h3>Rules to follow</h3>
      <ol>
        <li>Name things appropriately.</li>
        <li>Keep functions small and focused.</li>
        <li>Write tests that assert behaviour, not implementation.</li>
      </ol>`
  },
  {
    id: 3,
    title: "Git Workflows for Teams",
    date: "2025-01-05",
    tags: ["git", "workflow", "team"],
    excerpt: "Branching models and collaboration patterns to ship features safely with your team.",
    image: "https://images.unsplash.com/photo-1557426279-4d6f3d6b1f60?q=80&w=1200&auto=format&fit=crop",
    body: `
      <p>Choosing a git workflow helps teams manage features, hotfixes and releases.</p>
      <p>Popular patterns: GitHub Flow, GitFlow, trunk-based development. Pick one that matches your team size and release cadence.</p>`
  },
  {
    id: 4,
    title: "Lightweight Blogs: JSON + JS without a CMS",
    date: "2024-08-15",
    tags: ["static", "architecture"],
    excerpt: "How to power a fast blog using plain JSON and client-side rendering — low maintenance, high control.",
    image: "https://images.unsplash.com/photo-1526378722484-ccf6c8c9c7b0?q=80&w=1200&auto=format&fit=crop",
    body: `
      <p>This approach is ideal for personal blogs where you control content updates manually or via a small script.</p>
      <p>Advantages: speed, privacy, and simplicity. Disadvantages: no dynamic admin UI unless you add one.</p>`
  }
];

/* -----------------------------
   DOM refs
   ----------------------------- */
const featuredEl = document.getElementById('featured');
const postsEl = document.getElementById('posts');
const modal = document.getElementById('modal');
const readerTitle = document.getElementById('readerTitle');
const readerImage = document.getElementById('readerImage');
const readerBody = document.getElementById('readerBody');
const readerMeta = document.getElementById('readerMeta');
const closeModalBtn = document.getElementById('closeModal');
const progressBar = document.getElementById('progressBar');
const welcomeTitle = document.getElementById('welcomeTitle');
const returnNote = document.getElementById('returnNote');
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const themeToggle = document.getElementById('themeToggle');

/* -----------------------------
   Render functions
   ----------------------------- */
function renderFeatured(post) {
  featuredEl.innerHTML = `
    <div class="featured-card">
      <img src="${post.image}" alt="${escapeHtml(post.title)}">
      <div>
        <h3>${escapeHtml(post.title)}</h3>
        <p class="muted">${escapeHtml(post.excerpt)}</p>
        <div style="margin-top:12px">
          <button class="btn" data-id="${post.id}" onclick="openPost(${post.id})">Read full post</button>
        </div>
      </div>
    </div>
  `;
}

function renderPosts(list) {
  postsEl.innerHTML = '';
  list.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <img src="${post.image}" alt="${escapeHtml(post.title)}">
      <h4>${escapeHtml(post.title)}</h4>
      <p class="muted">${escapeHtml(post.excerpt)}</p>
      <div style="margin-top:10px">
        <button class="btn ghost" data-id="${post.id}" onclick="openPost(${post.id})">Read More</button>
      </div>
    `;
    postsEl.appendChild(card);
  });
}

/* -----------------------------
   Helpers
   ----------------------------- */
function escapeHtml(str){
  if(!str) return '';
  return str.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

/* -----------------------------
   Open / close post reader
   ----------------------------- */
function openPost(id){
  const post = POSTS.find(p=>p.id===id);
  if(!post) return;
  readerTitle.textContent = post.title;
  readerMeta.textContent = `${post.date} • ${post.tags.join(', ')}`;
  readerImage.src = post.image;
  readerImage.alt = post.title;
  readerBody.innerHTML = post.body;
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'flex';
  // trap focus to close button
  closeModalBtn.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* Close handlers */
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

/* -----------------------------
   Welcome back & theme
   ----------------------------- */
(function welcomeBack(){
  const last = localStorage.getItem('lastVisit');
  const now = new Date().toISOString();
  if(last){
    const d = new Date(last);
    welcomeTitle.textContent = `Welcome back, Vishal 👋`;
    returnNote.textContent = `Last visit: ${d.toLocaleString()}`;
  } else {
    welcomeTitle.textContent = `Hi, I’m Vishal Mahato 👋`;
    returnNote.textContent = `Nice to meet you — welcome!`;
  }
  localStorage.setItem('lastVisit', now);

  // Theme persistence
  const savedTheme = localStorage.getItem('site_theme') || 'light';
  if(savedTheme === 'dark') document.documentElement.setAttribute('data-theme','dark');
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if(isDark){ document.documentElement.removeAttribute('data-theme'); localStorage.setItem('site_theme','light'); themeToggle.textContent = '🌙'; }
    else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('site_theme','dark'); themeToggle.textContent = '☀️'; }
  });
})();

/* -----------------------------
   Contact form (mock send)
   ----------------------------- */
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  if(!name || !email || !message){
    contactStatus.textContent = 'Please fill all fields.';
    return;
  }
  // Store messages locally (demo)
  const stored = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  stored.push({name,email,message,date:new Date().toISOString()});
  localStorage.setItem('contact_messages', JSON.stringify(stored));
  contactStatus.textContent = '✅ Message received. Thank you!';
  contactForm.reset();
  setTimeout(()=> contactStatus.textContent = '', 5000);
});

/* -----------------------------
   Progress bar and reveal
   ----------------------------- */
function updateProgress(){
  // when modal open, track modal scroll; else page scroll
  const scrolled = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = docHeight>0 ? (scrolled/docHeight)*100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);

/* -----------------------------
   Initial render
   ----------------------------- */
(function init(){
  if(POSTS.length){
    renderFeatured(POSTS[0]);
    renderPosts(POSTS.slice(1));
  }
})();
