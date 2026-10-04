// 1. Static module imports
import Libs from './core/libs.js';
import Modal from './modal/modal.js';
import Toast from './toast/toast.js';
import Switch from './switch/switch.js';
import Button from './button/button.js';
import Radio from './radio/radio.js';
import Checkbox from './checkbox/checkbox.js';
import Input from './input/input.js';
import Range from './range/range.js';
import Progress from './progress/progress.js';
import Accordion from './accordion/accordion.js';
import Tabs from './tabs/tabs.js';
import Dropdown from './dropdown/dropdown.js';
import Card from './card/card.js';

// 2. Registry with module objects immediately
const modulesRegistry = [
	Libs,
	Modal,
	Toast,
	Switch,
	Button,
	Radio,
	Checkbox,
	Input,
	Range,
	Progress,
	Accordion,
	Tabs,
	Dropdown,
	Card
];

export class Vanlite {
	constructor() {
		this.modules = [];
		this.report = [];
	}
	
	async loadAll() {
		console.group('Vanlite-UI');
		for (const module of modulesRegistry) {
			await this.#load(module);
		}
		console.groupEnd();
		return this.modules;
	}
	
	async loadModule(module) {
		return this.#load(module);
	}
	
	async #load(module) {
		try {
			if (!module || typeof module !== 'object') {
				throw new Error('Invalid module export');
			}
			
			if (!module.id) {
				throw new Error('Module has no id');
			}
			
			await module.init?.(this);
			
			this.modules.push(module);
			this.report.push({ id: module.id, status: 'OK' });
			this[module.id] = module;
			
			console.log(`✔ ${module.id}`);
			return module;
			} catch (err) {
			this.report.push({
				id: module?.id || 'unknown',
				status: 'FAILED',
				error: err.message
			});
			
			console.error('✖ module load failed', err);
			return null;
		}
	}
	
	printReport() {
		console.table(this.report);
	}
}