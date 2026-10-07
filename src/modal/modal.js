/**
	Контейнер с модальным окном может быть только один на странице
	Если создается модальное окно, то оно помещается в этот контейнер
	Если контейнера не существует, он будет создан
	Не имеет значения, какой именно элемент создает модальное окно - 
	помещаться оно будет именно в один и тот же контейнер
*/

export default {
	
	id: 'modal',
	
	identifier: 'vl-modal',
	get wrapper() {return `${this.identifier}-wrapper`;},
	
	init(app){
		this.app = app;
	},

    insert(container, config) {
        this.createContainerIfNoExist(container);
        container = document.querySelector(`#${this.identifier}`);
		this.close(container);
		
		const elem = this.create(config);
		this.app.libs.apply(elem, config);
		this.apply(elem, config, container);
		container.append(elem);
		
        container.showModal();
    },
	
	create(config) {
        const {title, btnClose, content} = config;
        const footer = this.getFooter(config);

        const wrapper = document.createElement('div');
        wrapper.className = this.wrapper;

        if (title || btnClose) {
            const header = document.createElement('header');
            header.className = 'vl-modal-header';

            const titleEl = document.createElement('h2');
            titleEl.className = 'vl-modal-title';
            titleEl.textContent = title || '';

            header.append(titleEl);
            wrapper.append(header);
        }

        const contentEl = document.createElement('div');
        contentEl.className = 'vl-modal-content';

        if (content instanceof Node) {
            contentEl.append(content);
        } else if (content != null) {
            // Если передан HTML-текст или обычный текст
            contentEl.insertAdjacentHTML('beforeend', content);
        }
        wrapper.append(contentEl);

        if (footer) {
            const footerEl = document.createElement('footer');
            footerEl.className = 'vl-modal-footer';
            footerEl.append(footer);
            wrapper.append(footerEl);
        }
		
        return wrapper;
    },
	
	createContainerIfNoExist(root) {
		if (root.querySelector(`#${this.identifier}`))
			return;
		
		const dialog = root.createElement('dialog')
		dialog.id = this.identifier;
		root.querySelector('body').append(dialog);
	},

    apply(root, config, container) {
        if (config.width)
            root.style.width = config.width + 'px';
        if (config.height)
            root.style.height = config.height + 'px';
        if (config.btnClose)
            this.createBtnClose(root);
        if (config.skin)
            root.dataset.skin = config.skin;
        if (config.outClose) {
			container.addEventListener('click', e => {
                if (e.target === container)
                    this.close(container);
            });
		}
    },

    getFooter(config) {
        if (!config.btnFooter)
            return false;
        let box_with_btns = document.createElement('div');
        box_with_btns.classList.add('vl-modal-footer-btns')

        for (let i = 0; i < config.btnFooter.length; i++) {
            const item = config.btnFooter[i];
            let label = item.label || 'DefaultButton';
            box_with_btns.append(this.createBtnFooter(item))

        }
        return box_with_btns;
    },

    createBtnFooter(item) {
        const button = document.createElement('button');
        button.textContent = item.label;
        button.classList.add('vl-modal-footer-btn')

        for (let key in item.dataset) {
            let value = item.dataset[key];
            button.dataset[key] = value;
        }

        if (item.callback)
            button.addEventListener('click', item.callback);

        return button;
    },

    createBtnClose(root) {
        const btn = '<button class="vl-modal-close">✖</button>';
        root.querySelector('.vl-modal-header').insertAdjacentHTML('beforeend', btn);
        root.querySelector('.vl-modal-close').addEventListener('click', () => {
            root = root.closest('#vl-modal');
			root.innerHTML = '';
            root.close();
        }
        );
    },

    close(root=false) {
        if(root.id!='vl-modal')
            root = root.querySelector('#vl-modal')
        
        root.innerHTML = '';
        root.close();
    },

}