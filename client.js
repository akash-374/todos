/* public/client.js */

// Helper to handle API calls
async function apiCall(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (data) options.body = JSON.stringify(data);
    
    const res = await fetch(url, options);
    return await res.json();
}

// Auth Check (Using LocalStorage since we aren't using server-side sessions/EJS)
function checkAuth() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'login.html';
    }
}