const btn_op_nav = document.querySelector('#op_navbar');
const btn_cls_nav = document.querySelector('#cls_navbar');
const navbar = document.querySelector('.navbar');
const content = document.querySelector('.content');
btn_cls_nav.onclick = function () {
    btn_op_nav.style.scale = "1";
    navbar.style.color = "#333333";
    navbar.style.width = "0";
    navbar.style.padding = "0";
}

btn_op_nav.onclick = function () {
    btn_op_nav.style.scale = "0";
    navbar.style.color = "#F1F1F1";
    navbar.style.width = "8vw";
    navbar.style.padding = "1vw";
}
document.getElementById("op_login").onclick = function () {
    location.href = "login.html";
};
/* TODO: ampliar datos del item cliqueado */
document.querySelectorAll(".item").forEach(item => {
    item.onclick = function (){
        alert(item.id + " : " + item.textContent);
    }
}); 