export default {
	id: 'toast',

	identifier: 'vl-toasts-container',
	get wrapper() {return `${this.identifier}-wrapper`;},

	icons: {
		success:	"✔",
		error:		"✖",
		warning:	"⚠",
		info:		"ℹ",
	},
	
	init(app) {
		this.app = app;
	},
	
	insert(container, config) {
        this.createContainerIfNoExist(container);
		
		const elem = this.create(config);
		this.app.libs.apply(elem, config);
		this.apply(elem, config);
		container.querySelector('#'+this.identifier).append(elem);
		
		elem.addEventListener('click', () => {
		    elem.remove(); // Remove from the DOM
		  }, { once: true }); // { once: true } automatically removes the handler after it fires
		
		this.makeTimer(elem, config);
	},

	makeTimer(toast, config) {
		const lifetime = config.lifetime || 3000;
		
		setTimeout(()=>{
			toast.remove();
		}, lifetime);	
	},
	
	apply(toast, config){
		if(config.type)
			toast.dataset.skin = config.type;
	},

	createContainerIfNoExist(container=null){
		if(!container)
			container = document;

		if(container.querySelector('#'+this.identifier))
			return;
		
		const root = container.createElement('div')
		root.id = this.identifier;
		container.body.append(root)
	},
	
	create(config) {
		const root = document.createElement('div')
		root.classList = 'vl-toast';
		
		const title = config.title || '';
		const content = config.content || '';
		
		if(config.id)
			root.id = config.id;
		
		let insert = 
`${this.getIcon(config)}
<div class="vl-toast-body">
	<div class="vl-toast-title">${title}</div>
	<div class="vl-toast-content">${content}</div>
</div>`;

		root.innerHTML = insert;
		
		return root;
	},

	getIcon(config) {
		let result = '';
		if(config.type){
			result = `<div class="vl-toast-sign">${this.icons[config.type]}</div>`
		}
		if(config.image) {
			result = `<div class="vl-toast-icon"><img src="${config.image}"></div>`
		}
		return result;
	}
}