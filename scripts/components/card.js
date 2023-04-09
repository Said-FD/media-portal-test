import { cardTextMock } from '../mock/cardText.mock.js';

export const card = (params, index) => {
  const { id, author, download_url } = params;
  const imageLoadingValue = id > 3 ? 'lazy' : 'eager';

  const markup = `
    <div id="image-${id}" class="col">
      <article class="card h-100">
        <div class="overflow-hidden">
          <img
            src="${download_url}"
            alt="image by ${author}"
            loading="${imageLoadingValue}"
            class="card-img-top"
          >
        </div>
        <div class="card-body d-flex flex-column px-4">
          <h2 class="card-title mb-1">${author}</h2>
          <p class="card-text mb-2">${cardTextMock[index]}</p>
          <button
            type="button"
            class="btn btn-show-more align-self-start p-0"
            data-collapse="close"
          >
            Show more...
          </button>
        </div>
        <div class="card-controls mt-auto p-3">
          <button type="button" class="btn button-primary">
            Save to collection
          </button>
          <button type="button" class="btn button-outline">
            Share
          </button>
        </div>
      </article>
    </div>
  `;

  return markup;
};
