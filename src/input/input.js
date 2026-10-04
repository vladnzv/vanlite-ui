export default {
	id: 'input',

	identifier: 'vl-input',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		container.append(elem);
	},
	
	apply(elem, config){
		if(config.callback)
			elem.addEventListener('focusout', config.callback)
		if(config.placeholder)
			elem.placeholder = config.placeholder;
	},
	
	create(config) {
		if (config.type == 'password') 
			return this.createPassword(config);
		
		const elem = document.createElement('input');
		elem.classList.add(this.identifier);
		return elem;
	},

	createPassword(config) {
		const elem = document.createElement('div');
		elem.classList.add('vl-password');

		const insert = 
`<input class="vl-input" type="password" placeholder="Password">
<button class="vl-password-toggle" type="button" data-ui="vl-password-toggle">👁</button>`;
		elem.innerHTML = insert;

		const toggle = elem.querySelector('[data-ui="vl-password-toggle"]')
		toggle.addEventListener('click', () => {
			const input = event.target.parentElement.querySelector(`.${this.identifier}`);
			if(input.type === 'password') {
				toggle.setAttribute('aria-pressed', true)
				input.type = 'text';
			} else {
				toggle.setAttribute('aria-pressed', false)
				input.type = 'password';
			}
		});
		
		return elem;
	}
}