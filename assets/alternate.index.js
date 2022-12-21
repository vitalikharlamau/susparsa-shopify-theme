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

const addDot = (str) => "." + str;

class Accordion {
    constructor(element) {
        this.accordion = element;
        this.button = this.accordion.querySelector(addDot(CLASSES.BUTTON));
        this.content = this.accordion.querySelector(addDot(CLASSES.CONTENT));

        this.state = STATES.HIDE;

        this.button.addEventListener("click", this.toggle.bind(this));
    }

    toggle() {
        if (this.state === STATES.HIDE) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this.state = STATES.SHOW;
        this.accordion.classList.add(CLASSES.ACCORDION_OPEN);
        this.setAccessibility(this.state);
    }

    hide() {
        this.state = STATES.HIDE;
        this.accordion.classList.remove(CLASSES.ACCORDION_OPEN);
        this.setAccessibility(this.state);
    }

    setAccessibility(isOpen) {
        this.button.setAttribute("aria-expanded", isOpen);
        this.content.setAttribute("aria-hidden", !isOpen);
    }
}

const accordions = document.querySelectorAll(addDot(CLASSES.ACCORDION));

accordions.forEach((accordion) => {
    new Accordion(accordion);
});
