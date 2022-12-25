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

const accordions = document.querySelectorAll(`.${CLASSES.ACCORDION}`);

accordions.forEach((accordion) => {
    new Accordion(accordion);
});
