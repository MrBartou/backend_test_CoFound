export interface Conversation {
  conversationId: number;
  messageId: Record<string, any>;
  participants: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
