// frontend/src/api.js
export const fetchUserStats = async (username) => {
    const response = await fetch(`/api/user/${username}`);
    return response.json();
  };
  
  export const updateUserStats = async (username, stats) => {
    const response = await fetch(`/api/user/${username}/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });
    return response.json();
  };
  