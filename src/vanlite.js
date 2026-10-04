// Load the list of modules to load
const modulesRegistry = [
	() => import('./core/libs.js'),
	
	() => import('./modal/modal.js'),
	() => import('./toast/toast.js'),
	() => import('./switch/switch.js'),
	
	() => import('./button/button.js'),
	() => import('./radio/radio.js'),
	
	() => import('./checkbox/checkbox.js'),
	() => import('./input/input.js'),
	() => import('./range/range.js'),
	
	() => import('./progress/progress.js'),
	() => import('./accordion/accordion.js'),
	() => import('./tabs/tabs.js'),
	() => import('./dropdown/dropdown.js'),
	() => import('./card/card.js'),
];

import Libs from './core/libs.js'

/**
	* System module loader.
	*
	* Responsible for dynamically loading modules from modulesRegistry,
	* validating their contract, and initializing them.
	*
	* Keeps a list of successfully loaded modules and generates a report
	* on the loading results.
	*
	* Contains no business logic and knows nothing about the internal structure of modules.
*/
export class Vanlite {
	
	constructor() {
		this.modules = [];
		this.report = [];
	}
	
	/**
		* Loads all modules from modulesRegistry.
		*
		* Sequentially loads each module,
		* outputs information about the process to the console, and returns
		* a list of successfully loaded (and failed to load) modules.
		*
		* @returns {Promise<Object[]>}
	*/
	async loadAll() {
		console.group('Vanlite-UI');
		
		for (const loadFn of modulesRegistry) {
			await this.#load(loadFn);
		}
		
		console.groupEnd();
		return this.modules;
	}
	
	/**
		* Loads a single module.
		*
		* Can be used for partial or dynamic
		* module loading outside the general loadAll() process.
		*
		* @param {Function} loadFn Dynamic import function.
		* @returns {Promise<Object|null>}
	*/
	async loadModule(loadFn) {
		return this.#load(loadFn);
	}
	
	/**
		* Loads and initializes a single module.
		*
		* Workflow:
		* 1. Dynamically imports the module.
		* 2. Validates the exported object.
		* 3. Checks for the required identifier.
		* 4. Calls init(), if it exists.
		* 5. Adds the module to the list of loaded modules.
		* 6. Adds an entry to the report.
		*
		* If an error occurs, the information is saved
		* in the report, and the method returns null.
		*
		* @param {Function} loadFn Dynamic import function.
		* @returns {Promise<Object|null>}
	*/
	async #load(loadFn) {
		try {
			const result = await loadFn();
			// Safely get the default export using the optional chaining operator "?."
			// If result is null or undefined,
			// undefined will be returned without throwing an error.
			const module = result?.default;
			
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
				id: 'unknown',
				/* id: 'moduleId', */
				status: 'FAILED',
				error: err.message
			});
			
			console.error('✖ module load failed', err);
			return null;
		}
	}
	
	/**
		* Outputs a summary report
		* of the module loading results to the console.
	*/
	printReport() {
		console.table(this.report);
	}
}