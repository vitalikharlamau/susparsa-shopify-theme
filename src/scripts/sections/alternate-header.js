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
  onLoad() {
    document.addEventListener('cart:added', cardAddedHandler);
  },

  onUnload() {
    document.removeEventListener('cart:added', cardAddedHandler);
  },
});
