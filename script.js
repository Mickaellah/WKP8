let songs = [
    {
        title: 'Santimaka',
        artist: 'Mr Sayd',
        style: 'Pop',
        length: '03:55',
        picture: 'https://i1.sndcdn.com/artworks-000250917292-7gecrq-t500x500.jpg',
        id: 1598082946292,
    },

    {
        title: 'Tsy avelako ho nofy',
        artist: 'Skaiz',
        style: 'Slow',
        length: '03:40',
        picture: 'https://tononkira.serasera.org/media/tononkira/o/skaiz.jpg',
        id: 1598082974091,
    },

    {
        title: 'Chantal',
        artist: 'Tsy avelako',
        style: 'Slow',
        length: '03:35',
        picture: 'https://i.ytimg.com/vi/3r3_fclSHZw/hqdefault.jpg',
        id: 1598082974019,
    },

    {
        title: 'Mafy orina',
        artist: 'Johane',
        style: 'Slow',
        length: '04:15',
        picture: 'https://tononkira.serasera.org/media/tononkira/o/images5.jpg',
        id: 1598082974190,
    }
];

// Grab some elements that might be needed.
const form = document.querySelector('.music_form');
const listOfSongs = document.querySelector('.song_lists');
const addBttn = document.querySelector('.addBtn');
const search = document.querySelector('#search');
const musicStyle = document.querySelector('#styles');
const reseteButton = document.querySelector('.resetBtn');

// A function which generate the objects into html.
const songList = () => {
    const html = songs.map(song => `
        <li class="list_item">
            <ul class="lists">
                <li><img src="${song.picture}" alt="Artist's image"></li>
                <li>${song.title} <br>
                    <small>${song.style}</small>
                </li>
                <li>${song.artist} <br>
                    <small>${song.length}</small>
                </li>
                <li class="score" onclick={increase()}>SCORE: 0</li>
                <li>
                    <button class="add" type="button">
                        +1
                    </button>
                </li>
                <li>
                    <button class="deleteBtn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z" fill="#747474"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </li>
    `).join('');
    listOfSongs.insertAdjacentHTML('beforeend', html);
};
songList();
// listOfSongs.dispatchEvent(new CustomEvent('itemUpdated'));


// A function for the submit button.
const addSong = e => {
    e.preventDefault();
    const forms = e.currentTarget;
    const newSong = {
        title: forms.title.value,
        artist: forms.artist.value,
        style: forms.style.value,
        length: forms.length.value,
        picture: forms.picture.value,
        id: Date.now(),
    };
    songs.push(newSong);
    // listOfSongs.dispatchEvent(new CustomEvent('itemUpdated'));
    songList();
    forms.reset();
};

// Handle +1 button
const handleClick = (e) => {
    const increment = e.target.closest('button.add');
    if (increment) {
        let counter = 0;
        counter++;
        document.querySelector('.score').innerHTML += counter;
        songList();
    }
};

// A function for finding a song by its title.
const findSongByTitle = () => {
    const findSong = songs.find(song => song.title === songs.title);
    console.log(findSong);

    const html = songs
        .map(song => {
        return `
        <li class="list_item">
            <ul class="lists">
                <li><img src="${song.picture}" alt="Artist's image"></li>
                <li>${song.title} <br>
                    <small>${song.style}</small>
                </li>
                <li>${song.artist} <br>
                    <small>${song.length}</small>
                </li>
                <li class="score" onclick={increase()}>SCORE: 0</li>
                <li>
                    <button class="add" type="button">
                        +1
                    </button>
                </li>
                <li>
                    <button class="deleteBtn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z" fill="#747474"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </li>
        `
    })
    .join('');
    listOfSongs.innerHTML = html;

};


// To filter the songs by which style you choose from the dropdown.
const filteredByStyle = (id) => {
    let filteredSong = [...songs];
    filteredSong = filteredSong.filter(song => song.id === id);

    const html = filteredSong
        .map(song => {
        return `
        <li class="list_item">
            <ul class="lists">
                <li><img src="${song.picture}" alt="Artist's image"></li>
                <li>${song.title} <br>
                    <small>${song.style}</small>
                </li>
                <li>${song.artist} <br>
                    <small>${song.length}</small>
                </li>
                <li class="score" onclick={increase()}>SCORE: 0</li>
                <li>
                    <button class="add" type="button">
                        +1
                    </button>
                </li>
                <li>
                    <button class="deleteBtn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z" fill="#747474"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </li>
        `
    })
    .join('');
    listOfSongs.innerHTML = html;
};

// Sort the element ny its score.
const sortElement = () => {
    const sortedElement = songs.map().document.querySelector('.score').sort((a, b) => b - a);
};


// Event listeners.
form.addEventListener('submit', addSong);
listOfSongs.addEventListener('click', handleClick);
search.addEventListener('keydown', findSongByTitle);
musicStyle.addEventListener('change', filteredByStyle);


// An event listener for the reset button.
reseteButton.addEventListener('click', (e) => {
    songList();
});

// Event delegation for delete button.
window.addEventListener('click', (e) => {
    if (e.target.closest('button.deleteBtn')) {
        const parentElement = e.target.closest('.list_item');
        const childElement = e.target.closest('.lists');
        parentElement.removeChild(childElement);
    }
});
