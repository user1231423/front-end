new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        monsterAction: function (action) {
            if (action == 1) { /// Action 1 equals attack player
                var monster_dmg = this.calculateDamage(3, 10);
                this.playerHealth -= monster_dmg;
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Monster hits Player for ' + monster_dmg
                })
                if (this.checkWin(this.playerHealth)) {
                    return;
                }
            } else if (action == 2) {
                var damage = Math.floor(Math.random() * 20 + 10);
                this.playerHealth -= damage; // Reduce player HP
                this.turns.unshift({ //Register Turn
                    isPlayer: false,
                    text: 'Monster special attacks Player for ' + damage
                })
                if (this.checkWin(this.monsterHealth)) {
                    return;
                }
            } else if (action == 3) {
                if (this.monsterHealth == 100) {
                    this.monsterHealth == 100;
                } else {
                    var hp = Math.floor(Math.random() * 5 + 1);
                    this.monsterHealth += hp; // add HP
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Monster heals for ' + hp
                    })
                }
            }
        },
        calculateDamage: function (min, max) { /// Calculate dmg to give
            var dmg = 0;
            dmg = Math.floor(Math.random() * max + min);
            return dmg;
        },
        checkWin: function (health) { /// Check if game is won or not
            if (this.playerHealth <= 0) {
                alert('You Lost!');
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.gameIsRunning = false;
            }else if(this.monsterHealth <= 0){
                alert('You Won!');
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.gameIsRunning = false;
            }
        },
        attack: function () { /// Attack function
            /// Player giving dmg to monster
            var player_dmg = this.calculateDamage(3, 10)
            this.monsterHealth -= player_dmg;
            if (this.checkWin(this.monsterHealth)) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + player_dmg
            })
            ///////////////////////////////////////
            /// Call monster action
            var random_action = Math.floor(Math.random() * 3 + 1);
            this.monsterAction(random_action);
        },
        specialAttack: function () {
            var damage = Math.floor(Math.random() * 20 + 10);
            this.monsterHealth -= damage; // Reduce monster HP
            this.turns.unshift({ //Register Turn
                isPlayer: true,
                text: 'Player special attacks Monster for ' + damage
            })
            if (this.checkWin(this.monsterHealth)) {
                return;
            }
            ///////////////////////////////////////
            /// Call monster action
            var random_action = Math.floor(Math.random() * 3 + 1);
            this.monsterAction(random_action);
        },
        heal: function () {
            if (this.playerHealth == 100) {
                alert("Can't Heal, Health already 100");
            } else {
                var hp = Math.floor(Math.random() * 5 + 1);
                this.playerHealth += hp; // add HP
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for ' + hp
                })
            }
            ///////////////////////////////////////
            /// Call monster action
            var random_action = Math.floor(Math.random() * 3 + 1);
            this.monsterAction(random_action);
        },
        giveUp: function () {
            alert('You Gave UP!');
            this.turns.unshift({
                isPlayer: true,
                text: 'Player gives up ' + damage
            })
            this.gameIsRunning = false;
        }
    }
})