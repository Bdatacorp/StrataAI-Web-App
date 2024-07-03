export interface Chat {
  content: string;
  references: string[];
}

export interface ChatCreateDto {
  text: string;
}
