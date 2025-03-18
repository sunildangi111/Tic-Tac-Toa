const cards = document.querySelectorAll('.card');
const button = document.querySelector('#reset');
const restart = document.querySelector('#restart');
let p = document.querySelectorAll('td');
let count = 0;

let winning = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
let turn = 1;

cards.forEach(card => {
    card.addEventListener('click', function press() {
        let text = card.querySelector('.text');
        if(turn == 1 && text.innerText == "" ){
            text.innerHTML = "O";
            turn = 2;
            check();

        }else if(turn == 2 && text.innerText == ""){
            text.innerHTML = "X";
            check();
            turn = 1;
        }
        // console.log(text.innerText);
        // console.log("c");
    });
});

function check(){
    for (const pattern of winning) {
        let val1 = cards[pattern[0]].innerText;
        let val2 = cards[pattern[1]].innerText;
        let val3 = cards[pattern[2]].innerText;

        if(val1 != "" || val2 != "" || val3 != ""){
            if(val1 == val2 && val2 == val3){
                let result = document.querySelector('.result');
                result.innerText = `WINNER IS ${val1}`;
                console.log("WINNER");
                score(val1);
                turn = 0;
            }
        }
  
    }
}


button.addEventListener('click',function(){
    turn = 1;
    let result = document.querySelector('.result');
    result.innerText = "";
    cards.forEach(card =>{
        card.querySelector('.text').innerText = "";
    })

    if(count == 5){
        let winner ;
        if(Number(p[3].innerText) > Number(p[1].innerText) ){
            winner = "PLAYER X IS WINNER";
        }else if(Number(p[3].innerText) < Number(p[1].innerText) ){
            winner = "PLAYER O IS WINNER";
        }else{
            winner = "MATCH IS DRAW";
        }
        showModal(`${winner}`);
        resetscore();

    }
})


function score(x){
    count++;
    if(x == "X"){
        p[3].innerText = Number(p[3].innerText)+1;
    }
    if(x == "O"){
        p[1].innerText = Number(p[1].innerText)+1;
    }
}

function resetscore(){
    p[3].innerText = 0;
    p[1].innerText = 0;
    count = 0;
}



restart.addEventListener('click',function(){
    turn = 1;
    closeModal();
    let result = document.querySelector('.result');
    result.innerText = "";
    cards.forEach(card =>{
        card.querySelector('.text').innerText = "";
    })

    
})


function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("modal").style.display = "flex";
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 2500);
}


function closeModal() {
    document.getElementById("modal").style.display = "none";
}

