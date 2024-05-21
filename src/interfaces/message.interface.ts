export interface Message {
  messageId: number;
  conversationId: number;
  fromUserId: number;
  toUserId: number;
  messageText: string;
  sentAt: Date;
  read: boolean;
  readAt?: Date;
}
