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
		if(config.callback)
			elem.addEventListener('click', config.callback);
	},
	
	create(config) {
		let result = document.createElement('div');
		result.classList.add(this.wrapper)

		let btn = document.createElement('button');
		btn.classList.add('vl-btn');
		btn.classList.add(this.identifier+'-trigger');
		let trigger_name = config.trigger_name || '';
		btn.textContent = trigger_name;
		
		let elem_drop = document.createElement('div');
		elem_drop.classList.add(this.identifier);
		this.createItems(elem_drop, config);


		result.append(btn);
		result.append(elem_drop);
		console.log(result)
		return result;
	},

	createItems(root, config) {
		const items = config.items;
		
		for(let i=0; i<items.length; i++) {
			let item = document.createElement('button');
			item.classList.add('vl-dropdown-item');
			item.dataset.id = items[i]['id'];
			item.textContent = items[i]['title'];
			this.apply(item, config.items[i])
			root.append(item)
		}
	}
}