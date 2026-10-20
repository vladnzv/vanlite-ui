export default {
    id: 'switch',

    identificator: 'vl-switch',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app) {
		this.app = app;
	},

	insert(container, config) {
		const elem = this.create(config);
		container.append(elem);
	},

    apply(elem, config) {		
        if (config.checked)
            elem.checked = config.checked;

        if (config.callback)
            elem.addEventListener('change', config.callback);
    },
	
	hState(elem, config) {
		console.log(elem)
		const input = elem.querySelector('.vl-switch-input');
		const text_elem = elem.querySelector('.vl-switch-text');
		
		if(!input) return;
		
		// Defining text for states
		const labelOn = config.labelOn || config.titleOn || config.title || 'ON';
        const labelOff = config.labelOff || config.titleOff || config.title || 'OFF';
		
		// Text/label update function
		const updateText = () => {
            if (text_elem) {
                text_elem.innerHTML = input.checked ? labelOn : labelOff;
            }
        };
		
		// Default state
        if (config.checked) {
            input.checked = true;
        }
		
		// Initial text setup
        updateText();

        // Toggle handler
        input.addEventListener('change', (e) => {
            updateText();
        });
		
	},
	
    create(config) {
        const root = document.createElement('label');
        root.classList.add(`${this.identificator}`);
		
		// If the option to hide the slider is passed, an additional class can be specified.
        if (config.hideSlider) {
            root.classList.add('vl-switch-bare');
        }
		
        let insert = 
`<input type="checkbox" class="vl-switch-input">
${
	(config.slider) 
	? '<span class="vl-switch-slider"></span>'
	: ''
}
<span class="vl-switch-text">${config.title}</span>`;

        root.innerHTML = insert;
		
		this.app.libs.apply(root.querySelector('.vl-switch-input'), config);
		this.apply(root.querySelector('.vl-switch-input'), config);
		
		this.hState(root, config);
		
        return root;
    },
}