<template>
  <div class="select-component" @click.stop="handleSelectClick">
    <div class="title-wrapper">
      <span v-if="title" style="margin-right: 8px">{{ title }}:</span>
      <img v-if="selectedItem.icon" class="pickup" :src="`icons/${selectedItem.icon}`"/>
      <span v-if="selectedItem.text">{{ selectedItem.text }}</span>
    </div>
    <div class="drop-down" v-show="isOpen">
      <div
          v-for="(item, index) in items"
          class="option"
          :class="{selected: value === item[itemValue]}"
          :key="index"
          @click.stop="handleOptionClick(item)"
      >
        <img v-if="item.icon" class="pickup" :src="`icons/${item.icon}`"/>
        <span v-if="item.text">{{ item.text }}</span>
      </div>
    </div>
    <span style="margin-left: auto">▼</span>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      default: null
    },
    itemValue: {
      type: String,
      default: "value"
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    selectedItem() {
      return this.items.find(item => item[this.itemValue] === this.value)
    }
  },
  methods: {
    handleSelectClick(){
      this.isOpen = true;
      console.debug("handleSelectClick")
    },
    handleOptionClick(item) {
      console.debug("handleOptionClick")
      this.isOpen = false;
      this.$emit("input", item[this.itemValue]);
    }
  }
}
</script>

<style scoped>
.pickup {
  width: auto;
  height: 24px;
  image-rendering: pixelated;
}
.select-component {
  position: relative;
  display: flex;
  align-items: center;
  width: 220px;
  background-color: #E3D4C2;
  border: none;
  padding: 10px;
  border-bottom: solid 1px #3a322b;
}
.select-component .title-wrapper {
  display: flex;
  align-items: center;
}
.select-component .drop-down {
  position: absolute;
  top: 30px;
  display: flex;
  background-color: white;
}

.select-component .drop-down .option {
  width: 32px;
  height: 32px;
  padding: 8px;
}

.select-component .drop-down .option:first-child {
  width: 60px;
}

.select-component .drop-down .option.selected {
  background-color: lightgreen;
}
</style>
