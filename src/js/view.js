import alphabet from './utils.js';

const renderCommentsList = (currentState) => {
  const outerWrapper = document.querySelector('.comments-wrapper-outer');

  outerWrapper.innerHTML = '';

  currentState.map((el, index) => {
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
    const removeButton = document.createElement('a');
    likeButton.innerHTML = '<i class="fa-sharp fa-regular fa-heart"></i>';
    removeButton.innerHTML = '<i class="fa-sharp fa-regular fa-trash-can"></i>';

    commentBtns.append(likeButton, removeButton);
    commentBtns.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('fa-heart')) {
        // eslint-disable-next-line no-unused-expressions
        e.target.classList.contains('fa-regular')
          ? e.target.classList.replace('fa-regular', 'fa-solid')
          : e.target.classList.replace('fa-solid', 'fa-regular');
      }
      if (e.target.classList.contains('fa-trash-can')) {
        currentState.splice(index, 1);
        renderCommentsList(currentState);
      }
    });

    authorField.innerHTML = el.author;
    textField.innerHTML = el.text;

    const commentDate = el.date
      ? new Date(el.date).toLocaleDateString()
      : new Date().toLocaleDateString();
    const commentTime = new Date().toLocaleTimeString().slice(0, -3);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (commentDate === new Date().toLocaleDateString()) {
      dateField.innerHTML = `сегодня, ${commentTime}`;
    } else if (commentDate === yesterday.toLocaleDateString()) {
      dateField.innerHTML = `вчера, ${commentTime}`;
    } else {
      dateField.innerHTML = `${commentDate}, ${commentTime}`;
    }

    container.append(authorField, dateField, textField, commentBtns);
    innerWrapper.append(container);
    outerWrapper.append(innerWrapper);
    return outerWrapper;
  });
};

export default renderCommentsList;
