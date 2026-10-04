const vanlite = new Vanlite();
	  vanlite.loadAll();

var statistic = 0;
var used_elems = {};

window.onload = ()=> {
	createPage();
}

function createPage() {
	document.body.prepend( createHeader() );
	document.body.append( createMain() );
	document.body.append( createFooter() )
}

function createMain() {
	const root = document.createElement('main');
	const count_lib_elems = Object.keys(formBuilders).length;
	
	root.innerHTML = 
`<div class="progress-wrapper">
	<div class="progress-title">
		<span>Progress research of library</span><br>
		<span>Count of elements: </span><span id="count_vl_elems">${count_lib_elems}</span><br>
		<span>Count of used elements: </span><span id="count_used_elems">0</span><br>
	</div>
	<div id="main-progress"></div>
</div>

<div id="open-window"></div>

<div id="sandbox" class="demo-sandbox">
	<span style="color: #a0aec0;">Generated components will appear here.</span>
</div>`;
	
	const progress_config = {
		value: 0,
		max: count_lib_elems,
		type: 'radial',
	}
	
	//vanlite.progress.insert( root.querySelector('#main-progress'), progress_config );
	
	const btn_config = {
		title: 'Click me',
		callback: createModalWindow,
	}
	
	vanlite.button.insert(root.querySelector('#open-window'), btn_config);

	return root;
}

function createHeader() {
	const root = document.createElement('header');
	let content = '';
		
	content	= 
`<div class="logo-group">
	<h1>&lt;Vanlite&gt;&lt;/Vanlite&gt;</h1>
	<div class="title-caption">Library Vanlite &ndash; try simplify</div>
</div>
<div class="language-selection"></div>`;
	
	content1 = 
`<div class="logo-group">
	<h1>&lt;Vanlite&gt;try simplify&lt;/Vanlite&gt;</h1>
	<div class="title-caption">Vanlite &ndash; Lightweight UI library</div>
</div>
<div class="language-selection"></div>`;

	root.innerHTML = content;
	const config = {
		title: 'EN',
		//callback: ,
	}
	
	root.querySelector('.language-selection').append( vanlite.button.create(config) )

	return root;
}

function createFooter() {
	
	const root = document.createElement('footer');
	root.innerHTML = 
`&copy; Vladyslav Nazarov 2026<br>
Vanlite &ndash; Lightweight UI library<br>
<a href="https://github.com/vladnzv" target="_blank">GitHub</a> | 
<a href="https://linkedin.com" target="_blank">LinkedIn</a>`;

	return root;
}

function createModalWindow() {
	const content = choiceYourElement()
	
	const config = {
		skin: 'aero',
		title: 'Add your element',
		outClose: true,
		content: content,
		btnFooter: [
		{
			label: 'Create Element',
			callback: hCreateElement,
		},
		{
			label: 'Exit',
			callback: ()=>document.querySelector('#vl-modal').close(),
		},]
	}
	
	vanlite.modal.insert(document, config);
}

function choiceYourElement() {
	const root = document.createElement('div')
	const forma = document.createElement('form')
	forma.id = 'set_choose_elem';
	const list = document.createElement('select')
	list.id = 'elem-selector';
	let items = '<option value="">--Please choose an option--</option>';
	for(let key in formBuilders)
		items += `<option data-elem="${key}">${key}</option>`;
	list.innerHTML = items;

	const textCaption = document.createElement('div')
	textCaption.textContent = 'Choise Your Element';

	root.append(textCaption)
	root.append(list)
	root.append(forma)

	list.addEventListener('change', hChooseElement);
	
	return root;
}

function hCreateElement() {
	const forma = document.querySelector('#set_choose_elem')
	console.log(forma)
	if(!forma) return;

	const key = document.querySelector('#elem-selector').value;
	
	let config = getFormDataAdvanced();
	
	if(key=='accordion' || key=='tabs') {
		const items = transformToItems(config);
		config = {...config, ...items};
	}
	
	else if(key=='dropdown') {
		const items = transformToDropdownItems(forma);
		config = {...config, ...items};
		console.log(config)
	}

	else if(key=='toast') {
		vanlite[key].insert(document, config);
		document.querySelector('#vl-modal').close();
		return;
	}
	
	const elem = vanlite[key].create(config);

	checkStatistic(key);

	insertElementOnPage(elem)
}

function checkStatistic(key) {
	const count_lib_elems = Object.keys(formBuilders).length
	console.log(statistic)
	console.log(count_lib_elems)

	if(statistic >= count_lib_elems)
		return;
	
	statistic++;

	if(used_elems[key])
		used_elems[key]++;
	else
		used_elems[key]=1;

	
	
	document.querySelector('#count_used_elems').innerText = Object.keys(used_elems).length;
}

function transformToItems(data) {
    const titles = Array.isArray(data.title) ? data.title : [];
    const contents = Array.isArray(data.content) ? data.content : [];

    // Determine the maximum length to process all elements
    const maxLength = Math.max(titles.length, contents.length);
    const items = [];

    for (let i = 0; i < maxLength; i++) {
        // Convert values to strings and remove leading and trailing whitespace
        const title = String(titles[i] ?? '').trim();
        const content = String(contents[i] ?? '').trim();

        // Check: add the element only if at least one of the fields is not empty
        if (title !== '' || content !== '') {
            items.push([title, content]);
        }
    }

    // Return an object with an items property
    return { items };
}

function getFormDataAdvanced() {
	const formElement = document.querySelector('#set_choose_elem');
    if (!formElement) return null;

    const formData = new FormData(formElement);
    const data = {};

    for (const [key, value] of formData.entries()) {
        if (data.hasOwnProperty(key)) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    return data;
}

function transformToDropdownItems(formElement) {
    if (!formElement) return { items: [] };

    const formData = new FormData(formElement);
    
    // getAll собирает все повторяющиеся инпуты с одинаковыми name
    const ids = formData.getAll('id_item');
    const titles = formData.getAll('title_item');

    const maxLength = Math.max(ids.length, titles.length);
    const items = [];

    for (let i = 0; i < maxLength; i++) {
        const id = String(ids[i] ?? '').trim();
        const title = String(titles[i] ?? '').trim();

        // Добавляем элемент, только если хотя бы одно поле заполнено
        if (id !== '' || title !== '') {
            items.push({
                id: id,
                title: title,
                // Динамический коллбек по умолчанию (можно переопределить позже)
                callback: () => console.log(id || title)
            });
        }
    }

    return { items };
}

function insertElementOnPage(elem) {
	const root = document.createElement('div');
	root.class = 'added-element';
	root.prepend(elem);

	document.querySelector('#sandbox').prepend(root);
	document.querySelector('#vl-modal').close();
}

function hChooseElement(e) {
	console.log(e.target.value)
	document.querySelector('#set_choose_elem').innerHTML = '';

	if(!e.target.value)
		return;
	
	formBuilders[e.target.value]()
}

const formBuilders = {
	'accordion': makeFormAccordion,
	'button': makeFormBtn,
	'card': makeFormCard,
	'checkbox': makeFormCheckbox,
	'dropdown': makeFormDropdown,
	'input': makeFormInput,
	//'modal': makeFormModal,
	'progress': makeFormProgress,
	'radio': makeFormRadio,
	'range': makeFormRange,
	'switch': makeFormSwitch,
	'tabs': makeFormTabs,
	'toast': makeFormToast,
}

function makeFormAccordion() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Fill in the accordion items</span><br>
<span>Item 1: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of accordion item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of accordion item">
<span>Item 2: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of accordion item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of accordion item">
<span>Item 3: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of accordion item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of accordion item">


<span>Items name: </span><input class="vl-input" name="iName" placeholder="Input a name if you want only one accordion item to be open.">
<span>Marker: </span><input class="vl-input" name="marker" placeholder="The marker is the symbol for opening or closing an accordion element.">

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormBtn() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Choose type button</span><br>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="className" value="">
	Normal
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="className" value="vl-btn--danger">
	Danger
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="className" value="vl-btn--primary">
	Primary
</label>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="disable" value="true">
	<span class="vl-checkbox-text">Disable</span>
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormCard() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content yours Card">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormCheckbox() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Choose type checkbox</span><br>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="disable" value="">
	<span class="vl-checkbox-text">Disable</span>
</label>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="checked" value="">
	<span class="vl-checkbox-text">Checked</span>
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormDropdown() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
	`<span>Fill in the Dropdown items</span><br>
<span>Item 1: </span>
<span>ID: </span><input class="vl-input" name="id_item" placeholder="Content of item">
<span>Title: </span><input class="vl-input" name="title_item" placeholder="Title of item">
<span>Item 2: </span>
<span>ID: </span><input class="vl-input" name="id_item" placeholder="Content of item">
<span>Title: </span><input class="vl-input" name="title_item" placeholder="Title of item">
<span>Item 3: </span>
<span>ID: </span><input class="vl-input" name="id_item" placeholder="Content of item">
<span>Title: </span><input class="vl-input" name="title_item" placeholder="Title of item">

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormInput() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Set your progress element</span><br>
<select name="type">
	<option value="">--Please choose an option--</option>'
	<option value="text">Text</option>'
	<option value="number">Number</option>'
	<option value="password">Password</option>'
	<option value="email">E-Mail</option>'
</select><br>

<span>Placeholder: </span><input type="text" class="vl-input" name="placeholder" placeholder="Placeholder text (tooltip in input field)">

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormModal() {
	// im Zukunft
}

function makeFormProgress() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Set your progress element</span><br>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="linear">
	Linear
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="radial">
	Radial
</label><br>

<span>Progress: </span><input type="number" class="vl-input" name="progress" placeholder="Value of progress">
<span>Value: </span><input type="number" class="vl-input" name="value" placeholder="start progress value">
<span>Max: </span><input type="number" class="vl-input" name="max" placeholder="Maximal progress value">

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormRadio() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Set your radio button</span><br>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="disable" value="">
	<span class="vl-checkbox-text">Disable</span>
</label>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="checked" value="">
	<span class="vl-checkbox-text">Checked</span>
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormRange() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Choose type checkbox</span><br>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="disable" value="">
	<span class="vl-checkbox-text">Disable</span>
</label>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="checked" value="">
	<span class="vl-checkbox-text">Checked</span>
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormSwitch() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Choose type checkbox</span><br>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="disable" value="">
	<span class="vl-checkbox-text">Disable</span>
</label>
<label class="vl-checkbox-wrapper">
	<input type="checkbox" class="vl-checkbox" name="checked" value="">
	<span class="vl-checkbox-text">Checked</span>
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormTabs() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Fill in the tabs items</span><br>
<span>Item 1: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of tabs item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of tabs item">
<span>Item 2: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of tabs item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of tabs item">
<span>Item 3: </span>
<span>Title: </span><input class="vl-input" name="title" placeholder="Title of tabs item">
<span>Content: </span><input class="vl-input" name="content" placeholder="Content of tabs item">

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}

function makeFormToast() {
	let forma = document.querySelector('#set_choose_elem')
	
	const content = 
`<span>Choose type of toast</span><br>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="info">
	Info
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="success">
	Success
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="error">
	Error
</label>
<label class="vl-radio-wrapper">
	<input type="radio" class="vl-radio" name="type" value="warning">
	Warning
</label>

<span>title: </span><input class="vl-input" name="title" placeholder="Input title your's element">
<span>content: </span><input class="vl-input" name="content" placeholder="Input content of toast">
<span>lifetime: </span><input class="vl-input" type="number" name="lifetime" placeholder="Life time this toast element">
<span>Name: </span><input class="vl-input" name="name" placeholder="Input name attribute your's element">
<span>ID: </span><input class="vl-input" name="id" placeholder="Input id attribute your's element">
<span>Style: </span><input class="vl-input" name="style" placeholder="Input style attribute your's element">
`
	forma.insertAdjacentHTML('beforeend', content);
}