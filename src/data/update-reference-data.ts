import {App, TFile} from 'obsidian';

function register_monitor_event (app: App) {
    app.vault.on('modify', (file : TFile) => {
        let oldfrontmatter : any = app.metadataCache.getFileCache(file);
        if (oldfrontmatter != null) oldfrontmatter = oldfrontmatter.frontmatter;

        app.fileManager.processFrontMatter(file, (newfrontmatter) => {
            if (newfrontmatter != oldfrontmatter) {
                // TODO: Update the new Reference Entry info
            }
        });
    });

}