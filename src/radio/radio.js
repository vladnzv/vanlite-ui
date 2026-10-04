export default {
	id: 'radio',

	identificator: 'vl-radio',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		this.app.libs.apply(elem.querySelector('input'), config);
		this.apply(elem.querySelector('input'), config);
		container.append(elem);
	},
	
	apply(elem, config){
		if(config.callback)
			elem.addEventListener('change', config.callback)
			
	},
	
	create(config) {
		const elem = document.createElement('label');
		const classes = config.class || '';
		const title = config.title || '';
		
		elem.classList = this.app.libs.joinStr(elem.classList, 
										  this.identificator+'-wrapper',
										  classes);
		
		let insert = 
		elem.innerHTML = `<input type="radio" class="vl-radio">
		${title}`;
		return elem;
	},
}