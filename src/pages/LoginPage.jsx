function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Nowdu</h1>
      <p className="text-gray-500 mb-10">지금 뭐 해야 하는지, 한눈에</p>
      <button
        onClick={handleLogin}
        className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 font-medium hover:shadow-md transition-shadow">
        🌐 Google로 시작하기
      </button>
    </div>
  );
}

export default LoginPage;