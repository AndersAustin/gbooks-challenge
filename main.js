// const axios = require('axios');
//add function to button
document.getElementById('search-btn').addEventListener('click', (e) => {searchForBooks(e,document.getElementById('search-bar').value)})

// Renders an error message
const showError = (msg) => {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
const searchForBooks = (e,term) => {
  e.preventDefault()
  //delete current results
  document.getElementById('results-area').innerHTML='';

  //get new results
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&key=${PUT_API_KEY_HERE}`)
  .then(data => {
    //parse data into a readable chunk
    return data.json()
  })
  .then(data => {
    //iterate through results and render them all
    for (let i = 0; i < data.items.length; i++) {
      render(data.items[i].volumeInfo,i)
    }
  })
}

// Generate HTML and sets #results's contents to it
const render = (volume, index) => {
  //create_card
  let listInnerText =  `<div class = 'result-items'>
    <div class = 'title' ><b>Title:</b> ${volume.title}</div> <br/>
    <div class = 'subTitle' ><b>Sub Title:</b> ${volume.subTitle ? volume.subTitle : 'N/A'}</div> <br/>
    <div class = 'authors' ><b>Author(s):</b> ${volume.authors.join(', ')}</div>
    </div>`

  let listItem = document.createElement('div');
  listItem.setAttribute('class','result');
  listItem.setAttribute('id',`result${index}`);
  listItem.innerHTML = listInnerText
  //create link
  let listItemLink = document.createElement('a');
  listItemLink.setAttribute('href',volume.infoLink);
  listItemLink.setAttribute('target','_blank');

  listItemLink.appendChild(listItem);

  //create img
  let listItemPicContainer = document.createElement('div');
  listItemPicContainer.setAttribute('class', 'pic_Container');
  let listItemPic = document.createElement('img');
  listItemPic.setAttribute('class','resultPic');
  listItemPic.setAttribute('src',volume.imageLinks['thumbnail']);
  listItemPicContainer.appendChild(listItemPic);
  listItem.prepend(listItemPicContainer);

  //append child to the results-area
  document.getElementById('results-area').appendChild(listItemLink);
}
