import blogPosts from './blogData.js';

function displayRecentPosts() {
    // Get current post URL
    const currentUrl = window.location.pathname;
    
    // Filter out current post and get 3 recent posts
    const recentPosts = blogPosts
        .filter(post => !currentUrl.includes(post.url))
        .slice(0, 3);
        
    // Populate recent posts
    const recentPostsContainer = document.getElementById('recentPosts');
    if (recentPostsContainer) {
        recentPostsContainer.innerHTML = recentPosts.map(post => `
            <div class="recent-post-card">
                <div class="card-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="card-content">
                    <div class="post-category">${post.category}</div>
                    <h3><a href="${post.url}">${post.title}</a></h3>
                    <div class="post-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', displayRecentPosts);

export { displayRecentPosts };
