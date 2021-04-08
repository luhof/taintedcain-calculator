<template>
  <div id="hello">
    <h1>Tainted Cain calculator!</h1>
    <div id="input-wrapper">
      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/Red_heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="heartNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Soul_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="soulheartNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Black_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="darkheartNumber" @change="computeItems()"/>
        </div>

      </div>

      <div class="input-group">
                <div class="input-pickup">
          <img class="pickup" src="icons/Eternal_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="eternalheartNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Gold_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="goldenheartNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Bone_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="skullheartNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Rotten_Heart.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="rottenheartNumber" @change="computeItems()"/>
        </div>
      </div>

      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/Penny.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="coinNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Nickel.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="pennyNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Dime.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="dimeNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Lucky_Penny.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="luckyCoinNumber" @change="computeItems()"/>
        </div>
      </div>

      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/Key.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="keyNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Golden_Key.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="goldkeyNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Charged_Key.gif"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="chargedKeyNumber" @change="computeItems()"/>
        </div>
      </div>
      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/Bomb.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="bombNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Golden_Bomb.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="goldbombNumber" @change="computeItems()"/>
        </div>
      </div>
      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/Micro_Battery.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="tinybatteryNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Battery.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="batteryNumber" @change="computeItems()"/>
        </div>
      </div>
      <div class="input-group">
        <div class="input-pickup">
          <img class="pickup" src="icons/TarotCard.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="cardNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Pill_Black_White.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="pillNumber" @change="computeItems()"/>
        </div>
        <div class="input-pickup">
          <img class="pickup" src="icons/Rune1.png"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="runeNumber" @change="computeItems()"/>
        </div>
      </div>
    </div>

    <div id="options">
      <input type="checkbox" v-model="hideDisabled"/> Hide not craftable items
    </div>
    
    <div id="items-wrapper">
      <div class="item" v-for="(item,itemId) in items" v-bind:key="item.id" v-bind:class="{ 'disabled': isDirty && !item.isCraftable, 'craftable': item.isCraftable, 'hidden': hideDisabled && !item.isCraftable}">
        <img v-bind:src="getIconFromId(itemId)" />
      </div>
    </div>
    
  </div>
</template>

<script>

export default {

  name: 'Calculator',
  props: {
    msg: String,
  },
  data() {
    return {
      items: require('../assets/items.json'),
      activeRecipes: require('../assets/recipes_active_full.json'),
      passiveRecipes: require('../assets/recipes_passive_full.json'),
      localRecipes: [],
      isDirty:false,
      hideDisabled: false,
      heartNumber:0, //1
      soulheartNumber:0, //2
      darkheartNumber:0, //3
      eternalheartNumber:0, //4
      goldenheartNumber:0, //5
      skullheartNumber:0, //6
      rottenheartNumber:0, //7
      coinNumber:0, //8
      pennyNumber:0, //9
      dimeNumber:0, //10
      luckyCoinNumber:0, //11
      keyNumber:0, //12
      goldkeyNumber:0, //13
      chargedKeyNumber:0, //14
      bombNumber:0, //15
      goldbombNumber:0, //16
      bigbombNumber:0, //17
      tinybatteryNumber:0, //18
      batteryNumber:0, //19
      cardNumber: 0,//21
      pillNumber:0, //22
      runeNumber:0 //23

    }
  },
  mounted() {
    for(var i in this.activeRecipes){
          this.localRecipes.push(this.activeRecipes[i]);
      }
      for(var i2 in this.passiveRecipes){
          this.localRecipes.push(this.passiveRecipes[i2]);
      }
  },
  computed: {
  },
  methods: {
    getIconFromId(id){
      let currentId = id.toString().padStart(3, '0');
      return './collectibles/collectibles_'+currentId+'.png/'
    },
    computeItems(){
      
      for(var j = 0; j<this.localRecipes.length; j++){
        let isCraftable = false;
        let recipe = this.localRecipes[j].recipes;
        for(var k = 0; k<recipe.length; k++){
          let currentRecipe = recipe[k];
          if(this.checkIfRecipeDoable(currentRecipe)){
            isCraftable = true;
          }
        }
        this.items[this.localRecipes[j].ID].isCraftable = isCraftable;
 
      }
      this.updateCraftableState();
      
    },
    checkIfRecipeDoable(recipe){
      if(
        this.countOccurences(recipe, 1) <= this.heartNumber &&
        this.countOccurences(recipe, 2) <= this.soulheartNumber &&
        this.countOccurences(recipe, 3) <= this.darkheartNumber &&
        this.countOccurences(recipe, 4) <= this.eternalheartNumber &&
        this.countOccurences(recipe, 5) <= this.goldenheartNumber &&
        this.countOccurences(recipe, 6) <= this.skullheartNumber &&
        this.countOccurences(recipe, 7) <= this.rottenheartNumber &&
        this.countOccurences(recipe, 8) <= this.coinNumber &&
        this.countOccurences(recipe, 9) <= this.pennyNumber &&
        this.countOccurences(recipe, 10) <= this.dimeNumber &&
        this.countOccurences(recipe, 11) <= this.luckyCoinNumber &&
        this.countOccurences(recipe, 12) <= this.keyNumber &&
        this.countOccurences(recipe, 13) <= this.goldkeyNumber &&
        this.countOccurences(recipe, 14) <= this.chargedKeyNumber &&
        this.countOccurences(recipe, 15) <= this.bombNumber &&
        this.countOccurences(recipe, 16) <= this.goldbombNumber &&
        this.countOccurences(recipe, 17) <= this.bigbombNumber &&
        this.countOccurences(recipe, 18) <= this.tinybatteryNumber &&
        this.countOccurences(recipe, 19) <= this.batteryNumber &&
        this.countOccurences(recipe, 21) <= this.cardNumber &&
        this.countOccurences(recipe, 22) <= this.pillNumber &&
        this.countOccurences(recipe, 23) <= this.runeNumber
      ){
        return true;
      }
      else return false;
    },

    countOccurences(array, number){
      let num = 0;
      for(var i = 0; i<array.length; i++){
        if(parseInt(array[i])==number) num++;
      }
      return num;
    },

    updateCraftableState(){
      console.log("update craftable state");
      console.log(this, parseInt(this.cardNumber));
      if(
      parseInt(this.heartNumber) == 0&&
      
      parseInt(this.soulheartNumber) == 0 &&
      parseInt(this.darkheartNumber) == 0 &&
      parseInt(this.eternalheartNumber) == 0 &&
      parseInt(this.goldenheartNumber) == 0 &&
      parseInt(this.skullheartNumber) == 0 &&
      parseInt(this.rottenheartNumber) == 0 &&
      parseInt(this.coinNumber) == 0 &&
      parseInt(this.pennyNumber) == 0 &&
      parseInt(this.dimeNumber) == 0 &&
      parseInt(this.luckyCoinNumber) == 0 &&
      parseInt(this.keyNumber) == 0 &&
      parseInt(this.goldkeyNumber) == 0 &&
      parseInt(this.chargedKeyNumber) == 0 &&
      //parseInt(this.bombNumber) == 0 &&
      parseInt(this.goldbombNumber) == 0 &&
      //parseInt(this.bigbombNumber) == 0 &&
      parseInt(this.tinybatteryNumber) == 0 &&
      parseInt(this.batteryNumber) == 0 &&
      parseInt(this.cardNumber) == 0 &&
      parseInt(this.pillNumber) == 0 &&
      parseInt(this.runeNumber) == 0
      ){
        console.log("le false");
        this.isDirty = false;
      }
      else{
        console.log("le true");
        this.isDirty = true;
      }
    }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello{
  max-width: 960px;
  margin : auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.input-group{
  display:inline-block;
}

.disabled{
  opacity:0.2;
  transform:scale(0.5);
}

.hidden{
  display:none;
}

.craftable{
  transform:scale(1.2);

}

.pickup{
  transform:scale(2);
  margin-right:20px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
.input-pickup{
  display:flex;
  align-items: center;
  justify-content: center;
  margin:10px;
}

.input-pickup-number{
  text-align:center;
  height:30px;
  width:100px;
  margin:0px 10px;
  font-family: 'upheaval';
  display:inline-block;
  font-size:24px;
  background-color:rgba(255, 255, 255, 0.2);
  border:none;
  padding : 10px;
  border-bottom : solid 1px #3a322b;
}

#input-wrapper{
 display:flex;
 align-items:center;
 justify-content: center;
 flex-wrap:wrap;
}

#input-wrapper span{
  font-family: 'silom';
  display:inline-block;
  font-size:24px;
  background-color : rgba(0,0,0,0.1);
  border-radius:5px;
  padding : 10px;
}

#options{
  display:flex;
}

#items-wrapper{
  display:flex;
  flex-wrap:wrap;
  margin-top : 20px;
  background-color:rgba(0,0,0,0.1);
  border-radius : 20px;
  transition : all 0.5s;
  min-height:10px;
}
.item{
  transition : all 0.3s ease-in-out;
}
</style>
