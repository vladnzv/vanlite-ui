var VanliteBundle = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/vanlite.prod.js
  var vanlite_prod_exports = {};
  __export(vanlite_prod_exports, {
    Vanlite: () => Vanlite
  });

  // src/core/libs.js
  var libs_default = {
    id: "libs",
    init() {
    },
    apply(elem, config) {
      if (config.id)
        elem.id = config.id;
      if (config.name)
        elem.name = config.name;
      if (config.className) {
        elem.className = this.joinStr(elem.className, config.className);
      }
      if (config.dataset)
        for (let key in config.dataset)
          elem.dataset[key] = config.dataset[key];
      if (config.style)
        elem.style.cssText = config.style;
      if (config.disable)
        elem.disabled = config.disable;
    },
    joinStr(...args) {
      return args.filter((value) => value !== void 0 && value !== null && value !== false).map((value) => String(value).trim()).filter(Boolean).join(" ");
    }
  };

  // src/modal/modal.js
  var modal_default = {
    id: "modal",
    identifier: "vl-modal",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
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
      const { title, btnClose, content } = config;
      const footer = this.getFooter(config);
      const wrapper = document.createElement("div");
      wrapper.className = this.wrapper;
      if (title || btnClose) {
        const header = document.createElement("header");
        header.className = "vl-modal-header";
        const titleEl = document.createElement("h2");
        titleEl.className = "vl-modal-title";
        titleEl.textContent = title || "";
        header.append(titleEl);
        wrapper.append(header);
      }
      const contentEl = document.createElement("div");
      contentEl.className = "vl-modal-content";
      if (content instanceof Node) {
        contentEl.append(content);
      } else if (content != null) {
        contentEl.insertAdjacentHTML("beforeend", content);
      }
      wrapper.append(contentEl);
      if (footer) {
        const footerEl = document.createElement("footer");
        footerEl.className = "vl-modal-footer";
        footerEl.append(footer);
        wrapper.append(footerEl);
      }
      return wrapper;
    },
    createContainerIfNoExist(root) {
      if (root.querySelector(`#${this.identifier}`))
        return;
      const dialog = root.createElement("dialog");
      dialog.id = this.identifier;
      root.querySelector("body").append(dialog);
    },
    apply(root, config, container) {
      if (config.width)
        root.style.width = config.width + "px";
      if (config.height)
        root.style.height = config.height + "px";
      if (config.btnClose)
        this.createBtnClose(root);
      if (config.skin)
        root.dataset.skin = config.skin;
      if (config.outClose) {
        container.addEventListener("click", (e) => {
          if (e.target === container)
            this.close(container);
        });
      }
    },
    getFooter(config) {
      if (!config.btnFooter)
        return false;
      let box_with_btns = document.createElement("div");
      box_with_btns.classList.add("vl-modal-footer-btns");
      for (let i = 0; i < config.btnFooter.length; i++) {
        const item = config.btnFooter[i];
        let label = item.label || "DefaultButton";
        box_with_btns.append(this.createBtnFooter(item));
      }
      return box_with_btns;
    },
    createBtnFooter(item) {
      const button = document.createElement("button");
      button.textContent = item.label;
      button.classList.add("vl-modal-footer-btn");
      for (let key in item.dataset) {
        let value = item.dataset[key];
        button.dataset[key] = value;
      }
      if (item.callback)
        button.addEventListener("click", item.callback);
      return button;
    },
    createBtnClose(root) {
      const btn = '<button class="vl-modal-close">\u2716</button>';
      root.querySelector(".vl-modal-header").insertAdjacentHTML("beforeend", btn);
      root.querySelector(".vl-modal-close").addEventListener(
        "click",
        () => {
          root = root.closest("#vl-modal");
          root.innerHTML = "";
          root.close();
        }
      );
    },
    close(root = false) {
      if (root.id != "vl-modal")
        root = root.querySelector("#vl-modal");
      root.innerHTML = "";
      root.close();
    }
  };

  // src/toast/toast.js
  var toast_default = {
    id: "toast",
    identifier: "vl-toasts-container",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    icons: {
      success: "\u2714",
      error: "\u2716",
      warning: "\u26A0",
      info: "\u2139"
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      this.createContainerIfNoExist(container);
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.querySelector("#" + this.identifier).append(elem);
      elem.addEventListener("click", () => {
        elem.remove();
      }, { once: true });
      this.makeTimer(elem, config);
    },
    makeTimer(toast, config) {
      const lifetime = config.lifetime || 3e3;
      setTimeout(() => {
        toast.remove();
      }, lifetime);
    },
    apply(toast, config) {
      if (config.type)
        toast.dataset.skin = config.type;
    },
    createContainerIfNoExist(container = null) {
      if (!container)
        container = document;
      if (container.querySelector("#" + this.identifier))
        return;
      const root = container.createElement("div");
      root.id = this.identifier;
      container.body.append(root);
    },
    create(config) {
      const root = document.createElement("div");
      root.classList = "vl-toast";
      const title = config.title || "";
      const content = config.content || "";
      if (config.id)
        root.id = config.id;
      let insert = `${this.getIcon(config)}
<div class="vl-toast-body">
	<div class="vl-toast-title">${title}</div>
	<div class="vl-toast-content">${content}</div>
</div>`;
      root.innerHTML = insert;
      return root;
    },
    getIcon(config) {
      let result = "";
      if (config.type) {
        result = `<div class="vl-toast-sign">${this.icons[config.type]}</div>`;
      }
      if (config.image) {
        result = `<div class="vl-toast-icon"><img src="${config.image}"></div>`;
      }
      return result;
    }
  };

  // src/switch/switch.js
  var switch_default = {
    id: "switch",
    identificator: "vl-switch",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem.querySelector(".vl-switch-input"), config);
      this.apply(elem.querySelector(".vl-switch-input"), config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.checked)
        elem.checked = config.checked;
      if (config.callback)
        elem.addEventListener("change", config.callback);
    },
    create(config) {
      const root = document.createElement("label");
      root.classList.add(`${this.identificator}`);
      const title = config.title || "";
      let insert = `<input type="checkbox" class="vl-switch-input">
<span class="vl-switch-slider"></span>
<span class="vl-switch-text">${config.title}</span>`;
      root.innerHTML = insert;
      return root;
    }
  };

  // src/button/button.js
  var button_default = {
    id: "button",
    identificator: "vl-btn",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("click", config.callback);
    },
    create(config) {
      const elem = document.createElement("button");
      const classes = config.class || "";
      const title = config.title || "";
      elem.classList = this.app.libs.joinStr(
        elem.classList,
        this.identificator,
        classes
      );
      elem.textContent = title;
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      return elem;
    }
  };

  // src/radio/radio.js
  var radio_default = {
    id: "radio",
    identificator: "vl-radio",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem.querySelector("input"), config);
      this.apply(elem.querySelector("input"), config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("change", config.callback);
    },
    create(config) {
      const elem = document.createElement("label");
      const classes = config.class || "";
      const title = config.title || "";
      elem.classList = this.app.libs.joinStr(
        elem.classList,
        this.identificator + "-wrapper",
        classes
      );
      let insert = elem.innerHTML = `<input type="radio" class="vl-radio">
		${title}`;
      return elem;
    }
  };

  // src/checkbox/checkbox.js
  var checkbox_default = {
    id: "checkbox",
    identifier: "vl-checkbox",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      if (!container)
        return false;
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("change", config.callback);
    },
    create(config) {
      if (config.title)
        return this.createWithText(config);
      const elem = document.createElement("input");
      elem.type = "checkbox";
      const classes = config.class || "";
      const title = config.title || "";
      elem.classList = this.app.libs.joinStr(
        elem.classList,
        this.identifier,
        classes
      );
      return elem;
    },
    createWithText(config) {
      const elem = document.createElement("label");
      elem.classList.add(this.wrapper);
      const title = config.title || "";
      let insert = `<input type="checkbox" class="${this.identifier}">
<span class="vl-checkbox-text">${config.title}</span>`;
      elem.innerHTML = insert;
      return elem;
    }
  };

  // src/input/input.js
  var input_default = {
    id: "input",
    identifier: "vl-input",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("focusout", config.callback);
      if (config.placeholder)
        elem.placeholder = config.placeholder;
    },
    create(config) {
      if (config.type == "password")
        return this.createPassword(config);
      const elem = document.createElement("input");
      elem.classList.add(this.identifier);
      return elem;
    },
    createPassword(config) {
      const elem = document.createElement("div");
      elem.classList.add("vl-password");
      const insert = `<input class="vl-input" type="password" placeholder="Password">
<button class="vl-password-toggle" type="button" data-ui="vl-password-toggle">\u{1F441}</button>`;
      elem.innerHTML = insert;
      const toggle = elem.querySelector('[data-ui="vl-password-toggle"]');
      toggle.addEventListener("click", () => {
        const input = event.target.parentElement.querySelector(`.${this.identifier}`);
        if (input.type === "password") {
          toggle.setAttribute("aria-pressed", true);
          input.type = "text";
        } else {
          toggle.setAttribute("aria-pressed", false);
          input.type = "password";
        }
      });
      return elem;
    }
  };

  // src/range/range.js
  var range_default = {
    id: "range",
    identifier: "vl-range",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
      this.rangeUpdate(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("change", config.callback);
    },
    create(config) {
      const elem = document.createElement("input");
      elem.classList.add(this.identifier);
      elem.dataset.ui = this.identifier;
      elem.type = "range";
      elem.min = config.min || 1;
      elem.max = config.max || 100;
      return elem;
    },
    rangeUpdate(range) {
      const update = () => {
        const percent = (range.value - range.min) / (range.max - range.min) * 100;
        range.style.setProperty(
          "--range-progress",
          percent + "%"
        );
      };
      update();
      range.addEventListener("input", update);
    }
  };

  // src/progress/progress.js
  var progress_default = {
    id: "progress",
    identifier: "vl-progress",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("change", config.callback);
    },
    create(config) {
      let elem = null;
      if (config.type == "lineare")
        elem = this.createLineare(config);
      else if (config.type == "radial")
        elem = this.createRadial(config);
      else
        elem = this.createLineare(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      return elem;
    },
    createRadial(config) {
      const elem = document.createElement("div");
      elem.classList = this.identifier + "-circle";
      elem.dataset.progress = config.progress;
      const insert = `<svg viewBox="0 0 100 100">
	<circle class="vl-progress-bg" cx="50" cy="50" r="45"></circle>
	<circle class="vl-progress-value" cx="50" cy="50" r="45"></circle>
</svg>
<span class="vl-progress-text">0%</span>`;
      elem.insertAdjacentHTML("beforeend", insert);
      this.valueProgressCircleSet(elem);
      console.log(elem);
      return elem;
    },
    valueProgressCircleSet(circle) {
      const value = circle.dataset.progress;
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - value / 100 * circumference;
      const progress = circle.querySelector(".vl-progress-value");
      progress.style.strokeDashoffset = offset;
      circle.querySelector(".vl-progress-text").textContent = value + "%";
    },
    setCircleProgress(el, value) {
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - value / 100 * circumference;
      const progress = el.querySelector(".vl-progress-value");
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = offset;
      el.querySelector(".vl-progress-text").textContent = Math.round(value) + "%";
    },
    animateCircleProgress(selector, seconds = 5) {
      const el = typeof selector === "string" ? document.querySelector(selector) : selector;
      const duration = seconds * 1e3;
      const start = performance.now();
      const frame = (time) => {
        const progress = Math.min(
          (time - start) / duration,
          1
        );
        const percent = progress * 100;
        this.setCircleProgress(el, percent);
        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
    },
    createLineare(config) {
      let elem = config.id ? document.querySelector("#" + config.id) : null;
      if (!(elem instanceof HTMLProgressElement)) {
        elem = document.createElement("progress");
        if (config.id)
          elem.id = config.id;
      }
      if (config.progress) {
        elem.max = 100;
        if (config.progress > 100) config.progress = 100;
        elem.value = config.progress;
      } else {
        elem.max = config.max;
        elem.value = config.value;
      }
      return elem;
    }
  };

  // src/accordion/accordion.js
  var accordion_default = {
    id: "accordion",
    identifier: "vl-accordion",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("click", config.callback);
    },
    create(config) {
      let result = document.createElement("div");
      result.classList.add(this.identifier);
      result = this.makeItems(result, config);
      return result;
    },
    makeItems(root, config) {
      const array = config.items;
      for (let i = 0; i < array.length; i++) {
        let item = document.createElement("details");
        item.classList.add(this.identifier + "-item");
        if (config.iName)
          item.name = config.iName;
        let header = document.createElement("summary");
        header.classList.add(this.identifier + "-header");
        header.textContent = array[i][0];
        let body = document.createElement("div");
        body.classList.add(this.identifier + "-body");
        body.textContent = array[i][1];
        item.append(header);
        item.append(body);
        root.append(item);
      }
      return root;
    }
  };

  // src/tabs/tabs.js
  var tabs_default = {
    id: "tabs",
    identifier: "vl-tabs",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("click", config.callback);
    },
    create(config) {
      let result = document.createElement("div");
      result.classList.add(this.identifier);
      result.dataset.ui = "vl-tabs";
      result = this.makeItems(result, config);
      this.handler(result);
      return result;
    },
    makeItems(root, config) {
      const array = config.items;
      const tabs_list = document.createElement("div");
      tabs_list.classList.add("vl-tabs-list");
      const tabs_panel = document.createElement("div");
      tabs_panel.classList.add("vl-tabs-panel");
      for (let i = 0; i < array.length; i++) {
        let list_item = document.createElement("button");
        list_item.classList = "vl-btn vl-tabs-list-item";
        list_item.dataset.tab = array[i]["id"];
        list_item.textContent = array[i]["title"];
        tabs_list.append(list_item);
        let panel_item = document.createElement("div");
        panel_item.classList = "vl-tabs-panel-item";
        panel_item.dataset.tab = array[i]["id"];
        panel_item.textContent = array[i]["content"];
        tabs_panel.append(panel_item);
      }
      root.append(tabs_list);
      root.append(tabs_panel);
      console.log(root);
      return root;
    },
    handler(tabs) {
      const buttons = tabs.querySelectorAll(".vl-tabs-list-item");
      const panels = tabs.querySelectorAll(".vl-tabs-panel-item");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const name = btn.dataset.tab;
          buttons.forEach(
            (b) => b.classList.remove("is-active")
          );
          panels.forEach(
            (p) => p.classList.remove("is-active")
          );
          btn.classList.add("is-active");
          tabs.querySelector(
            `.vl-tabs-panel [data-tab="${name}"]`
          ).classList.add("is-active");
        });
      });
    }
  };

  // src/dropdown/dropdown.js
  var dropdown_default = {
    id: "dropdown",
    identifier: "vl-dropdown",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      const elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (typeof config.callback === "function")
        elem.addEventListener("click", (e) => {
          config.callback(e);
          if (elem instanceof HTMLElement) {
            elem.blur();
          }
        });
    },
    create(config) {
      const result = document.createElement("div");
      result.classList.add(this.wrapper);
      const btn = document.createElement("button");
      btn.classList.add("vl-btn");
      btn.classList.add(this.identifier + "-trigger");
      btn.setAttribute("aria-haspopup", "true");
      const trigger_name = config.trigger_name || "";
      btn.textContent = trigger_name;
      const elem_drop = document.createElement("div");
      elem_drop.classList.add(this.identifier);
      elem_drop.setAttribute("role", "menu");
      this.createItems(elem_drop, config.items || []);
      result.append(btn);
      result.append(elem_drop);
      return result;
    },
    createItems(root, items = []) {
      items.forEach((itemData) => {
        const item = document.createElement("button");
        item.classList.add(`${this.identifier}-item`);
        item.setAttribute("role", "menuitem");
        if (itemData.id)
          item.dataset.id = itemData.id;
        item.textContent = itemData.title || "";
        if (itemData.disabled)
          item.disabled = true;
        this.apply(item, itemData);
        root.append(item);
      });
    }
  };

  // src/card/card.js
  var card_default = {
    id: "card",
    identifier: "vl-card",
    get wrapper() {
      return `${this.identifier}-wrapper`;
    },
    init(app) {
      this.app = app;
    },
    insert(container, config) {
      let elem = null;
      config.sceleton ? elem = this.createSceleton(config) : elem = this.create(config);
      this.app.libs.apply(elem, config);
      this.apply(elem, config);
      container.append(elem);
    },
    apply(elem, config) {
      if (config.callback)
        elem.addEventListener("click", config.callback);
    },
    createSceleton(config) {
      const result = document.createElement("div");
      result.classList.add(this.identifier);
      const header = document.createElement("div");
      header.classList.add(this.identifier + "-header");
      header.classList.add("vl-skeleton");
      header.classList.add("vl-skeleton-title");
      const body = document.createElement("div");
      body.classList.add(this.identifier + "-body");
      body.classList.add("vl-skeleton");
      body.classList.add("vl-skeleton-text");
      const footer = document.createElement("div");
      footer.classList.add(this.identifier + "-footer");
      footer.classList.add("vl-skeleton");
      footer.classList.add("vl-skeleton-text");
      result.append(header);
      result.append(body);
      result.append(footer);
      return result;
    },
    create(config) {
      const result = document.createElement("div");
      result.classList.add(this.identifier);
      const header = document.createElement("div");
      header.classList.add(this.identifier + "-header");
      const title = config.title || "";
      header.textContent = title;
      const body = document.createElement("div");
      body.classList.add(this.identifier + "-body");
      const content = config.content || "";
      body.textContent = content;
      const footer = document.createElement("div");
      footer.classList.add(this.identifier + "-footer");
      const footer_content = config.footer || "";
      footer.innerHTML = footer_content;
      result.append(header);
      result.append(body);
      result.append(footer);
      return result;
    },
    createItems(root, config) {
      const items = config.items;
      for (let i = 0; i < items.length; i++) {
        let item = document.createElement("button");
        item.classList.add("vl-dropdown-item");
        item.dataset.id = items[i]["id"];
        item.textContent = items[i]["title"];
        this.apply(item, config.items[i]);
        root.append(item);
      }
    }
  };

  // src/vanlite.prod.js
  var modulesRegistry = [
    libs_default,
    modal_default,
    toast_default,
    switch_default,
    button_default,
    radio_default,
    checkbox_default,
    input_default,
    range_default,
    progress_default,
    accordion_default,
    tabs_default,
    dropdown_default,
    card_default
  ];
  var Vanlite = class {
    constructor() {
      this.modules = [];
      this.report = [];
    }
    async loadAll() {
      console.group("Vanlite-UI");
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
        if (!module || typeof module !== "object") {
          throw new Error("Invalid module export");
        }
        if (!module.id) {
          throw new Error("Module has no id");
        }
        await module.init?.(this);
        this.modules.push(module);
        this.report.push({ id: module.id, status: "OK" });
        this[module.id] = module;
        console.log(`\u2714 ${module.id}`);
        return module;
      } catch (err) {
        this.report.push({
          id: module?.id || "unknown",
          status: "FAILED",
          error: err.message
        });
        console.error("\u2716 module load failed", err);
        return null;
      }
    }
    printReport() {
      console.table(this.report);
    }
  };
  return __toCommonJS(vanlite_prod_exports);
})();
window.Vanlite=VanliteBundle.Vanlite;
