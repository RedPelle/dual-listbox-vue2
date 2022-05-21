<template>
<div class="dual-listbox-container">
  <div class="col-md-6 dual-listbox-available-items">
    <GroupListBox 
      :value="value.availableItems"
      :iconsTheme="iconsTheme" 
      :categoryField="categoryField"
      :displayField="displayField"
      :labelSelect="labelAdd"
      :labelSearch="labelSearchAvailable"
      :labelNoResult="labelNoResult"
      @select="addItems"
    />
  </div>
  <div class="col-md-6 dual-listbox-selected-items">
    <GroupListBox
      :value="value.selectedItems" 
      :iconsTheme="iconsTheme"
      :categoryField="categoryField" 
      :displayField="displayField"
      :labelSelect="labelRemove" 
      :labelSearch="labelSearchSelected"
      :labelNoResult="labelNoResult"
      @select="removeItems"
    />  
  </div>
</div>
</template>

<script>
import GroupListBox from './GroupListBox.vue'

export default {
  components: {
    GroupListBox
  },
  props: {
    removeItemsOnSelect: Boolean,
    value: {
      type: Object, // { availableItems: [], selectedItems: [] },
      required: true,
      default() {
        return { availableItems: [], selectedItems: [] };
      }
    },
    categoryField: String,
    displayField: String,
    keyField: String,
    labelAdd: {
      type: String,
      default() {
        return "Add ›";
      }
    },
    labelRemove: {
      type: String,
      default() {
        return "‹ Remove";
      }
    },    
    labelSearchAvailable: {
      type: String,
      default() {
        return "Search...";
      },
    },
    labelSearchSelected: {
      type: String,
      default() {
        return "Search...";
      },
    },
    labelNoResult: {
      type: String,
      default() {
        return "No result found";
      },
    },
    iconsTheme: {
      type: String,
      default() {
        return "chevron";
      }
    },
  },
  data() {
    return {
    }
  },  
  methods: {    
    addItems: function(selectedItems) {

      this.$emit('add', selectedItems);

      let tmpValue = [].concat(this.value.availableItems);

      if (this.removeItemsOnSelect) {
        for (let item of selectedItems) {
            const index = tmpValue.findIndex(o => o[this.keyField] === item[this.keyField]);
            tmpValue.splice(index, 1);
        }
        this.$emit('input', { availableItems: tmpValue, selectedItems: this.value.selectedItems.concat(selectedItems) });
      }

    },
    removeItems: function(selectedItems) {

      this.$emit('remove', selectedItems);

      let tmpValue = [].concat(this.value.selectedItems);

      if (this.removeItemsOnSelect) {
        for (let item of selectedItems) {
            const index = tmpValue.findIndex(o => o[this.keyField] === item[this.keyField]);
            tmpValue.splice(index, 1);
        }
        this.$emit('input', { availableItems: this.value.availableItems.concat(selectedItems), selectedItems: tmpValue });
      }
    }
  },
  emits: ['add', 'remove']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped> -->
<style>
  .dual-listbox-selected-items .group-listbox-group-header-icon,
  .dual-listbox-selected-items .group-listbox-group-item-icon {
      background-color: #d95757;
  }
</style>
