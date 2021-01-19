//Global variables

var dog,dogImg,happyDog,database,foodStock;

function preload()
{
  //loaded images
  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  database =firebase.database();
  createCanvas(500, 500);
  
  //creating sprite for dog
  dog=createSprite(250,250,150,150);
  dog.addImage(dogImg);
  dog.scale=0.1;
  
  //reading food stock from database
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyDog);
  }
  drawSprites();
  fill("white")
  text("Remaining food: "+foodStock,200,200);
  textSize(13)
  text("Note:Up arrow key to give Drago milk",200,100);
}
function readStock(data){
  foodStock=data.val();  
}

function writeStock(x){
  if(x<=0){
    x=0;
  }  
  else{
    x=x-1
  }
 database.ref('/').update({
  Food:x
  })
}




