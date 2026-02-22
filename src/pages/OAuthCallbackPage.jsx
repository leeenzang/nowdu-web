import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 꺼내기
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
}

export default OAuthCallbackPage;