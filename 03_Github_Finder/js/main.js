const baseUrl = 'https://api.github.com/users'; // github user api
const client_id = '950bf0e544a8afdcc982';
const client_secrets = 'ba76a8f38cd0bef4442582fa3c556c6465279aaf';
const showDisplay = document.querySelector('#user_info_display');
const search = document.querySelector('#search');

// user api
const UserProfile = async (un) => {
    try {
        const userRes = await fetch(`${baseUrl}/${un}?client_id=${client_id}&client_secrets=${client_secrets}`);
        const user = await userRes.json();

        const reposRes = await fetch(`${baseUrl}/${un}/repos?client_id=${client_id}&client_secrets=${client_secrets}`);
        const repos = await reposRes.json();

        if(user.message === 'Not Found' && repos.message === 'Not Found') {
            document.querySelector('.user_cont').innerHtml = '<p class="not msg">Not Found</p>';
            document.querySelector('.repos_wrap').style.display = 'none';
        }else {
            ShowUserProfileInfo(user);
            ShowUserRepos(repos);
        }
    }
    catch(err) {
        // showDisplay.style.display = 'none';
        document.querySelector('.user_cont').innerHTML = '<p class="err msg">토큰만료로 인한 오류</p>';
        document.querySelector('.repos_wrap').style.display = 'none';
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
    const inputValue = e.target.value;

    if(e.keyCode == 13) {
        if(inputValue) {
            showDisplay.style.display = 'block';

            UserProfile(inputValue);
        }else {
            alert('User명을 입력하세요!');
        }
    }
});

