<template>
<div class="dual-listbox-container">
  <p></p>
  <div class="col-md-6 dual-listbox-available-items">
    <GroupListBox 
      v-model="dualListBoxData.availableItems"
      :iconsTheme="iconsTheme" 
      :categoryField="categoryField"
      :displayField="displayField"
      :keyField="keyField"
      :removeItemsOnSelect="true"
      :labelSelect="labelAdd"
      :labelSearch="labelSearchAvailable"
      :labelNoResult="labelNoResult"
      @select="addItems"
    />
  </div>
  <div class="col-md-6 dual-listbox-selected-items">
    <GroupListBox
      v-model="dualListBoxData.selectedItems" 
      :iconsTheme="iconsTheme"
      :categoryField="categoryField" 
      :displayField="displayField" 
      :keyField="keyField" 
      :removeItemsOnSelect="true"
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
    value: Object, //{ availableItems, selectedItems},
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
      dualListBoxData: { availableItems: [], selectedItems: [] },
    }
  },
  computed: {
  },
  mounted() {
    this.dualListBoxData = JSON.parse(JSON.stringify(this.value));
  },
  methods: {
    addItems: function(selectedItems) {

      this.$emit('add', selectedItems);

      // console.info("Adding:");
      // for (let item of selectedItems) {        
      //   console.info(JSON.stringify(item));
      // }

      this.dualListBoxData.selectedItems.push(...selectedItems);
      this.$emit('input', this.dualListBoxData);
    },
    removeItems: function(selectedItems) {

      this.$emit('remove', selectedItems);

      // console.info("Removing:");
      // for (let item of selectedItems) {            
      //   console.info(JSON.stringify(item));
      // }

      this.dualListBoxData.availableItems.push(...selectedItems);
      this.$emit('input', this.dualListBoxData);
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
