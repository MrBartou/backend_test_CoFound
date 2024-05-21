export interface Conversation {
  conversationId: number;
  participants: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
