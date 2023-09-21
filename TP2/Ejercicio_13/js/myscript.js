function display(val){
    document.getElementById("display").innerHTML += val;
}

function blank(){
    document.getElementById("display").innerHTML ="";
}

function result(){
    let x = document.getElementById("display").innerHTML;
    let y = math.evaluate(x);
    document.getElementById("display").innerHTML = y;
}