import { App, Vault, Editor, MarkdownView, Modal, SuggestModal, Notice, Plugin,
	PluginSettingTab, Setting } from 'obsidian';

const {app, vault} = require('obsidian');

interface ORM_Settings {
	reference_root_folder: string;
}
const DEFAULT_SETTINGS: ORM_Settings = {
	reference_root_folder: 'References/'
}

export default class ORM_Plugin extends Plugin {
	settings: ORM_Settings;

	async onload() {

		// Load Settings
		await this.loadSettings();

		// Add Commands
		this.addCommand({
			id: 'new-reference-entry',
			name: 'New Reference Entry',
			callback: () => {
                new NewReferenceEntryModal(this.app).open();
            }
		});
	}	

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

const item_types : string[] = require('./data/csl-types.json')["item_types"]

class NewReferenceEntryModal extends SuggestModal<string> {
	
	constructor(app: App) {
        super(app);
    }

    getSuggestions(query: string): string[] {
        return item_types.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    }

    renderSuggestion(item: string, el: HTMLElement) {
        el.createEl('div', { text: item });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        new Notice(`You selected: ${item}`);
    }
}