export interface Message {
  id?: string,
  notDeletable?: true,
  receiverId?: string,
  senderId?: string,
  text: string
}