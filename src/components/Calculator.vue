<template>
  <div>
    <h1>Tainted Cain calculator!</h1>
    <p style="margin:10px;">A companion webapp for <a href="https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/" target="_blank">The Binding Of Isaac: Repentance</a> "Tainted Cain" character.</p>
    <p style="margin:10px;">Enter pickups available in your current floor to know what items could be crafted!</p>
    <div id="input-wrapper">
      <div class="input-group" v-for="(group, index) of pickupDefinitions" :key="index">
        <div class="input-pickup" v-for="pickup of group" :key="pickup.index">
          <img class="pickup" :src="`icons/${pickup.icon}`"/>
          <input type="number" min="0" max="99" class="input-pickup-number" v-model="pickups[pickup.index]"/>
        </div>
      </div>
    </div>
    <div id="options">
      <label>
        <input type="checkbox" v-model="hideDisabled"/>
        Hide non-craftable items
      </label>
      <div class="row">
        <SelectComponent
            :items="orderByItems"
            title="Sort by"
            v-model="orderBy"
            item-value="index"
            style="margin-right: 8px"
        />
        <button @click="clear" class="">Clear</button>
      </div>
      <input placeholder="Search..." v-model="search"/>
    </div>
    <div id="items-wrapper">
      <div class="item" v-for="item in visibleItems" v-bind:key="item.id" v-bind:class="{ 'disabled': anyPickups && !item.isCraftable, 'craftable': item.isCraftable}">
        <div class="bg-collectible" :class="'bg-collectibles_'+item.id" @mouseenter="setHover(item.id, true)" @mouseleave="setHover(item.id, false)"></div>
        <div class="recipes-modal" v-if="itemHoverStates[item.id]" v-once>
          <div class="recipes-desc">
            <b>{{item.name}}</b><br/>
            <p style="font-size:0.6rem;padding:5px;">{{item.text}}</p>
          </div>
          <div class="recipes-block" v-for="(recipe, recipeId) in getRecipesFromId(item.id)" v-bind:key="recipeId" v-bind:class="{ 'recipeCraftable':recipe.isCraftable}">
              <div class="recipe-block" v-for="(singleRecipe, singleRecipeId) in recipe" v-bind:key="singleRecipeId">
                <div class="bg-pickup" :class="'bg-pickup-'+singleRecipe"></div>
              </div>
          </div>
          <div v-if="!getRecipesFromId(item.id)">
            No recipe... yet?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Calculator",
  props: {
    msg: String,
  },
  components: {
    SelectComponent: () => import("./SelectComponent.vue")
  },
  data() {
    return {
      items: require("../assets/items.json"),
      recipes: [
        ...require("../assets/recipes_active_full.json"),
        ...require("../assets/recipes_passive_full.json"),
      ],
      anyPickups: false,
      hideDisabled: false,
      pickups: new Array(25).fill(0),
      orderBy: null,
      itemHoverStates: {},
      search: "",
      pickupDefinitions: [[
        { icon: "Red_Heart.png", index: 0 },
        { icon: "Soul_Heart.png", index: 1 },
        { icon: "Black_Heart.png", index: 2 },
      ], [
        { icon: "Eternal_Heart.png", index: 3 },
        { icon: "Gold_Heart.png", index: 4 },
        { icon: "Bone_heart.png", index: 5 },
        { icon: "Rotten_Heart.png", index: 6 },
      ], [
        { icon: "Penny.png", index: 7 },
        { icon: "Nickel.png", index: 8 },
        { icon: "Dime.png", index: 9 },
        { icon: "Lucky_Penny.png", index: 10 },
      ], [
        { icon: "Key.png", index: 11 },
        { icon: "Golden_Key.png", index: 12 },
        { icon: "Charged_Key.gif", index: 13 },
      ], [
        { icon: "Bomb.png", index: 14 },
        { icon: "Golden_Bomb.png", index: 15 },
        { icon: "Giga_Bomb.png", index: 16 },
      ], [
        { icon: "Micro_Battery.png", index: 17 },
        { icon: "Battery.png", index: 18 },
        { icon: "Mega_Battery.png", index: 19 },
      ], [
        { icon: "TarotCard.png", index: 20 },
        { icon: "Pill_Black_White.png", index: 21 },
        { icon: "Rune1.png", index: 22 },
      ], [
        { icon: "Pickup_Dice_Shard_icon.png", index: 23 },
        { icon: "Pickup_Cracked_Key_icon.png", index: 24 },
      ],
      ],
    };
  },
  computed: {
    orderByItems() {
      return [
        {text: "Not selected", index: null},
        ...this.pickupDefinitionsFlat
      ]
    },
    pickupDefinitionsFlat() {
      const array = [];
      this.pickupDefinitions.forEach(chunk => array.push(...chunk));
      return array;
    },
    visibleItems(){
      const list = this.computedItems.filter(i => i.isVisible)
      if (this.orderBy !== null) {
        list.sort((first, second) => {
          let firstIncludes = this.checkIfItemIncludesPickup(first, this.orderBy);
          let secondIncludes = this.checkIfItemIncludesPickup(second, this.orderBy);
          console.debug("includes", firstIncludes, secondIncludes);
          if (firstIncludes && !secondIncludes) {
            return -1
          } else if (!firstIncludes && secondIncludes) {
            return 1
          } else {
            return 0;
          }
        })
      }
      return list;
    },
    computedItems() {
      return this.recipes.map(item => {
        let itemIsCraftable = false;

        item.recipes.forEach(recipe => {
          let recipeCraftable = this.checkIfRecipeDoable(recipe);
          if(recipeCraftable) itemIsCraftable = true;
          Object.assign(recipe, {isCraftable: recipeCraftable})
        })


        Object.assign(item, this.items[item.id])
        const isVisible = !(this.hideDisabled && !itemIsCraftable) &&
            (!this.search || item.name.toLowerCase().includes(this.search.toLowerCase()))

        Object.assign(item, {
          id: item.ID,
          isCraftable: itemIsCraftable,
          isVisible
        });

        return item;
      });
    }
  },
  methods: {
    clear() {
      this.orderBy = null
      for (let i = 0; i < this.pickups.length; i++) {
        Vue.set(this.pickups, i, 0);
      }
    },
    setHover(itemId, state) {
      if(state) {
        Vue.set(this.itemHoverStates, itemId, state);
      } else {
        Vue.delete(this.itemHoverStates, itemId);
      }
    },
    getIconFromPickupId(pickupId) {
      return `./bagicons/${pickupId}.png`;
    },
    getRecipesFromId(id) {
      let recipeItem = this.recipes.find(recipe => recipe["ID"] == id);
      if (recipeItem) return recipeItem.recipes;
      else return null;
    },
    checkIfRecipeDoable(recipe) {
      return this.pickups.every((count, index) => count >= this.countOccurences(recipe, index+1));
    },
    checkIfItemIncludesPickup(item, pickup = null) {
      if (pickup === null) return false;
      let isIncludes = false;
      item.recipes.filter(recipe => recipe.isCraftable).forEach(recipe => {
        if(isIncludes) return;
        console.debug("recipe includes", {
          recipe,
          pickup,
          pickupString: pickup.toString(),
          1: recipe.includes(pickup),
          2: recipe.includes(pickup.toString()),
          3: recipe.includes('8'),
          4: recipe.includes('10')
        })
        if(recipe.includes((pickup + 1).toString())) isIncludes = true;
      })

      return isIncludes;
    },
    countOccurences(array, value) {
      let num = 0;
      for (let element of array) {
        if (parseInt(element) == value) num++;
      }
      return num;
    },
  }
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.item.disabled .item-img {
  opacity: 0.2;
}

.pickup {
  transform: scale(2);
  margin-right: 20px;
  image-rendering: pixelated;
}

.input-pickup {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

button {
  height: 30px;
  background-color: #E3D4C2;
  border: none;
  border-bottom: solid 1px #3a322b;
  font-family: inherit;
}

input[type=text], input[type=number], input:not([type]) {
  height: 30px;
  background-color: #E3D4C2;
  border: none;
  padding: 10px;
  border-bottom: solid 1px #3a322b;
  font-size: 24px;
}

input.input-pickup-number {
  width: 100px;
  margin: 0px 10px;
  text-align: center;
  font-family: 'upheaval';
}


#input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 960px;
  margin: auto;
}

#options {
  display: flex;
  flex-flow: column nowrap;
  margin: 10px auto;
  max-width: 80%;
}

#options > * {
  margin: 5px;
}

input {
  font: inherit;
}

#items-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  background-color: #C6B5A1;
  border-radius: 20px;
  min-height: 10px;
  max-width: 80%;
  margin: auto;
}

.recipes-modal {
  position: absolute;
  padding: 10px;
  max-width: 190px;
  color: #d3bba7;
  background-color : #3a322b;
  text-shadow: none;
  z-index: 9999;
}

.recipes-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  border-bottom: solid 1px #444444;
}

.recipes-block:last-child {
  border-bottom: none;
}

.recipes-block.recipeCraftable {
  background-color: lightgreen;
}

.recipe-block {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
