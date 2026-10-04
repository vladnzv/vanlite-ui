export default {
	id: 'button',

	identificator: 'vl-btn',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		container.append(elem);
	},
	
	apply(elem, config){
		if(config.callback)
			elem.addEventListener('click', config.callback);
	},
	
	create(config) {
		const elem = document.createElement('button');
		const classes = config.class || '';
		const title = config.title || '';
		
		elem.classList = this.app.libs.joinStr(elem.classList, 
										  this.identificator,
										  classes);
		
		elem.textContent = title;
		
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		
		return elem;
	},
}