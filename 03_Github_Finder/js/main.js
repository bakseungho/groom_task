const baseUrl = 'https://api.github.com/users'; // github user api
const showDisplay = document.querySelector('#user_info_display');
const search = document.querySelector('#search');

// user api
const UserProfile = async (un) => {
    try {
        const res = await fetch(`${baseUrl}/${un}`);
        const user = await res.json();

        ShowUserProfileInfo(user);
    }
    catch(err) {
        console.log(err);
    }
}

// repo api
const UserRepos = async (un) => {
    try {
        const res = await fetch(`${baseUrl}/${un}/repos`);
        const user = await res.json();

        ShowUserRepos(user);
    }
    catch(err) {
        console.log(err);
    }
}

// show
const ShowUserProfileInfo = (user) => {
    const userName = document.querySelector('#usernaem');
    const gitId = document.querySelector('#git_id');
    const userProfile = document.querySelector('#profile_img');
    const grassImg = document.querySelector('#grass_img');
    
    const repos = document.querySelector('#repos');
    const gists = document.querySelector('#gists');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');

    const cp = document.querySelector('#cp');
    const wb = document.querySelector('#wb');
    const lo = document.querySelector('#lo');
    const jo = document.querySelector('#jo');

    userName.innerText = user.name;
    gitId.innerText = `@${user.login}`;
    gitId.setAttribute('href', user.html_url);
    userProfile.src = user.avatar_url;
    grassImg.src = `https://ghchart.rshah.org/000/${user.login}`;

    repos.innerText = user.public_repos;
    gists.innerText = user.public_gists;
    followers.innerText = user.followers;
    following.innerText = user.following;
    
    cp.innerText = user.company ? user.company : '미기입';
    wb.innerHTML = user.blog ? `<a href="${user.blog}" target="_blank">${user.blog}</a>` : '미기입';
    lo.innerText = user.location ? user.location : '미기입';
    jo.innerText = user.created_at ? user.created_at : '미기입';
}

const ShowUserRepos = (repos) => {
    const cont = document.querySelector('.repos_cont');
    const count = document.querySelector('#repo_count');
    let html = '';

    count.innerText = `${repos.length}개의 레포`;
    repos.forEach(item => {
        html += '<div class="repo_item">';
        html += `<a href="${item.html_url}" target="_blank">${item.name}</a>`;
        html += '<div class="repo_info">';
        html += `<p class="star">Stars: ${item.stargazers_count}</p>`;
        html += `<p class="watchers">Watchers: ${item.watchers}</p>`;
        html += `<p class="forks">Forks: ${item.forks}</p>`;
        html += '</div>';
        html += '</div>';
    });

    cont.innerHTML = html;
};


// event
search.addEventListener('keydown', e => {
    const _val = search.value;

    if(e.keyCode == 13) {
        showDisplay.style.display = 'block';
        UserProfile(_val);
        UserRepos(_val);
    }
});

