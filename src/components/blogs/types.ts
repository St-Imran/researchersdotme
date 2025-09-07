export type InboxFlag = 0 | 1;

export type ISODateString = string;

export interface Block {
  value: string; 
  inbox?: InboxFlag;
  id?: string;
  image?: string | null;
  alt?: string | null;
  toc?: string; 
}




export interface Blog {
  slug: string;
  title: string;
  author?: string;
  date: ISODateString;
  first: string;
  image?: string; 
  content: Block[];
}


export type TocItem = {
  id: string
  title: string
}

export type TocProps = {
  items: TocItem[]
}

export type BlogContentBlock = {
  html: string
  inbox?: InboxFlag
  id?: string
  image?: string | null
  alt?: string | null
}

export type BlogContentProps = {
  blocks: BlogContentBlock[]
}

export type BlockWithHtml = Block & { html: string };


