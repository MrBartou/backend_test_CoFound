export interface Review {
  reviewId: number;
  reviewerId: number;
  subjectId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
}
