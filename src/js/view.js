/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import alphabet from './utils.js';

const renderCommentsList = (currentState) => {
  if (!currentState) {
    return;
  }
  const outerWrapper = document.querySelector('.comments-wrapper-outer');
  outerWrapper.innerHTML = '';

  currentState
    .sort((a, b) => -a.date.localeCompare(b.date))
    .map((el, index) => {
      const innerWrapper = document.createElement('div');
      innerWrapper.className = 'comments-wrapper-inner';

      const icon = document.createElement('img');
      icon.className = 'name-icon';
      icon.setAttribute('src', `${alphabet[el.author.slice(0, 1).toLowerCase()]}`);
      icon.style = 'height:50px;width:50px';

      innerWrapper.append(icon);
      const container = document.createElement('div');
      container.className = 'comment-container';

      const authorField = document.createElement('div');
      authorField.className = 'comment-author';

      const textField = document.createElement('div');
      textField.className = 'comment-text';

      const dateField = document.createElement('div');
      dateField.className = 'comment-date';

      const commentBtns = document.createElement('div');
      commentBtns.className = 'buttons-wrapper comment-buttons';

      const likeButton = document.createElement('a');
      const likeStatus = el.like ? 'fa-solid' : 'fa-regular';
      likeButton.innerHTML = `<i class="fa-sharp ${likeStatus} fa-heart"></i>`;

      const removeButton = document.createElement('a');
      removeButton.innerHTML = '<i class="fa-sharp fa-regular fa-trash-can"></i>';

      commentBtns.append(likeButton, removeButton);
      commentBtns.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('fa-heart')) {
          el.like = !el.like;
          el.like
            ? likeButton.classList.replace('fa-regular', 'fa-solid')
            : likeButton.classList.replace('fa-solid', 'fa-regular');
          localStorage.setItem('persistentState', JSON.stringify(currentState));
          renderCommentsList(currentState);
        }
        if (e.target.classList.contains('fa-trash-can')) {
          currentState.splice(index, 1);
          localStorage.setItem('persistentState', JSON.stringify(currentState));
          renderCommentsList(currentState);
        }
      });

      authorField.innerHTML = el.author;
      textField.innerHTML = el.text;

      const day = new Date(el.date).toLocaleDateString();
      const time = new Date(el.date).toLocaleTimeString().slice(0, -3);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (day === new Date().toLocaleDateString()) {
        dateField.innerHTML = `сегодня, ${time}`;
      } else if (day === yesterday.toLocaleDateString()) {
        dateField.innerHTML = `вчера, ${time}`;
      } else {
        dateField.innerHTML = `${day}, ${time}`;
      }

      container.append(authorField, dateField, textField, commentBtns);
      innerWrapper.append(container);
      outerWrapper.append(innerWrapper);
      return outerWrapper;
    });
};

export default renderCommentsList;
