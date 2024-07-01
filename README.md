# Obsidian Reference Manager (ORM)
Most people rely on another reference manager (e.g. Zotero, Jabref) in order to cite in Obsidian. However, not only are the syncing process cluncky and unreliable, but the bibliography data also remain inaccessible by the Obsidian ecosystem (for instance, if one wants to query them using Dataview). After reviewing the documentations, I think that Obsidian can totally be its own reference manager, and one even more powerful and well integrated into an academic workflow. This project serves to validate such a hypothesis.

# Principles and Features
- Each reference exists as a page, like an index card. This way, references can be easily linked to pages and files in Obsidian, and they can be easily queried via Dataview.
- Citing becomes essentially a Dataview query. In fact, users can do a lot more than citation.  
  (I origianlly planned to store reference dat in JSON and work directly on it in Javascript. It would have been easy for developers, but only by using Dataview would the reference data become fully accessible to the users.)
- Reference pages can be automatically generated by improrting a CSL-JSON file, so one doesn't have to work all the way from sctatch if they already have a database.
  (I choose CSL-JSON because it is more cross-platform and supports more document types.)
- Similarly, CSL-JSON file can be easily generated from reference pages via an export. This is not needed if one writes and cites exclusively within Obsidian. This is only needed if one needs to write and cite elsewhere or eventually convert Markdown to another format via Pandoc, for instance.

# Roadmap
*Milestone 1: Index Cards*
- [ ] 0.0.1 Define Index Card Schemas based on CSL-JSON; set up Obsidian tempaltes for these schemas.
- [ ] 0.0.5 Function to one-time import CSL-JSON into Obsidian, with each page representing an reference and all pages residing in an Index Card folder.  
      (At this stage I don't want to worry about resolving conficts with existing pages. I want to get to the next steps more quickly, so this is just for one-time set up so I have some data to work with.)
- [ ] 0.1.0 Build up a basic, view-only reference manager UI within Obsidian.

*Milestone 2: Citation*
- [ ] 0.1.5 Develop a very basic citation tool for people to easily query and insert citation as they write.
      An importnat part of this is to decide how to provide the best featuers within Obsidian while making the file still readable as a Markdown file, both for human reading and for other processors such as Pandoc Citeproc.
- [ ] 0.2.0 Ability to export references to CSL-JSON.

*Milestone 3: Reference Manager UI*
- [ ] 0.3.0 Make the UI fully interactive and editable.
- [ ] Maybe more advanced support for folders/categories/tags?

*Beta 1: More features, Refinements, and Bug-Fixes*
- [ ] 0.4.5 Write a user guide; list prerequisites and incompatiblities/conflict with other plugins.
- [ ] 0.5.0 Publish to Obsidian Community Plugin Store.

*Beta 2: More features, Refinements, and Bug-Fixes*

*Release Candidate: Additional Features*
Under consideration:
- .bib support.
- Conflict resolution with existing pages for import.
