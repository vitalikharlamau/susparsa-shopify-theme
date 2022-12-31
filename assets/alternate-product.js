import { Accordion, CLASSES } from "./alternate.index.js";

const formEventHeandler = (event) => {
    event.preventDefault();
    fetch(event.target.action + ".js", {
        method: event.target.method,
        body: new FormData(event.target),
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(response => response.json())
        .then(response => {
            if (response.status === 422) {
                const formInfo = document.querySelector(".form__info");

                let description = document.createElement("p");
                description.className = "form__error";
                description.textContent = response.description;

                formInfo.prepend(description);

                const buttons = document.querySelectorAll(".form__button");
                buttons.forEach(button => button.disabled = true);
            } else {
                const customEvent = new CustomEvent("cart:added", {
                    detail: {
                        header: response.sections["alternate-header"]
                    },
                    bubbles: true
                });
                event.target.dispatchEvent(customEvent);
            }
        })
        .catch(console.error)
};

Shopify.theme.sections.register('alternate-product', {
    onLoad: function() {
        console.log('Section loaded:', this);

        this.accordions = Array.from(this.container.querySelectorAll(`.${CLASSES.ACCORDION}`)).map(accordion => new Accordion(accordion));

        this.form = document.getElementById("product-form");
        this.form.addEventListener("submit", formEventHeandler);
    },

    onUnload: function() {
        console.log('Section unloaded:', this);
        this.form.removeEventListener("submit", formEventHeandler);
    },

    onSelect: function() {
        console.log('Section select:', this);
    },

    onDeselect: function() {
        console.log('Section deselect:', this);
    },

    onBlockSelect: function(event) {
        console.log('Block select:', event);

        this.currentAccordion = this.accordions.find(current => current.accordion.id === event.target.id);
        this.currentAccordion.show();
    },

    onBlockDeselect: function(event) {
        console.log('Block deselect:', event);

        this.currentAccordion.hide();
    }
})