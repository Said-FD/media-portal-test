const handleShowMoreButton = (textElement, buttonElement) => {
  buttonElement.addEventListener('click', event => {
    const isTextElementOpen = event.target.dataset.collapse === 'open';

    if (isTextElementOpen) {
      event.target.setAttribute('data-collapse', 'close');
      event.target.textContent = 'Show more...';
    } else {
      event.target.setAttribute('data-collapse', 'open');
      event.target.textContent = 'Show less...';
    }

    textElement.classList.toggle('text-limit');
  });
};

export const handleLongText = (textElement, buttonElement) => {
  const textElementStyle = window.getComputedStyle(textElement);
  const textElementHeight = textElement.clientHeight;
  const textElementLineHeight = parseInt(textElementStyle.lineHeight);
  const numberOfLines = Math.round(textElementHeight / textElementLineHeight);

  if (numberOfLines > 2) {
    textElement.classList.add('text-limit');
    handleShowMoreButton(textElement, buttonElement);
  } else {
    buttonElement.style.display = 'none';
  }
};

export const handleThemeSwitch = button => {
  const currentTheme = document.body.dataset.theme;

  if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'dark');
    button.textContent = 'Switch to the light theme';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
    button.textContent = 'Switch to the dark side';
    localStorage.setItem('theme', 'light');
  }
};
