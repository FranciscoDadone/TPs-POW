function comprobar(){
    var x= document.getElementById("CUIL");
    var y= document.getElementById("msg");
    var cuil=x.value.replaceAll("-","")

    if (cuil.length!=11){
        y.textContent="Un cuil debe tener 11 digitos";
        y.style="color: red";
    }
    else{
        if(valido(cuil)){  
            y.textContent="El cuil es valido";
            y.style="color: green";
        }
        else{
            y.textContent="El cuil no es valido";
            y.style="color: red";
        }
    }
}

function valido(cuil){
    var ret=false;
    var sum=0;
    var nros=[5,4,3,2,7,6];
    for(i=0;i<10;i++){
        sum=sum+(cuil[i]*nros[i%6]);
    }
    sum=11-sum%11;
    if(sum==cuil[10]){
        ret=true;
    }

    return ret;
}