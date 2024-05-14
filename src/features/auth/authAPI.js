import axios from 'axios';


export function createUser(userInfo) {
  return axios.post('http://localhost:8080/user', userInfo);
}


export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = loginInfo;
      const response = await axios.get(`http://localhost:8080/user?email=${email}`);
      const data = response.data;
      console.log({ data });
      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject({ message: 'wrong credentials' });
        }
      } else {
        reject({ message: 'user not found' });
      }
      // TODO: on server it will only return some info of user (not password)
    } catch (error) {
      reject({ message: error.message });
    }
  });
}
export function signOutUser(userId){
  return {data:'sucess'};
}


