new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    computed: {
        
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){

            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();

        
        },
        specialAttack: function(){
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster HARD for ${damage}`
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();

        },
        heal: function(){
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player heals for 10`
            });
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(min, max){
            return damnage = Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(player){
            if(this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            }
            return false;
        },
        monsterAttack: function(){
            const damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`
            });
        }
    }
})