// CSL Schema as Typescript Interfaces
// Based on https://docs.citationstyles.org/en/stable/specification.html and
// https://github.com/citation-style-language/schema/blob/master/schemas/input/csl-data.json
// The goal is to be able to directly import/export between raw CSL-JSON data and object here.

import { isString } from "util";

const CSL_2_ORM_types_mapping = {
  "article-journal": "Journal Article",
  "article-magazine" : "Magazine Article",
  "article-newspaper": "Newspaper Article",
  "book": "Book",
  "chapter": "Book Chapter",
  "thesis": "Thesis/Dissertation",
  "webpage": "Web Page",
  "paper-conference": "Conference Paper",
  "entry-dictionary": "Dictionary Entry",
  "entry-Encyclopedia": "Encyclopedia Entry"
}

const ORM_2_CSL_types_mapping = Object.fromEntries(
  Object.entries(CSL_2_ORM_types_mapping).map(([key, value]) => [value, key])
);

interface CSL_ReferenceEntry_Schema {
  id: string;
  title?: string;
  'title-short'?: string;
  author?: Array<CSL_ReferenceEntry_Schema_Contributor>;
  issued?: CSL_ReferenceEntry_Schema_Date;
}

interface CSL_ReferenceEntry_Schema_Contributor {
  given?: string;
  family?: string;
  suffix?: string;
  literal?: string;
}

interface CSL_ReferenceEntry_Schema_Date {
  'date-parts'?: [[number, number?, number?], [number, number?, number?]?];
  season?: [string, number];
}


// ORM internal schema

interface ORM_ReferenceEntry_Schema {
  'Citekey': string;
  'Title'?: string;
  'Short Title'?: string;
  'Author'?: Array<ORM_ReferenceEntry_Schema_Contributor>;
  'Publication Date'?: ORM_ReferenceEntry_Schema_Date;
  'Publisher Name'?: string;
  'Publisher Place'?: string;
}

interface ORM_ReferenceEntry_Schema_Contributor {
  'Primary Name'?: string; // Last name, mononym, instituional name, special name/title etc.
  'Secondary Name'?: string;
  'Suffix'?: string; // Chicago Manual of Style (14.75) does not do comma for suffixes.
}

interface ORM_ReferenceEntry_Schema_Date {
  'Year'?: number;
  'Month'?: number;
  'Day'?: number;
  'Season'?: string;
  // TODO: Support for season, circa, etc.
}


// Mappers

function convert_CSL_to_ORM (source: CSL_ReferenceEntry_Schema): ORM_ReferenceEntry_Schema | undefined {
  if ((source.id == null || undefined)) {
    return undefined;
  }
  
  const target: ORM_ReferenceEntry_Schema = { Citekey: source.id };
  
  if (isStringNotEmpty(source.title)) target.Title = source.title;
  if (isStringNotEmpty(source["title-short"])) target["Short Title"] = source["title-short"];

  if (source.author) {
    const temp = convert_CSL_to_ORM_contributor (source.author);
    if (temp != undefined) target.Author = temp;
  }
  

  return target;
}

function convert_CSL_to_ORM_contributor (source: CSL_ReferenceEntry_Schema_Contributor[]): ORM_ReferenceEntry_Schema_Contributor[] | undefined {
  const target: ORM_ReferenceEntry_Schema_Contributor[] = []
  source.forEach (src => {
    const tgt : ORM_ReferenceEntry_Schema_Contributor = {}
    if (src.literal) { // if the literal field is used, in the case of instituion or speical name
      tgt["Primary Name"] = src.literal;
    }
    else if (isStringNotEmpty(src.family)) {
      tgt["Primary Name"] = src.family;
      tgt["Secondary Name"] = src.given;
    } 
    else if (isStringNotEmpty(src.given)) {
      tgt["Primary Name"] = src.given;
    }
    else {
      return;
    }
    target.push(tgt);
  });
  return (target.length == 0) ? undefined : target;
}

function convert_ORM_to_CSL (source: ORM_ReferenceEntry_Schema): CSL_ReferenceEntry_Schema | undefined {
  const target: CSL_ReferenceEntry_Schema = {};
  // TODO
  return target;
}
