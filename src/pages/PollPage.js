import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PollPage = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPollForm, setShowPollForm] = useState(false);

  // API 함수들 (구현은 추후)
  const fetchPolls = async () => {
    // TODO: Firebase Firestore에서 투표 목록 가져오기
    console.log('Fetching polls');
  };

  const createPoll = async (pollData) => {
    // TODO: 새 투표 생성
    console.log('Creating new poll:', pollData);
  };

  const votePoll = async (pollId, vote) => {
    // TODO: 투표하기
    console.log('Voting for poll:', pollId, vote);
  };

  const checkUserVote = async (pollId) => {
    // TODO: 사용자 투표 여부 확인
    console.log('Checking user vote for poll:', pollId);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleCreatePoll = () => {
    setShowPollForm(true);
  };

  const handlePollSubmit = (e) => {
    e.preventDefault();
    // TODO: 폼 데이터 처리
    setShowPollForm(false);
  };

  const handleVote = (pollId, vote) => {
    votePoll(pollId, vote);
  };

  return (
    <div className="poll-page">
      <div className="poll-header">
        <h1>🗳️ 공동구매 제안 & 투표</h1>
        <p>원하는 상품을 제안하고 투표해보세요!</p>
        <button 
          className="create-poll-btn"
          onClick={handleCreatePoll}
        >
          💡 새 제안하기
        </button>
      </div>

      {showPollForm && (
        <div className="poll-form">
          <h3>새 공동구매 제안</h3>
          <form onSubmit={handlePollSubmit}>
            <input 
              type="text" 
              placeholder="상품명을 입력하세요"
              required
            />
            <textarea 
              placeholder="상품 설명과 희망 가격을 입력하세요"
              rows="4"
              required
            />
            <input 
              type="number" 
              placeholder="목표 투표 수 (예: 10)"
              min="1"
              required
            />
            <input 
              type="date" 
              placeholder="투표 마감일"
              required
            />
            <div className="form-buttons">
              <button type="submit">제안 등록</button>
              <button 
                type="button" 
                onClick={() => setShowPollForm(false)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="polls-list">
        {loading ? (
          <div className="loading">투표 목록을 불러오는 중...</div>
        ) : polls.length === 0 ? (
          <div className="no-polls">
            <p>아직 제안된 공동구매가 없습니다.</p>
            <p>첫 번째 제안을 해보세요!</p>
          </div>
        ) : (
          polls.map(poll => (
            <div key={poll.id} className="poll-card">
              <div className="poll-header">
                <h3>{poll.title}</h3>
                <span className="poll-status">
                  {poll.voteCount >= poll.threshold ? '🎉 목표 달성!' : '진행중'}
                </span>
              </div>
              <p className="poll-description">{poll.description}</p>
              <div className="poll-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${(poll.voteCount / poll.threshold) * 100}%`}}
                  ></div>
                </div>
                <span className="progress-text">
                  {poll.voteCount} / {poll.threshold} 명
                </span>
              </div>
              <div className="poll-footer">
                <span>⏰ 마감: {poll.deadline}</span>
                <div className="vote-buttons">
                  <button 
                    className="vote-btn agree"
                    onClick={() => handleVote(poll.id, 'agree')}
                    disabled={poll.userVoted}
                  >
                    👍 찬성 ({poll.agreeCount})
                  </button>
                  <button 
                    className="vote-btn disagree"
                    onClick={() => handleVote(poll.id, 'disagree')}
                    disabled={poll.userVoted}
                  >
                    👎 반대 ({poll.disagreeCount})
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PollPage; 