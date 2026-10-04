export default {
	id: 'tabs',

	identifier: 'vl-tabs',
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
		result.classList.add(this.identifier);
		result.dataset.ui = 'vl-tabs';
		result = this.makeItems(result, config);
		this.handler(result);
		return result; 
	},

	makeItems(root, config) {
		const array = config.items;
		const tabs_list = document.createElement('div');
		tabs_list.classList.add('vl-tabs-list');

		const tabs_panel = document.createElement('div');
		tabs_panel.classList.add('vl-tabs-panel');

		for(let i = 0; i < array.length; i++) {
			let list_item = document.createElement('button');
			list_item.classList = 'vl-btn vl-tabs-list-item';
			list_item.dataset.tab = array[i]['id'];
			list_item.textContent = array[i]['title'];
			tabs_list.append(list_item);

			let panel_item = document.createElement('div');
			panel_item.classList = 'vl-tabs-panel-item';
			panel_item.dataset.tab = array[i]['id'];
			panel_item.textContent = array[i]['content'];
			tabs_panel.append(panel_item);
		}
		root.append(tabs_list);
		root.append(tabs_panel);
		console.log(root);
		return root;
	},

	handler(tabs) {
		const buttons = tabs.querySelectorAll('.vl-tabs-list-item');
		const panels  = tabs.querySelectorAll('.vl-tabs-panel-item');
		
		buttons.forEach(btn => {
			
			btn.addEventListener('click', () => {
				const name = btn.dataset.tab;
				
				buttons.forEach(b =>
					b.classList.remove('is-active')
				);
				
				panels.forEach(p =>
					p.classList.remove('is-active')
				);
				
				btn.classList.add('is-active');
				
				tabs.querySelector(
					`.vl-tabs-panel [data-tab="${name}"]`
				).classList.add('is-active');
				
			});
		});
	}
}