import {register} from '@shopify/theme-sections';
import {ProductForm, getUrlWithVariant} from '@shopify/theme-product-form';

import {formatMoney} from '@shopify/theme-currency';

import {Accordion, CLASSES} from '../library/accordion';

register('alternate-product', {
  onLoad: function () {
    console.log('Section loaded:', this);

    this.accordions = Array.from(
      this.container.querySelectorAll(`.${CLASSES.ACCORDION}`),
    ).map((accordion) => new Accordion(accordion));

    const productHandle = this.container.dataset.handle;
    const form = this.container.querySelector('#product-form');
    fetch(`/products/${productHandle}.js`)
      .then((response) => {
        return response.json();
      })
      .then((productJSON) => {
        this.productForm = new ProductForm(form, productJSON, {
          onOptionChange: this.onOptionChange,
          onFormSubmit: this.onFormSubmit,
        });
      });
  },

  onUnload: function () {
    console.log('Section unloaded:', this);

    this.productForm.destroy();
  },

  onOptionChange: function (event) {
    const variant = event.dataset.variant;
    const buttons = document.querySelectorAll('.form__button');
    const errorMessage = document.querySelector('.form__error');
    const priceValue = document.querySelector('.form__price-value');
    const money = document.querySelector('#product-form').dataset.moneyFormat;

    if (errorMessage) {
      errorMessage.remove();
    }

    if (!variant) {
      buttons.forEach((button) => {
        button.disabled = true;
        button.textContent = 'Sold Out';
      });
      return;
    } else if (variant && variant.available) {
      buttons.forEach((button) => {
        button.disabled = false;
      });
      buttons[0].textContent = 'Add to cart';
      buttons[buttons.length - 1].textContent = 'Buy it now';
    } else if (variant && !variant.available) {
      buttons.forEach((button) => {
        button.disabled = true;
        button.textContent = 'Out of stock';
      });
    }

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);

    priceValue.textContent = `${formatMoney(variant.price, money)}`;
  },

  onFormSubmit: function (event) {
    event.preventDefault();
    fetch(event.target.action + '.js', {
      method: event.target.method,
      body: new FormData(event.target),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 422) {
          const buttons = document.querySelectorAll('.form__button');

          buttons.forEach((button) => (button.disabled = true));

          buttons[buttons.length - 1].insertAdjacentHTML(
            'afterend',
            `<p class="form__error">${response.description}</p>`,
          );
        } else {
          const customEvent = new CustomEvent('cart:added', {
            detail: {
              header: response.sections['alternate-header'],
            },
            bubbles: true,
          });
          event.target.dispatchEvent(customEvent);
        }
      })
      .catch(console.error);
  },

  onSelect: function () {
    console.log('Section select:', this);
  },

  onDeselect: function () {
    console.log('Section deselect:', this);
  },

  onBlockSelect: function (event) {
    console.log('Block select:', event);

    this.currentAccordion = this.accordions.find(
      (current) => current.accordion.id === event.target.id,
    );
    this.currentAccordion.show();
  },

  onBlockDeselect: function (event) {
    console.log('Block deselect:', event);

    this.currentAccordion.hide();
  },
});
