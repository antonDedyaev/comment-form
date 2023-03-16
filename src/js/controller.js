/* eslint-disable consistent-return */
import uniqid from 'uniqid';
import renderCommentsList from './view.js';

const app = () => {
  const persistentState = JSON.parse(localStorage.getItem('persistentState'));
  const state = persistentState ? [].concat(persistentState) : [];
  renderCommentsList(state);

  const commentForm = document.querySelector('.comment-form');

  const fieldsEventHandler = (e) => {
    const { target } = e;
    if (e.keyCode === 9 || target.id === 'field-date') {
      return;
    }
    const statusField = document.getElementById(target.dataset.id);
    if (!target.value) {
      statusField.innerHTML = 'Обязательное поле!';
      target.classList.add('invalid');
      return false;
    }
    statusField.innerHTML = '<i class="fa-solid fa-check">';
    target.classList.remove('invalid');
    return true;
  };

  const submitFormEventHandler = (e) => {
    e.preventDefault();
    const statusMessage = document.getElementById('form-status');
    const author = document.getElementById('field-author');
    const comment = document.getElementById('field-text');
    const date = document.getElementById('field-date');

    const fullDate = date.value
      ? new Date(`${date.value} ${new Date().toTimeString()}`).toISOString()
      : new Date().toISOString();

    if (!author.value || !comment.value) {
      statusMessage.innerHTML = 'Заполните обязательные поля!';
      author.classList.add('invalid');
      author.nextElementSibling.innerHTML = 'Обязательное поле!';
      comment.classList.add('invalid');
      comment.nextElementSibling.innerHTML = 'Обязательное поле!';
      return false;
    }
    statusMessage.innerHTML = '';
    state.push({
      id: uniqid(),
      author: author.value,
      date: fullDate,
      text: comment.value,
      like: null,
    });
    localStorage.setItem('persistentState', JSON.stringify(state));

    author.value = '';
    date.value = '';
    comment.value = '';

    renderCommentsList(state);
  };

  commentForm.addEventListener('keyup', fieldsEventHandler);
  commentForm.addEventListener('submit', submitFormEventHandler);
};

export default app;
