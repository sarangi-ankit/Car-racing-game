let score=document.querySelector(".score");
let popup=document.querySelector(".popup");
let gamearea=document.querySelector(".road")

popup.addEventListener("click",start);

let player={speed:10,score:0};
let keys={ArrowUp: false,ArrowDown: false,ArrowLeft: false,ArrowRight: false}

document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);

function keydown(e){
    e.preventDefault()
    keys[e.key]=true;
    // console.log(e.key)
    // console.log(keys)
}

function keyup(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key)
    
}
function endGame(){
    player.start=false;
    popup.classList.remove("hide");
    popup.innerHTML="Game over <br>your final score is " + player.score + "<br> press here to start the game..."
    player.speed=10
    plaayer.score=0

}

function collide(a,b){
    aRect=a.getBoundingClientRect()
    bRect=b.getBoundingClientRect()

    return !(aRect.bottom<bRect.top||aRect.top>bRect.bottom||aRect.right<bRect.left||aRect.left>bRect.right)

}
function movelines(){
    let lines=document.querySelectorAll(".roadline");

    lines.forEach(function(item){
        if (item.y>=600){
            item.y=-150
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"
    })
}
function moveEnemy(car){
    let enemy=document.querySelectorAll(".enemy");

    enemy.forEach(function(item){
        if (collide(car,item)){
            console.log("boom");
            endGame()
        }
        if (item.y>=700){
            item.y=-250
            item.style.left=Math.floor(Math.random()*350)+"px";
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"
    })
}

function gameplay(){
    // console.log("i am clicked")
    let car=document.querySelector(".car")
    let roadData=gamearea.getBoundingClientRect();
    // console.log(roadData);
    if (player.start){
        movelines()
        moveEnemy(car)
        if (keys.ArrowUp && player.y>(roadData.top+40)){player.y-=player.speed}
        if (keys.ArrowDown && player.y<(roadData.bottom-90)){player.y+=player.speed}
        if (keys.ArrowRight && player.x<(roadData.width-50)){player.x+=player.speed}
        if (keys.ArrowLeft && player.x>0){player.x-=player.speed}

        car.style.top=player.y+"px";
        car.style.left=player.x+"px"

        window.requestAnimationFrame(gameplay);
        console.log(player.score++);
        player.score++
        if (player.score<1000){
            player.speed=10;
            
        }
        else if (player.score<2000){
            player.speed=15;
            
        }
        else if (player.score<4000){
            player.speed=20;
            
        }
        else{
            player.speed=30;
        }

        let ps=player.score-2
        score.innerHTML="Score:" + ps;
    }
    
}

function start(){
    gamearea.classList.remove("hide");
    popup.classList.add("hide");
    gamearea.innerHTML=""

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gameplay);

    for (let x=0;x<5;x++){
        let lines=document.createElement("div")
        lines.setAttribute("class","roadline")
        lines.y=(x*150)
        lines.style.top=lines.y+"px"
        gamearea.appendChild(lines);
    }

    let car=document.createElement("div");
    car.setAttribute("class","car");
    gamearea.appendChild(car)
    
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for (let x=0;x<3;x++){
        let enemyCar=document.createElement("div")
        enemyCar.setAttribute("class","enemy")
        enemyCar.y=((x+1)*350)*-1
        enemyCar.style.top=enemyCar.y+"px"
        enemyCar.style.width="40px";
        enemyCar.style.height="90px";
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gamearea.appendChild(enemyCar);
    }
    
    
}
