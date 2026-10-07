import {Vanlite} from '../../src/vanlite.js';

globalThis.vanlite = new Vanlite()
await globalThis.vanlite.loadAll()

const elems = {
	test_card: 'Test Card',
	test_dropdown: 'Test Dropdown',
	test_tabs: 'Test Tabs',
	test_accordion: 'Test Accordion',
	test_progress: 'Test Progress',
	test_range: 'Test Range',
	test_input: 'Test Input',
	test_checkbox: 'Test Checkbox',
	test_radio: 'Test Radio',
	test_btns: 'Test Buttons',
	test_switch: 'Test Switch',
	test_toast: 'Test Toast',
	test_modal: 'Test Modal Window',
}

function createElems() {
	let result = '';
	for(let key in elems) {
		result += `<button class="${key}">${elems[key]}</button><br>`
	}
	document.body.innerHTML = result;
}

createElems();

setTimeout( () => {
	//document.querySelector('.test_card').click();
	//document.querySelector('.test_dropdown').click();
	//document.querySelector('.test_tabs').click();
	//document.querySelector('.test_accordion').click();
	//document.querySelector('.test_progress').click();
	//document.querySelector('.test_range').click();
    //document.querySelector('.test_input').click();
    //document.querySelector('.test_checkbox').click();
    //document.querySelector('.test_radio').click();
    //document.querySelector('.test_btns').click();
	//document.querySelector('.test_switch').click();
    //document.querySelector('.test_toast').click();
    //document.querySelector('.test_modal').click();
}
, 100);

document.querySelector('.test_card').addEventListener('click', () => {
	const config = {
		title: 'My first card',
		content: 'Господа! новая модель организационной деятельности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. С другой стороны постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки модели развития. Задача организации, в особенности же начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений.',
		footer: '<button class="vl-btn vl-btn--primary">Read more...</button>',
		sceleton: true,
		
		callback: ()=>{
			//console.log(event.target)
		},
		
		disable: false,
		id: null,
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	
	vanlite.card.insert(document.body, config);
});

document.querySelector('.test_dropdown').addEventListener('click', () => {
	const config = {

		trigger_name: '...',
		
		items: [
			{
				id: 'edit',
				title: 'Редактировать',
				callback: ()=> console.log('edit'),
				items: [
					{
						id: 'zukunft',
						title: 'Im Zukunft machen',
						callback: ()=> console.log('zukunft'),
					}
				]
			},
			{
				id: 'dublicate',
				title: 'Дублировать',
				callback: ()=> console.log('dublicate'),
			},
			{
				id: 'delete',
				title: 'Удалить',
				callback: ()=> console.log('delete'),
			},
		],
		
		callback: ()=>{
			//console.log(event.target)
		},
		
		disable: false,
		id: null,
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	
	vanlite.dropdown.insert(document.body, config);
});

document.querySelector('.test_tabs').addEventListener('click', () => {
	const config = {
		items: [
			{
				id: 'generel',
				title: 'Allgemein',
				content: 'Allgemein B2 ist super',
			},
			{
				id: 'security',
				title: 'Sicherheit',
				content: 'Sicherheit des Lebens ist super',
			},
			{
				id: 'set',
				title: 'Setup',
				content: 'Setup ist super',
			},
			{
				id: 'other',
				title: 'Anders',
				content: 'Anders ist auch super',
			},
		],

		callback: ()=>{
			//console.log(event.target)
		},

		disable: false,
		id: null,
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	vanlite.tabs.insert(document.body, config);
});

document.querySelector('.test_accordion').addEventListener('click', () => {
	const config = {
		items: [
			['Caption 1', 'Равным образом начало повседневной работы по формированию позиции требуют от нас анализа направлений прогрессивного развития. Задача организации, в особенности же укрепление и развитие структуры позволяет выполнять важные задания по разработке форм развития. Задача организации, в особенности же начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Не следует, однако забывать, что реализация намеченных плановых заданий играет важную роль в формировании новых предложений. Равным образом рамки и место обучения кадров позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же укрепление и развитие структуры позволяет выполнять важные задания по разработке направлений прогрессивного развития.'],
			['Caption 2', 'Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание систем массового участия. Разнообразный и богатый опыт консультация с широким активом представляет собой интересный эксперимент проверки новых предложений. Идейные соображения высшего порядка, а также укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании новых предложений.'],
			['Caption 3', 'Повседневная практика показывает, что реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Таким образом новая модель организационной деятельности играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что новая модель организационной деятельности представляет собой интересный эксперимент проверки направлений прогрессивного развития.'],
			['Caption 4', 'Таким образом начало повседневной работы по формированию позиции способствует подготовки и реализации дальнейших направлений развития. Товарищи! реализация намеченных плановых заданий в значительной степени обуславливает создание новых предложений. Таким образом постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач.'],
			['Caption 5', 'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий. Повседневная практика показывает, что начало повседневной работы по формированию позиции играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям. Задача организации, в особенности же сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям.'],
		],

		iName: 'fish',

		marker: null,

		callback: ()=>{
			console.log(event.target)
		},

		disable: false,
		id: 'null',
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	vanlite.accordion.insert(document.body, config);
});

document.querySelector('.test_progress').addEventListener('click', () => {
	const config = {
		progress: 10,
		value: 70,
		max: 200,
		type: 'radial',

		callback: ()=>{
			console.log(event.target.value)
		},

		disable: false,
		id: 'null',
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	vanlite.progress.insert(document.body, config);

	return;

	const animation = setInterval(()=>{
		config.progress += 7;
		vanlite.progress.insert(document.body, config);
		console.log(config.progress)
		if (config.progress >= 100)
			clearInterval(animation);
	}, 500)
});

document.querySelector('.test_range').addEventListener('click', () => {
	const config = {
		min: 100,
		max: 200,
		
		callback: ()=>{
			console.log(event.target.value)
		},
		
		disable: false,
		id: null,
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	
	vanlite.range.insert(document.body, config);
});

document.querySelector('.test_input').addEventListener('click', () => {
	const config = {
		placeholder: 'Input your text',
		type: 'text',
		
		callback: ()=>{
			console.log(event.target.value)
		},
		
		disable: false,
		id: null,
		name: '',
		className: null,
		dataset: null,
		style: '',
	}
	
	vanlite.input.insert(document.body, config);
	config.type = 'password';
	vanlite.input.insert(document.body, config);
	config.type = 'email';
	vanlite.input.insert(document.body, config);
		
});

document.querySelector('.test_checkbox').addEventListener('click', () => {
	const config = {
		title: 'Checkbox',
		callback: ()=>{
			console.log(event.target, event.target.checked)
		},
		checked: true,
		disable: false,
		id: null,
		name: 'demo',
		className: null,
		dataset: {console: 'save', great: 'sive'},
		style: null,
	}
	
	vanlite.checkbox.insert(document.body, config);
})

document.querySelector('.test_radio').addEventListener('click', () => {
	const config = {
		title: 'Radio',
		callback: ()=>{
			console.log(event.target, event.target.checked)
		},
		checked: true,
		disable: false,
		id: null,
		name: 'demo',
		className: null,
		dataset: {console: 'save', great: 'sive'},
		style: null,
	}
	
	vanlite.radio.insert(document.body, config);
	vanlite.radio.insert(document.body, config);
	vanlite.radio.insert(document.body, config);
})

document.querySelector('.test_btns').addEventListener('click', () => {
	const config = {
		title: 'Button',
		callback: ()=>{
			console.log(event.target)
		},
		disable: false,
		id: '',
		name: '',
		className: '',
		dataset: {},
		style: 'margin: 10px',
	}

	vanlite.button.insert(document.body, config)
	config.className = 'vl-btn--danger'
	vanlite.button.insert(document.body, config)
	
	config.className = 'vl-btn--primary'
	vanlite.button.insert(document.body, config)
	
	config.disable = true;
	vanlite.button.insert(document.body, config)
});

document.querySelector('.test_switch').addEventListener('click', () => {
	const config = {
		title: 'Switcher',
		callback: ()=>{
			console.log(event.target, event.target.checked)
		},
		checked: true,
		disable: false,
		id: null,
		name: null,
		className: null,
		dataset: {console: 'save', great: 'sive'},
		style: null,
	}
	
	vanlite.switch.insert(document.body, config);
	config.disable = true;
	vanlite.switch.insert(document.body, config);
})

document.querySelector('.test_toast').addEventListener('click', () => {
	
	const config = {
		type: 'info',
		title: 'My First Toast',
		content: 'Text for toast, all ok',
		lifetime: 3000,
		id: null,
		callback: ()=>{console.log('callback')},
	}
	
	vanlite.toast.insert(document, config);
	config.type = 'success'
	vanlite.toast.insert(document, config);
	config.type = 'error'
	vanlite.toast.insert(document, config);
	config.type = 'warning'
	vanlite.toast.insert(document, config);
})
	
	
document.querySelector('.test_modal').addEventListener('click', () => {

    const config = {
        width: 500,
        height: 300,
        skin: 'aero',
        title: 'My First Modal Window Test',
        content: '<form class="mw__form" data-js="bm__form"><fieldset><legend>Параметры закладки</legend><label class="mw__field"><span>Имя закладки</span><textarea name="name" required="">YouTube</textarea></label><label class="mw__field mw__field--checkbox"><input type="checkbox" class="custom_checkbox" name="is_enabled"><span>Закладка активна</span></label></fieldset><input type="hidden" name="bookmark_id" value="bm_1780874363414_807"></form>',
		outClose: true,
        btnClose: true,
        btnFooter: [{
            label: 'Save',
            dataset: {
                action: 'save',
            },
            callback: ()=>console.log('save'),
        }, {
            label: 'Return',
            dataset: {
                action: 'cancel',
            },
            callback: ()=>console.log('return'),
        }, {
            label: 'Exit',
            dataset: {
                action: 'reset',
            },
            callback: ()=>document.querySelector('#vl-modal').close(),
        }]
    }

    vanlite.modal.insert(document, config);
});