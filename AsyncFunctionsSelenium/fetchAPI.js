///https://blog.stackademic.com/understanding-fetch-with-async-await-5289557d623a

// const fetchUserInfo = async () => {
//   const cookie = '__stripe_mid=9e782857-9b8e-4b53-a883-2010dec43a7118ba21; sid=s%3Auehzxg2R_NFxBp8cZmEunRIVfnxh4xQS.oyESCTNAwfYQnq0qlp2JtHBshZWgtzGcBy4Ym9ueYA0; asid=s%3AYb7G7Xrqm7jWkwH78knRAqxiSfShw6_v.b7d3f9%2BieztKXKOFpTaiILXo3rG2u26uKXxOK5Lc0tg';
//   const response = await fetch('http://localhost:3000/api/coupons/4e23f979-c141-47bf-a40b-42df38a5e0cd', {
//     method: 'PATCH',
//     body: JSON.stringify({key: 'value'}),
//     headers: {
//       'Content-Type': 'application/json',
//       'Cookie': cookie,
//     }
//   });

//   if(!response.ok) {
//     throw new Error(user data not found... ${response.status});
//   }

//   //parse json response:

//   const userData = await response.json();

//   console.log(userData);
// }

async function fetchUserInfo () {
    const cookie = '__stripe_mid=9e782857-9b8e-4b53-a883-2010dec43a7118ba21; sid=s%3Auehzxg2R_NFxBp8cZmEunRIVfnxh4xQS.oyESCTNAwfYQnq0qlp2JtHBshZWgtzGcBy4Ym9ueYA0; asid=s%3AYb7G7Xrqm7jWkwH78knRAqxiSfShw6_v.b7d3f9%2BieztKXKOFpTaiILXo3rG2u26uKXxOK5Lc0tg';
    const response = await fetch('http://localhost:3000/api/coupons/4e23f979-c141-47bf-a40b-42df38a5e0cd', {
      method: 'PATCH',
      body: JSON.stringify({key: 'value'}),
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
      }
    });
  
    if(!response.ok) {
      throw new Error(`user data not found... ${response.status}`);
    }
  
    //parse json response:
  
    const userData = await response.json();
  
    console.log(userData);
  }
  
  fetchUserInfo();
  
  // module.exports = fetchUserInfo;