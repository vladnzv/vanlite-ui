export default {
    id: 'switch',

    identificator: 'vl-switch',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		this.app.libs.apply(elem.querySelector('.vl-switch-input'), config);
		this.apply(elem.querySelector('.vl-switch-input'), config);
		container.append(elem);
	},

    apply(elem, config) {
        if (config.checked)
            elem.checked = config.checked;

        if (config.callback)
            elem.addEventListener('change', config.callback);
    },

    create(config) {
        const root = document.createElement('label');
        root.classList.add(`${this.identificator}`)
        const title = config.title || '';

        let insert = 
`<input type="checkbox" class="vl-switch-input">
<span class="vl-switch-slider"></span>
<span class="vl-switch-text">${config.title}</span>`;

        root.innerHTML = insert;
        return root;
    },
}