function logIn(){
    let usrName = document.getElementById("NameUsr").value;
    if(usrName==""){
        alert("Введите Имя пользователя");
    }else{
        localStorage.setItem("User", usrName);
        window.location.replace("pages/mainMenu.html");
    }
    
}

let score = 0;
if (localStorage.getItem('current_score'))
{
    score = localStorage.getItem('current_score');
}

document.getElementById("NameUsr").innerHTML += localStorage.getItem("User");
document.getElementById("Score").innerHTML += score;

function gameStart(){
    window.location.replace("games.html");
}
function gameEnd(){
    sessionStorage.setItem('user_score', user_score);
    window.location.replace("mainMenu.html");
}
function usrEnd(){
    localStorage.clear();
    window.location.replace("../index.html");
}