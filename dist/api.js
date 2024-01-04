export async function getUsers(){
    return fetch("users.json")
             .then(response => {
                 if(!response.ok){
                     throw new Error("Network response was not ok");
                 }
                 return response.json();
             })
             .then(data => {
                 return data.map(users => {
                     return {
                         first_name:users.first_name,
                         last_name: users.last_name,
                         user_id: users.user_id,
                         age: users.age,
                         email: users.email,
                         country: users.country,
                         registration_date: users.registration_date,
                         job: users.job
                     }
                 })
             })
             .catch(error => {
                 console.log("Error fetching data: ", error)
             })
 }
