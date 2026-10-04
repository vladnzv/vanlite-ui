export default {
	id: 'checkbox',

	identifier: 'vl-checkbox',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {		
		if(!container)
			return false;

		const elem = this.create(config);
		this.app.libs.apply(elem, config)
		this.apply(elem, config);
		container.append(elem);
	},
	
	apply(elem, config) {
		if(config.callback)
			elem.addEventListener('change', config.callback)
	},
	
	create(config) {
		if(config.title)
			return this.createWithText(config);
		
		const elem = document.createElement('input');
		elem.type = 'checkbox'
		const classes = config.class || '';
		const title = config.title || '';
		
		elem.classList = this.app.libs.joinStr(elem.classList, 
										  this.identifier,
										  classes);
		
		return elem;
	},

	
	createWithText(config) {
		const elem = document.createElement('label');
        elem.classList.add(this.wrapper)
        const title = config.title || '';

        let insert = 
`<input type="checkbox" class="${this.identifier}">
<span class="vl-checkbox-text">${config.title}</span>`;

        elem.innerHTML = insert;
        return elem;
	},
}