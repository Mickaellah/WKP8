let songs = [
    {
        title: 'Santimaka',
        artist: 'Mr Sayd',
        style: 'Pop',
        length: '03:55',
        picture: 'https://i1.sndcdn.com/artworks-000250917292-7gecrq-t500x500.jpg',
    },

    {
        title: 'Tsy avelako ho nofy',
        artist: 'Skaiz',
        style: 'Slow',
        length: '03:40',
        picture: 'https://tononkira.serasera.org/media/tononkira/o/skaiz.jpg',
    }
];

const form = document.querySelector('.music_form');
const listOfSongs = document.querySelector('.song_lists');

const songList = () => {
    const html = songs.map(song => `
        <li class="list_item">
            <ul class="lists">
                <li>${song.picture}</li>
                <li>${song.title} <br>
                    <small>${song.style}</small>
                </li>
                <li>${song.artist} <br>
                    <small>${song.length}</small>
                </li>
                <li>SCORE: 0</li>
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
    listOfSongs.innerHTML = html;
    console.log(html);
};
songList();

// const items = [];

// const handleClick = (event) => {
//     event.preventDefault();
// }

// form.addEventListener('submit', handleClick);