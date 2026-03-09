let author = 'Vladislav Nazarov';
let version = '1.0.0.0';

window.onload = function() {
	document.querySelector('[data-ui="switch-thema"]').addEventListener('change', (e)=>{
		e.target.checked === true
		? document.querySelector('body').setAttribute('data-theme', 'dark')
		: document.querySelector('body').setAttribute('data-theme', 'light')
	});
	document.querySelector('[data-ui="switch-skin"]').addEventListener('change', (e)=>{
		e.target.checked === true
		? document.querySelector('body').setAttribute('data-skin', 'rounded')
		: document.querySelector('body').setAttribute('data-skin', 'flat')
	});
	
	document.querySelectorAll('.proto-ui-password-toggle')	.forEach(btn		=> hPassToggle(btn));
	document.querySelectorAll('.proto-ui-range')			.forEach(range		=> rangeUpdate(range));
	document.querySelectorAll('.proto-ui-tabs')				.forEach(tabs 		=> hTabs(tabs));
	document.querySelectorAll('[data-modal-open]')			.forEach(btn 		=> hModalOpen(btn));
	document.querySelectorAll('[data-modal-close]')			.forEach(btn 		=> hModalClose(btn));
	document.querySelectorAll('.proto-ui-progress')			.forEach(progress 	=> valueProgressBarSet(progress));
	document.querySelectorAll('.proto-ui-progress-circle')	.forEach(circle 	=> valueProgressCircleSet(circle));
	
	protoUI.animateCircleProgress(".proto-ui-progress-circle", 5);
	protoUI.skeletonDemo();
	
	protoUI.toast("Успешно", "success", 5000);
	protoUI.toast("Ошибка", "error", 5000);
	protoUI.toast("Предупреждение!", "warning", 5000);
	protoUI.toast("Просто информация", "info", 5000);
}

function rangeUpdate(range) {
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

function hPassToggle (btn) {
	btn.addEventListener('click', () => {
		const input = btn.parentElement.querySelector('input');
		input.type =
		input.type === 'password'
		? 'text'
		: 'password';
	});
}

function hTabs(tabs) {
	const buttons = tabs.querySelectorAll('.proto-ui-tab');
	const panels  = tabs.querySelectorAll('.proto-ui-tab-panel');
	
	buttons.forEach(btn => {
		
		btn.addEventListener('click', () => {
			
			const name = btn.dataset.tab;
			
			buttons.forEach(b =>
				b.classList.remove('is-active')
			);
			
			panels.forEach(p =>
				p.classList.remove('is-active')
			);
			
			btn.classList.add('is-active');
			
			tabs.querySelector(
				`.proto-ui-tab-panel[data-tab="${name}"]`
			)
			.classList.add('is-active');
			
		});
	});
}

function hModalOpen(btn) {
	btn.addEventListener('click', () => {
		const id = btn.dataset.modalOpen;
		document.querySelector(`[data-modal="${id}"]`).showModal();
	});
}

function hModalClose(btn) {
	btn.addEventListener('click', () => {
		btn.closest('dialog').close();
	});
}

function valueProgressBarSet(progress) {
	const value = progress.dataset.progress;
	progress.querySelector('.proto-ui-progress-bar').style.width = value + '%';
}

function valueProgressCircleSet(circle) {
	const value = circle.dataset.progress;
	const radius = 45;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - value / 100 * circumference;
	const progress = circle.querySelector('.proto-ui-progress-value');
	
	progress.style.strokeDashoffset = offset;
	circle.querySelector('.proto-ui-progress-text').textContent = value + "%";
}

window.protoUI = {};

protoUI.skeletonDemo = function() {
	setTimeout(() => {
		
		const card = document.querySelector(".card");
		
		card.innerHTML = `
		<img src="https://picsum.photos/320/180" style="width:100%; border-radius:8px; margin-bottom:12px">
		
		<h3>Заголовок карточки</h3>
		
		<p>
		Это текст карточки. Skeleton loader исчезает
		когда данные загрузились.
		</p>
		`;
		
	}, 3000);
}

protoUI.toast = function(message, type = "info", duration = 3000) {
	
	const icons = {
		success:	"✔",
		error:		"✖",
		warning:	"⚠",
		info:		"ℹ",
	};
	
	let container =
    document.querySelector('.proto-ui-toast-container');
	
	if (!container) {
		
		container = document.createElement('div');
		container.className = 'proto-ui-toast-container';
		
		document.body.appendChild(container);
		
	}
	
	const toast = document.createElement('div');
	
	toast.className = `proto-ui-toast proto-ui-toast--${type}`;
	
	toast.innerHTML =
	`<span class="proto-ui-toast-icon">${icons[type] || ""}</span>
	${message}`;
	
	container.appendChild(toast);
	
	setTimeout(() => {
		
		toast.classList.add('hide');
		
		setTimeout(() => toast.remove(), 200);
		
	}, duration);
	
};

/*
	toast()
	↓
	создаётся контейнер (если нет)
	↓
	создаётся элемент
	↓
	анимация появления
	↓
	через N секунд исчезает
	
*/

protoUI.setCircleProgress = function(el, value) {
	
	const radius = 45;
	const circumference = 2 * Math.PI * radius;
	
	const offset =
    circumference - value / 100 * circumference;
	
	const progress =
    el.querySelector('.proto-ui-progress-value');
	
	progress.style.strokeDasharray = circumference;
	
	progress.style.strokeDashoffset = offset;
	
	el.querySelector('.proto-ui-progress-text')
    .textContent = Math.round(value) + "%";
	
};

protoUI.animateCircleProgress = function(selector, seconds = 5) {
	
	const el =
    typeof selector === "string"
	? document.querySelector(selector)
	: selector;
	
	const duration = seconds * 1000;
	
	const start = performance.now();
	
	function frame(time) {
		
		const progress = Math.min(
			(time - start) / duration,
			1
		);
		
		const percent = progress * 100;
		
		protoUI.setCircleProgress(el, percent);
		
		if (progress < 1) {
			requestAnimationFrame(frame);
		}
		
	}
	
	requestAnimationFrame(frame);
	
};