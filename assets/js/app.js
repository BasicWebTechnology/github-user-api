let input = document.getElementById('search_item'),
    boxCont = document.querySelector('.box__container'),
    doc = boxCont.querySelector('.document'),
    searching = document.querySelector('.searching'),
    search = document.querySelector('.search'),
    popup = document.querySelector('.popup'),
    removePopup = popup.querySelector('#removePopup');



function getUsers() {
    let inputValue = input.value;
    let url = `https://api.github.com/users/${inputValue}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.message) {
            let randomDelay = ((Math.random() * 2000) + 100).toFixed();
            
            setTimeout(() => {
                popup.classList.add('active');
            }, randomDelay)
        } else {
            popup.classList.remove('active');

            searching.classList.add('remove');
            boxCont.classList.add('show');
            doc.innerHTML = `<div class="user__container">
                                <div class="user__section">
                                    <div class="image__container">
                                        <img src="${data.avatar_url}" alt="user">
                                    </div>
                    
                                    <div class="user__details">
                                        <div class="name">${data.name===null ? 'No name' : data.name}.</div>
                                        <div class="username">${data.login}.</div>
                                        <div class="location">
                                            <i class="material-icons">my_location</i>
                                            <span>${data.location===null ? 'Unknown location' : data.location}.</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="button">
                                    <a href="${data.html_url}" target="_blank" class="btn">visit profile</a>
                                </div>
                            </div>

                            <div class="user__profile">
                                <div class="bio__details">
                                    <div class="about">about</div>
                                    <div class="bio">${data.bio===null ? 'Description is unavailable' : data.bio}</div>
                                </div>
                
                                <div class="followers">
                                    <div class="follow">
                                        <div class="heading">followers</div>
                                        <span class="num">${data.followers}</span>
                                    </div>
                                    <div class="follow">
                                        <div class="heading">following</div>
                                        <span class="num">${data.following}</span>
                                    </div>
                                    <div class="follow">
                                        <div class="heading">repositories</div>
                                        <span class="num">${data.public_repos}</span>
                                    </div>
                                </div>
                            </div>`;
        }
    })
    .catch(err => {
        popup.classList.add('active');
        popup.innerHTML = `<div class="box">
                            <i class="material-icons" id="removePopup">close</i>
                                <div class="text">
                                    <h1>Connection problem</h1>
                                    <p>Please check you connection and reload the page.</p>
                                </div>
                        </div>`;

        console.log(err);
    })
};

removePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    searching.classList.add('remove');
    boxCont.classList.remove('show');
    doc.innerHTML = '';
});


input.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        if(input.value == '') {
            popup.classList.add('active');
        } else {
            popup.classList.remove('active');
            e.preventDefault();
            searching.classList.remove('remove');
            getUsers()
        }
        input.value = '';
    }
});

search.addEventListener('click', () => {
    if(input.value == '') {
        popup.classList.add('active');
    } else {
        popup.classList.remove('active');
        searching.classList.remove('remove');
        getUsers();
    }
    input.value = '';
});
