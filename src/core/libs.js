export default {

	id: 'libs',

	init() {
	
	},
		
	apply(elem, config) {
		if(config.id)
            elem.id = config.id;

        if(config.name)
            elem.name = config.name;

        if(config.className) {
            elem.className = this.joinStr(elem.className, config.className);
		}
		
		if(config.dataset)
			for(let key in config.dataset)
				elem.dataset[key] = config.dataset[key]

		if(config.style)
			elem.style.cssText = config.style;
			//console.log(config.style)

		if(config.disable)
			elem.disabled = config.disable
	},

	joinStr(...args) {
		return args
			.filter(value => value !== undefined && value !== null && value !== false)
			.map(value => String(value).trim())
			.filter(Boolean)
			.join(' ');
	}
	
}