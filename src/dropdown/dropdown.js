export default {
	id: 'dropdown',

	identifier: 'vl-dropdown',
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
		if(typeof config.callback === 'function')
			elem.addEventListener('click', (e) => {
				config.callback(e);

				// We clear the focus so that the dropdown closes immediately after clicking an item.
				if (elem instanceof HTMLElement) {					
					elem.blur();
				}
			});
	},
	
	create(config) {
		const result = document.createElement('div');
		result.classList.add(this.wrapper)

		const btn = document.createElement('button');
		btn.classList.add('vl-btn');
		btn.classList.add(this.identifier+'-trigger');
		btn.setAttribute('aria-haspopup', 'true');
		
		const trigger_name = config.trigger_name || '';
		btn.textContent = trigger_name;
		
		const elem_drop = document.createElement('div');
		elem_drop.classList.add(this.identifier);
		elem_drop.setAttribute('role', 'menu');
		this.createItems(elem_drop, config.items || []);

		result.append(btn);
		result.append(elem_drop);
		return result;
	},

	createItems(root, items = []) {
		items.forEach( (itemData) => {
			const item = document.createElement('button');
			item.classList.add(`${this.identifier}-item`);
			item.setAttribute('role', 'menuitem');

			if(itemData.id)
				item.dataset.id = itemData.id;

			item.textContent = itemData.title || '';

			if (itemData.disabled)
				item.disabled = true;

			this.apply(item, itemData);
			root.append(item)
		});
	}
}