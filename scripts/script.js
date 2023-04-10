import { apiService } from './service/apiService.js';
import { card } from './components/card.js';
import { handleLongText, handleThemeSwitch } from './utils/utils.js';

const cardsGroupElement = document.querySelector('.generated-cards-group');

const generateCard = (params, index) => {
  const markup = card(params, index);
  const sanitizedMarkup = DOMPurify.sanitize(markup);
  cardsGroupElement.insertAdjacentHTML('beforeend', sanitizedMarkup);

  const renderedCard = cardsGroupElement.querySelector(`#image-${params.id}`);
  const textElement = renderedCard.querySelector('.card-text');
  const showMoreButtonElement = renderedCard.querySelector('.btn-show-more');

  handleLongText(textElement, showMoreButtonElement);
};

let requestPageNumber = 1;
const REQUEST_PAGE_LIMIT = 10;

const lastCardObserver = new IntersectionObserver(entries => {
  const card = entries[0];
  if (!card.isIntersecting) return;

  requestPageNumber = requestPageNumber + 1;
  generateCardsGroup(requestPageNumber, REQUEST_PAGE_LIMIT);
  lastCardObserver.unobserve(card.target);
}, { rootMargin: '250px' });

async function generateCardsGroup (page, limit) {
  try {
    const response = await apiService(page, limit);
    response.forEach((data, index) => generateCard(data, index));

    const cardsGroup = cardsGroupElement.children;
    const lastCard = cardsGroup[cardsGroup.length - 1];
    lastCardObserver.observe(lastCard);
  } catch (error) {
    const mainSectionElement = document.querySelector('.main-section');
    mainSectionElement.textContent = error.message;
  }
};

generateCardsGroup(requestPageNumber, REQUEST_PAGE_LIMIT);


const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);

const themeSwitchButton = document.querySelector('.theme-switcher');
themeSwitchButton.addEventListener('click', event => {
  handleThemeSwitch(event.target);
});
