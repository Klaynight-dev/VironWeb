document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        fadeInElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');


    document.getElementById('login-button').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';

    window.location.href = 'index.html';
}


function loginWithDiscord() {
    window.location.href = "http://localhost:3000/login";
}

window.onload = function() {
    const token = localStorage.getItem('access_token');
    const userData = JSON.parse(localStorage.getItem('user_data'));

    if (token && userData) {
        document.getElementById('login-button').style.display = 'none';
        const userInfo = document.getElementById('user-info');
        document.getElementById('user-avatar').src = userData.avatar;
        document.getElementById('username').textContent = userData.username;
        userInfo.style.display = 'flex';
    }
};

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const username = params.get('username');
const avatar = params.get('avatar');

if (id && username && avatar) {

    localStorage.setItem('access_token', 'your_access_token_here');
    localStorage.setItem('user_data', JSON.stringify({
        username: username,
        avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
    }));

    document.getElementById('login-button').style.display = 'none';
    const userInfo = document.getElementById('user-info');
    document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
    document.getElementById('username').textContent = username;
    userInfo.style.display = 'flex';
}