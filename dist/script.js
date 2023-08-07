fetch("users.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log("Error fetching data: ", error)
    })

let htmlEl = document.getElementById("profile-pic");
let pro = document.getElementById("profile-pic2");
console.log(htmlEl)


fetch("https://api.dicebear.com/6.x/pixel-art/svg")
    .then(response => {
        if(!response.ok){
            throw new Error("Network issues")
        }
        return response.text();
    })
    .then(svg => {
        console.log(svg)
        htmlEl.innerHTML = svg;
    })
    .catch(error => {
        console.log("Error fetching data: ", error)
    })