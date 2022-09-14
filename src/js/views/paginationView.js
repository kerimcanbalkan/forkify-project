import View from './View.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  };

  _generateMarkupButton = function (curPage, orientation) {
    return `
        <button data-goto="${
          curPage + (orientation === 'prev' ? -1 : 1)
        }" class="btn--inline pagination__btn--${orientation}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      orientation === 'prev' ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${curPage + (orientation === 'prev' ? -1 : 1)}</span>
        </button>`;
  };

  _generateMarkup = function () {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'prev');
    }
    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        curPage,
        'prev'
      )}${this._generateMarkupButton(curPage, 'next')}`;
    }
    // Page 1 and there are no other pages
    return '';
  };
}
export default new PaginationView();
