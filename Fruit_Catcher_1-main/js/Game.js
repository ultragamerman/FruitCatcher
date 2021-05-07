class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            // Differentiate the main player by printing
            // the name of the player on the basket.
            if(index == player.index){ 
                textSize(25);
                text(allPlayers[plr].name,x-25,y-25);
            }textSize(32);
            text(player1.name,player1.position.x,player1.position.y);
            text(player2.name,player2.position.x,player2.position.y);
        }
        // Give movements for the players using arrow keys
        if(keyCode===37){
            player.changeposition(players[index].x-10);
        }
        if(keyCode===39){
            player.changeposition(players[index].x+10);
        }
        // Create and spawn fruits randomly
        if(World.frameCount%20){
            fruits = createSprite(random(1,displayWidth),1,10,10);
            imgChooser = random(1,5);
            imgString = "fruit"+imgChooser+"_img";
            fruits.addImage(imgString);
            fruitGroup.add(fruits);
        }  
        if(player.index!=null){
            for(var r = 0;r<fruitGroup.length;r++){
                if(fruitGroup.get(r).isTouching(players)){
                    fruitGroup.get(r).destroy();
                    player.score = player.score+1;
                    player.update();
                }
            }
        }    
    }
    end(){
       console.log("Game Ended");
    }
}