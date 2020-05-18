 const createNewUser = async (userData) => {
   const fetchResponse = await fetch('http://localhost:3000/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      },
    });
   return await fetchResponse.json();
 };

const logIn = async (userData) => {
  const fetchResponse = await fetch('http://localhost:3000/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await fetchResponse.json();
};

const setGameResult = async (gameNumber, gameResult) => {
  const fetchResponse = await fetch('http://localhost:3000/v1/stats', {
    method: 'POST',
    body: JSON.stringify({game: gameNumber, result: gameResult}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
  });
  return await fetchResponse.json();
};

  const getUserScore = async (callback) => {
   let result = await fetch("http://localhost:3000/v1/stats", {
     headers: {
       Authorization: `Bearer ${localStorage.getItem('accessToken')}`
     },
   });
   let body = await result.json();
   callback(body.gameResults);
 };

 export {
   createNewUser,
   logIn,
   setGameResult,
   getUserScore,
 }
