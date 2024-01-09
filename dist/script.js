async function getUsers(){
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
async function userAvatar(name = "john"){

    const response = await fetch(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`)
        
    if(!response.ok){
        throw new Error("Error network response");
    }
    const svgData = await response.text();
    return svgData; 


}



async function fetchUserAvatars(username){
    const userAvatarPromises = username.map(async (name) => {
        try {
            const svgData = await userAvatar(name);
            return {user: name, value: svgData};
        }catch (error){
            console.log(`Error fetching avatar for ${name}: `, error);
            return {user: name, value: null};
        }
    });

    return Promise.all(userAvatarPromises);
}

fetchUserAvatars("jhon")
    .then((userAvatarData) => {

    })

//     return fetch(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`)
//                 .then(res => {
//                     if(!res.ok){
//                         throw new Error("Error network res");
//                     }else {
//                         const svgData = await res.text();
//                         return res.text();
//                     }
//                 })
//                 .then(svgData => {
//                     return svgData;
//                 })
//                 .catch(error => {
//                     console.log("Error fetching Api: ", error)
//                 })
// }
// const usersAvatar = await userAvatar().then(svgData => {
//     for (const users in svgData){
//         for(let i = 0; i < svgData.length; i++){
//             const value = svgData[users];
//             console.log(value.length)
//             console.log(svgData.length)
//         }
//         if(svgData.hasOwnProperty(users)){
//             const value = svgData[users];
//             const user = users;
//             console.log(`${user}: ${svgData}`)
//             return console.log({
//                 users, 
//                 value
//             });
//         }
//     }
// });


function searchForUser(e){
    e.preventDefault();
    const userInput = userInputSearch.value;
    console.log(userInput)
    //Get users from the user.json file
    if(e.key !== "Backspace"){
        getUsers()
            .then(users => {
                
                const filteredUsers = users
                                        .filter(user => user.first_name.toUpperCase().startsWith(userInput.toUpperCase()))
                                        .sort((a, b) => a.first_name - b.first_name)
                
                console.log(filteredUsers)
                if (filteredUsers.length !== 0){
                    console.log(filteredUsers)
                    displayUsers(filteredUsers)
                    
                }else {
                    noUser()
                    console.log("nobody is here")
                }
            })
            .catch(error => {
                console.log("Error handling api: ", error)
            })
    }
    
}
function noUser(){
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = "No User Found :("
    div.classList.add('noUserFound')

    gridContainer.append(div)
}

function displayUsers(filteredUsers){
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.innerHTML = '';

        

    for (let i = 0; i < filteredUsers.length; i++){
        const gridItem = document.createElement('div');

        gridItem.innerHTML = `
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span class="sr-only">Open dropdown</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
                <!-- Dropdown menu -->
                <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-col items-center pb-10">
                <div id="profile-pic" class="w-24 h-24 mb-3 rounded-full shadow-lg"></div>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${filteredUsers[i].first_name} ${filteredUsers[i].last_name}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">${filteredUsers[i].job}</span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                </div>
            </div>
        </div>
            
            `;
      gridContainer.appendChild(gridItem);

      const dropDownBtn = document.getElementById('dropdown')

      dropDownBtn.addEventListener('click', () => {
        console.log("drop Down")
      })
    }
}






const navMenu = document.querySelector('.nav-menu')
const userInputSearch = document.getElementById("user-search");
userInputSearch.addEventListener('input', searchForUser);
