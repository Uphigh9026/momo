import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // API 함수들 (구현은 추후)
  const fetchReviews = async () => {
    // TODO: Firebase Firestore에서 후기 목록 가져오기
    console.log('Fetching reviews');
  };

  const createReview = async (reviewData) => {
    // TODO: 새 후기 생성
    console.log('Creating new review:', reviewData);
  };

  const likeReview = async (reviewId) => {
    // TODO: 후기 좋아요
    console.log('Liking review:', reviewId);
  };

  const addComment = async (reviewId, comment) => {
    // TODO: 댓글 추가
    console.log('Adding comment to review:', reviewId, comment);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // TODO: 폼 데이터 처리
    setShowReviewForm(false);
  };

  const handleLike = (reviewId) => {
    likeReview(reviewId);
  };

  const handleComment = (reviewId) => {
    const comment = prompt('댓글을 입력하세요:');
    if (comment) {
      addComment(reviewId, comment);
    }
  };

  return (
    <div className="review-page">
      <div className="review-header">
        <h1>💬 실사용 후기</h1>
        <p>입주민들의 실제 사용 후기를 확인해보세요</p>
        <button 
          className="write-review-btn"
          onClick={handleWriteReview}
        >
          ✍️ 후기 작성
        </button>
      </div>

      {showReviewForm && (
        <div className="review-form">
          <h3>새 후기 작성</h3>
          <form onSubmit={handleReviewSubmit}>
            <select required>
              <option value="">카테고리 선택</option>
              <option value="붙박이장">붙박이장</option>
              <option value="커튼">커튼</option>
              <option value="줄눈">줄눈</option>
              <option value="도배">도배</option>
              <option value="청소">청소</option>
              <option value="에어컨">에어컨</option>
            </select>
            <input 
              type="text" 
              placeholder="제목을 입력하세요"
              required
            />
            <textarea 
              placeholder="사용 후기를 자세히 작성해주세요"
              rows="6"
              required
            />
            <div className="rating-section">
              <label>별점:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="star">⭐</span>
                ))}
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              placeholder="사진 첨부 (선택)"
            />
            <div className="form-buttons">
              <button type="submit">후기 등록</button>
              <button 
                type="button" 
                onClick={() => setShowReviewForm(false)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reviews-list">
        {loading ? (
          <div className="loading">후기를 불러오는 중...</div>
        ) : reviews.length === 0 ? (
          <div className="no-reviews">
            <p>아직 등록된 후기가 없습니다.</p>
            <p>첫 번째 후기를 작성해보세요!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-info">
                  <h3>{review.title}</h3>
                  <span className="review-category">{review.category}</span>
                  <div className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <div className="review-meta">
                  <span className="review-author">{review.author}</span>
                  <span className="review-date">{review.createdAt}</span>
                </div>
              </div>
              
              <p className="review-content">{review.content}</p>
              
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`후기 이미지 ${index + 1}`}
                      className="review-image"
                    />
                  ))}
                </div>
              )}
              
              <div className="review-footer">
                <div className="review-actions">
                  <button 
                    className="like-btn"
                    onClick={() => handleLike(review.id)}
                  >
                    👍 좋아요 ({review.likeCount})
                  </button>
                  <button 
                    className="comment-btn"
                    onClick={() => handleComment(review.id)}
                  >
                    💬 댓글 ({review.commentCount})
                  </button>
                </div>
                
                {review.comments && review.comments.length > 0 && (
                  <div className="review-comments">
                    <h4>댓글</h4>
                    {review.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-content">{comment.content}</span>
                        <span className="comment-date">{comment.createdAt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage; 