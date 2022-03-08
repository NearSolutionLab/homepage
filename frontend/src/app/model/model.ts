export class Reference {
  id: string;
  image: string;
  tags: string;
  title: string;
  tagList: string[];
  description: string;
  files: any;
  imageUrl: string;
}

export class Mail {
  title: string;
  contents: string;
  files: any;
}

export class Attachment {
  id: string;
  filePath: string;
  title: string;
  description: string;
  files: any;
  fileUrl: string;
  fileName: string;
  download: string;
}

export class Tag {
  id: number;
  name: string;
  count: number;
  selected: boolean;
}
