export default {
	id: 'accordion',

	identifier: 'vl-accordion',
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
		result.classList.add(this.identifier)
		result = this.makeItems(result, config);
		return result; 
	},

	makeItems(root, config) {
		const array = config.items
		
		for(let i = 0; i < array.length; i++) {
			let item = document.createElement('details');
			item.classList.add(this.identifier+'-item');
				
			if(config.iName)
				item.name = config.iName;

			let header = document.createElement('summary');
			header.classList.add(this.identifier+'-header');
			header.textContent = array[i][0];

			let body = document.createElement('div');
			body.classList.add(this.identifier+'-body')
			body.textContent = array[i][1];

			item.append(header);
			item.append(body);
			
			root.append(item)
		}

		return root;
	}
}