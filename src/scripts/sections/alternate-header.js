import {register} from '@shopify/theme-sections';

const cardAddedHandler = (event) => {
  const header = new DOMParser().parseFromString(
    event.detail.header,
    'text/html',
  );
  const cartCounterUpdated = header.getElementById('cart_counter');
  const cartCounter = document.getElementById('cart_counter');

  cartCounter.replaceWith(cartCounterUpdated);
};

register('alternate-header', {
  onLoad: function () {
    console.log('Section loaded:', this);

    document.addEventListener('cart:added', cardAddedHandler);
  },

  onUnload: function () {
    console.log('Section unloaded:', this);

    document.removeEventListener('cart:added', cardAddedHandler);
  },

  onSelect: function () {
    console.log('Section select:', this);
  },

  onDeselect: function () {
    console.log('Section deselect:', this);
  },

  onBlockSelect: function (event) {
    console.log('Block select:', event);
  },

  onBlockDeselect: function (event) {
    console.log('Block deselect:', event);
  },
});
