export default {
	id: 'progress',

	identifier: 'vl-progress',
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
			elem.addEventListener('change', config.callback);
	},
	
	create(config) {
		let elem = null;
		
		if(config.type == 'lineare')
			elem = this.createLineare(config);
		else if(config.type == 'radial')
			elem = this.createRadial(config);
		else
			elem = this.createLineare(config);
		
		
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		
		return elem; 
	},
	
	createRadial(config) {
		const elem = document.createElement('div')
		elem.classList = this.identifier+'-circle';
		elem.dataset.progress = config.progress;

const insert = 
`<svg viewBox="0 0 100 100">
	<circle class="vl-progress-bg" cx="50" cy="50" r="45"></circle>
	<circle class="vl-progress-value" cx="50" cy="50" r="45"></circle>
</svg>
<span class="vl-progress-text">0%</span>`;
		elem.insertAdjacentHTML('beforeend', insert)
		this.valueProgressCircleSet(elem);
		//this.animateCircleProgress(elem, 5);
		console.log(elem)
		return elem;
	},

	valueProgressCircleSet(circle) {
		const value = circle.dataset.progress;
		const radius = 45;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - value / 100 * circumference;
		const progress = circle.querySelector('.vl-progress-value');
		
		progress.style.strokeDashoffset = offset;
		circle.querySelector('.vl-progress-text').textContent = value + "%";
	},
	
	setCircleProgress (el, value) {
		
		const radius = 45;
		const circumference = 2 * Math.PI * radius;
		
		const offset =
		circumference - value / 100 * circumference;
		
		const progress =
		el.querySelector('.vl-progress-value');
		
		progress.style.strokeDasharray = circumference;
		
		progress.style.strokeDashoffset = offset;
		
		el.querySelector('.vl-progress-text')
		.textContent = Math.round(value) + "%";
		
	},
	
	animateCircleProgress (selector, seconds = 5) {
		
		const el =
		typeof selector === "string"
		? document.querySelector(selector)
		: selector;
		
		const duration = seconds * 1000;
		
		const start = performance.now();
		
		const frame = time => {
			
			const progress = Math.min(
				(time - start) / duration,
				1
			);
			
			const percent = progress * 100;
			this.setCircleProgress(el, percent);
			
			if (progress < 1) {
				requestAnimationFrame(frame);
			}
			
		}
		
		requestAnimationFrame(frame);
		
	},
	
	createLineare(config) {
		let elem = config.id
		    ? document.querySelector('#' + config.id)
		    : null;
		
		if (!(elem instanceof HTMLProgressElement)) {
		    elem = document.createElement('progress');
		
		    if (config.id)
		        elem.id = config.id;
		}

		if(config.progress) {
			elem.max = 100;

			if(config.progress > 100) config.progress = 100;

			elem.value = config.progress;
		} else {
			elem.max = config.max;
			elem.value = config.value;
		}

		
		return elem;
	}

}