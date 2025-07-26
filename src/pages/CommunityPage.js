import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const { id } = useParams(); // complexId
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWriteForm, setShowWriteForm] = useState(false);

  // API 함수들 (구현은 추후)
  const fetchPosts = async () => {
    // TODO: Firebase Firestore에서 게시글 목록 가져오기
    console.log('Fetching posts for complex:', id);
  };

  const createPost = async (postData) => {
    // TODO: 새 게시글 생성
    console.log('Creating new post:', postData);
  };

  const deletePost = async (postId) => {
    // TODO: 게시글 삭제
    console.log('Deleting post:', postId);
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const handleWritePost = () => {
    setShowWriteForm(true);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // TODO: 폼 데이터 처리
    setShowWriteForm(false);
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>🏢 단지 커뮤니티</h1>
        <p>입주민들과 소통하고 정보를 공유해보세요</p>
        <button 
          className="write-post-btn"
          onClick={handleWritePost}
        >
          ✏️ 글쓰기
        </button>
      </div>

      {showWriteForm && (
        <div className="post-form">
          <h3>새 게시글 작성</h3>
          <form onSubmit={handlePostSubmit}>
            <input 
              type="text" 
              placeholder="제목을 입력하세요"
              required
            />
            <textarea 
              placeholder="내용을 입력하세요"
              rows="6"
              required
            />
            <div className="form-buttons">
              <button type="submit">등록</button>
              <button 
                type="button" 
                onClick={() => setShowWriteForm(false)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="posts-list">
        {loading ? (
          <div className="loading">게시글을 불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">
            <p>아직 게시글이 없습니다.</p>
            <p>첫 번째 게시글을 작성해보세요!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h3>{post.title}</h3>
                <span className="post-author">{post.author}</span>
                <span className="post-date">{post.createdAt}</span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-footer">
                <span>💬 댓글 {post.commentCount}</span>
                <span>👍 좋아요 {post.likeCount}</span>
                <button onClick={() => navigate(`/complex/${id}/community/post/${post.id}`)}>
                  자세히 보기
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage; 