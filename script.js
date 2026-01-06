const addBtn = document.querySelector('.addButton');
const popUp= document.querySelector('.popUpContainer');
const addSubreddit = document.querySelector('.addSubreddit');
const input = document.querySelector('.input');
const label = document.querySelector('.label');
const lanesContainer = document.querySelector('.lanesContainer');
addBtn.addEventListener('click', ()=>{
  popUp.style.display='block'
});

async function fetchSubreddit(subredditName) {
  const response = await fetch('mock-reddit.json');

  if (!response.ok) {
    throw new Error('Failed to load mock data');
  }

  const data = await response.json();
  return data.data.children;
}



function createLane(subredditName) {
  const lane = document.createElement('div');
  lane.classList.add('lane');

  lane.innerHTML = `
    <h2>r/${subredditName}</h2>
    <div class="posts"></div>
  `;

  return lane;
}
function renderPosts(posts, postsContainer) {
 posts.slice(0, 10).forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

postEl.innerHTML = `
  <div style="border: 1px solid gray; padding: 8px; margin-bottom: 8px; max-width: 250px; border-radius:15px;">
    <h4>${post.data.title}</h4>
    <p>by ${post.data.author}</p>
    <span>⬆ ${post.data.ups}</span>
  </div>
`;


    postsContainer.appendChild(postEl);
  });
}
async function addSubredditLane(subredditName) {
  const lane = createLane(subredditName);
  const postsContainer = lane.querySelector('.posts');

  lanesContainer.appendChild(lane);

  postsContainer.innerHTML = '<p>Loading...</p>';

  try {
    const posts = await fetchSubreddit(subredditName);
    postsContainer.innerHTML = '';
    renderPosts(posts, postsContainer);
  } catch (error) {
    postsContainer.innerHTML = '<p>Subreddit not found</p>';
  }
}

addSubreddit.addEventListener('click', () => {
  const subredditName = input.value.trim();

  if (document.querySelector(`[data-subreddit="${subredditName}"]`)) {
  label.innerHTML = 'This subreddit is already added';
  return;
}

  if (subredditName.length >= 3) {
  label.innerHTML = '';
  addSubredditLane(subredditName);
  popUp.style.display = 'none';
  input.value = '';
}
  else {
    label.innerHTML = 'Please enter at least 3 characters';
  }
});
