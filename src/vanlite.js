class Vanlite {
	static author = 'Vladislav Nazarov';
	static version = '1.0.1';
	
	constructor() {
		
	}
	
	run() {
		window.addEventListener('load', () => {
			this.setPageState();
			document.querySelectorAll('[data-ui="vl-range"]')				.forEach(range		=> this.rangeUpdate				(range));
			document.querySelectorAll('[data-ui="vl-password-toggle"]')	.forEach(btn		=> this.hPassToggle				(btn));
			document.querySelectorAll('[data-ui="vl-tabs"]')				.forEach(tabs 		=> this.hTabs					(tabs));
			document.querySelectorAll('[data-modal-open]')						.forEach(btn 		=> this.hModalOpen				(btn));
			document.querySelectorAll('[data-modal-close]')						.forEach(btn 		=> this.hModalClose				(btn));
			document.querySelectorAll('[data-ui="vl-progress"]')			.forEach(progress 	=> this.valueProgressBarSet		(progress));
			document.querySelectorAll('[data-ui="vl-progress-circle"]')	.forEach(circle 	=> this.valueProgressCircleSet	(circle));
			
			document.querySelector('[data-ui="switch-thema"]')					.addEventListener('change', this.changeTheme);
			document.querySelector('[data-ui="switch-skin"]')					.addEventListener('change', this.changeSkin);
		});
	}
	
	setPageState() {
		const skin = document.querySelector('[data-ui="switch-skin"]');
		const thema = document.querySelector('[data-ui="switch-thema"]');

		if (skin) {
			document.body.setAttribute('data-skin', skin.checked ? 'rounded' : 'flat');
		}
		if (thema){
			document.body.setAttribute('data-theme', thema.checked ? 'dark' : 'light');
		}
	}
	
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
	
	hPassToggle (btn) {
		btn.addEventListener('click', () => {
			const input = btn.parentElement.querySelector('input');
			input.type =
			input.type === 'password'
			? 'text'
			: 'password';
		});
	}
	
	hTabs(tabs) {
		const buttons = tabs.querySelectorAll('.vl-tab');
		const panels  = tabs.querySelectorAll('.vl-tab-panel');
		
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
					`.vl-tab-panel[data-tab="${name}"]`
				)
				.classList.add('is-active');
				
			});
		});
	}
	
	hModalOpen(btn) {
		btn.addEventListener('click', () => {
			const id = btn.dataset.modalOpen;
			document.querySelector(`[data-modal="${id}"]`).showModal();
		});
	}
	
	hModalClose(btn) {
		btn.addEventListener('click', () => {
			btn.closest('dialog').close();
		});
	}
	
	valueProgressBarSet(progress) {
		const value = progress.dataset.progress;
		progress.querySelector('.vl-progress-bar').style.width = value + '%';
	}
	
	valueProgressCircleSet(circle) {
		const value = circle.dataset.progress;
		const radius = 45;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - value / 100 * circumference;
		const progress = circle.querySelector('.vl-progress-value');
		
		progress.style.strokeDashoffset = offset;
		circle.querySelector('.vl-progress-text').textContent = value + "%";
	}
	
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
		
	};
	
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
		
	};
	
	changeTheme(){
		const isDark = event.target.checked;
		document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}
	
	changeSkin(){
		const isRound = event.target.checked;
		document.body.setAttribute('data-skin', isRound ? 'rounded' : 'flat');
	}
	
	toast (message, type = "info", duration = 3000) {
		
		const icons = {
			success:	"✔",
			error:		"✖",
			warning:	"⚠",
			info:		"ℹ",
		};
		
		let container =
		document.querySelector('.vl-toast-container');
		
		if (!container) {
			
			container = document.createElement('div');
			container.className = 'vl-toast-container';
			
			document.body.appendChild(container);
			
		}
		
		const toast = document.createElement('div');
		
		toast.className = `vl-toast vl-toast--${type}`;
		
		toast.innerHTML =
		`<span class="vl-toast-icon">${icons[type] || ""}</span>
		${message}`;
		
		container.appendChild(toast);
		
		setTimeout(() => {
			
			toast.classList.add('hide');
			
			setTimeout(() => toast.remove(), 200);
			
		}, duration);
		
	};
	
}

vl = new Vanlite();
vl.run();