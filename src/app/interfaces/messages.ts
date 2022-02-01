export interface Message {
  id: string,
  notDeletable?: boolean,
  receiverId: string,
  senderId: string,
  text: string
}

export interface NewMessage {
  receiverId: string,
  text: string
}