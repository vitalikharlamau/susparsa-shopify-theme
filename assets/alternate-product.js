const CLASSES = {
    ACCORDION: "accordion__item",
    ACCORDION_OPEN: "accordion__item--open",
    BUTTON: "accordion__button",
    CONTENT: "accordion__content",
};

const STATES = {
    SHOW: true,
    HIDE: false,
};

class Accordion {
    constructor(element) {
        this.accordion = element;
        this.button = this.accordion.querySelector(`.${CLASSES.BUTTON}`);
        this.content = this.accordion.querySelector(`.${CLASSES.CONTENT}`);

        this.state = STATES.HIDE;

        this.button.addEventListener("click", this.toggle.bind(this));
    }

    toggle() {
        this.state === STATES.HIDE ? this.show() : this.hide();
    }

    show() {
        this.state = STATES.SHOW;
        this.accordion.classList.add(CLASSES.ACCORDION_OPEN);
        this.updateAcessibility();
    }

    hide() {
        this.state = STATES.HIDE;
        this.accordion.classList.remove(CLASSES.ACCORDION_OPEN);
        this.updateAcessibility();
    }

    updateAcessibility() {
        this.button.setAttribute("aria-expanded", this.state);
        this.content.setAttribute("aria-hidden", !this.state);
    }
}

Shopify.theme.sections.register('alternate-product', {
    onLoad: function() {
        console.log('Section loaded:', this);
    },

    onUnload: function() {
        console.log('Section unloaded:', this);
    },

    onSelect: function() {
        console.log('Section select:', this);
    },

    onDeselect: function() {
        console.log('Section deselect:', this);
    },

    onBlockSelect: function(event) {
        console.log('Block select:', event);
        this.currentAccordion = new Accordion(document.getElementById(event.detail.blockId));
        this.currentAccordion.show();
    },

    onBlockDeselect: function(event) {
        console.log('Block deselect:', event);
        this.currentAccordion.hide();
    }
})