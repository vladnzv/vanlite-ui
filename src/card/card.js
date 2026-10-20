export default {
	id: 'card',

	identifier: 'vl-card',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		let elem = null;
		(config.sceleton)
		?  elem = this.createSceleton(config)
		:  elem = this.create(config);
		container.append(elem);
	},
	
	apply(elem, config){
		if(config.callback)
			elem.addEventListener('click', config.callback);
	},

	createSceleton(config) {
		const elem = document.createElement('div');
		elem.classList.add(this.identifier);

		const header = document.createElement('div');
		header.classList.add(this.identifier+'-header');
		header.classList.add('vl-skeleton');
		header.classList.add('vl-skeleton-title');

		const body = document.createElement('div');
		body.classList.add(this.identifier+'-body');
		body.classList.add('vl-skeleton');
		body.classList.add('vl-skeleton-text');

		const footer = document.createElement('div');
		footer.classList.add(this.identifier+'-footer');
		footer.classList.add('vl-skeleton');
		footer.classList.add('vl-skeleton-text');

		elem.append(header);
		elem.append(body);
		elem.append(footer);
		
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		
		return elem;
		
	},
	
	create(config) {
		const elem = document.createElement('div');
		elem.classList.add(this.identifier);

		const header = document.createElement('div');
		header.classList.add(this.identifier+'-header');
		const title = config.title || '';
		header.textContent = title;

		const body = document.createElement('div');
		body.classList.add(this.identifier+'-body');
		const content = config.content || '';
		body.textContent = content;

		const footer = document.createElement('div');
		footer.classList.add(this.identifier+'-footer');
		const footer_content = config.footer || '';
		footer.innerHTML = footer_content;

		elem.append(header);
		elem.append(body);
		elem.append(footer);
		
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		
		return elem;
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