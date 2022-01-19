var dog,sadDog,happyDog;
var feedpet,addfood,foodObj;
var addfood,feed;
var foods = 0;
var lastFed;

var database;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
 // foodObj = loadImage("Images/Milk.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database()
 // database.ref = 'val'
  //database.ref = database.on()
  
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addfood = createButton("ADD FOOD")
  addfood.position(300,100)
  addfood.mousePressed(addFoods);
  
  feed = createButton("FEED")
  feed.position(400,100);
  feed.mousePressed(feedDog)

  foodObj = new Food()

  foodStock = database.ref("foodStock")
  foodStock.on("value",readStock)

}

function draw() {
  background(46,139,87);

foodObj.display()

fedTime = database.ref('lastFed')
fedTime.on('value',function(data){
  lastFed = data.val()
})

textSize(25)
fill("white")
if(lastFed >= 12){
  text("Last Fed : "+lastFed%12+"PM",350,30)
}
else if(lastFed===0){

  text("Last Fed : 12 AM ",350,30)

}

else {
  text("Last Fed : "+lastFed+"AM",350,30)
}


  drawSprites();
}

//function to read food Stock

function readStock(data){

var foods = data.val()
foodObj.updateFoodStock(foods)

}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  var foodStockval = foodObj.getFoodStock()
  if(foodStockval <=0){
    foodObj.updateFoodStock(foodStockval *0)
  }
    else{
      foodObj.updateFoodStock(foodStockval-1)
    }
    database.ref("/").update({
      foodStock : foodObj.getFoodStock(),lastFed : hour()
    })
  }


//function to add food in stock

function addFoods(){
  foods++
  database.ref("/").update({
    foodStock : foods
  })
}

















































































