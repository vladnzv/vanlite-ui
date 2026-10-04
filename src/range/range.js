export default {
	id: 'range',

	identifier: 'vl-range',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		container.append(elem);
		this.rangeUpdate(elem)
	},
	
	apply(elem, config){
		if(config.callback)
			elem.addEventListener('change', config.callback);
	},
	
	create(config) {
		const elem = document.createElement('input');
		elem.classList.add(this.identifier);
		elem.dataset.ui = this.identifier;
		elem.type = 'range';

		elem.min = config.min || 1;
		elem.max = config.max || 100;
		
		return elem;
		
	},
	
	rangeUpdate(range) {
		const update = () => {
			const percent =
			(range.value - range.min) /
			(range.max - range.min) * 100;
			
			range.style.setProperty(
				'--range-progress',
				percent + '%'
			);
		};
		update();
		range.addEventListener('input', update);
	}
	
}