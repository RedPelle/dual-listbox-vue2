<template>

<html>
  <head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
  </head>
  <body>
    <div id="app">
      <div class="container">

        <div style="margin: 40px; text-align: center;">
          <button @click="loadData()">Click here to load sample data</button>
        </div>
        <div style="margin: 40px; text-align: center;">
          Available items: {{ dualListBoxData.availableItems.length }} - Selected items: {{ dualListBoxData.selectedItems.length }}
        </div>
        
        <DualListBox 
          v-model="dualListBoxData"
          :removeItemsOnSelect="true"
          categoryField="category" 
          displayField="name" 
          keyField="name" 
          labelSearchAvailable="Search available items..."
          labelSearchSelected="Search selected items..."
          labelAdd="Add ›"
          labelRemove="‹ Remove"
          labelNoResult="No result found."
          iconsTheme="chevron"
          @add="onItemsAdded"
          @remove="onItemsRemoved"
          />

      </div>      
    </div>
  </body>
</html>

</template>

<script>
import DualListBox from './components/DualListBox.vue'

export default {
  name: 'App',
  components: {
    DualListBox
  },
  data() {
    return {
      dualListBoxData: {
        availableItems: [],
        selectedItems: [],
      }
    }
  },
  methods: {
    loadData() {
      // simulate ajax call
      setTimeout(() => {
      
        this.dualListBoxData = {
          availableItems: [
            { "category": "Category 1", "name": "Item 1.1" },
            { "category": "Category 1", "name": "Item 1.2" },
            { "category": "Category 1", "name": "Item 1.3" },
            { "category": "Category 1", "name": "Item 1.4" },
            { "category": "Category 1", "name": "Item 1.5" },
            { "category": "Category 1", "name": "Item 1.6" },
            { "category": "Category 2", "name": "Item 2.1" },
            { "category": "Category 2", "name": "Item 2.2" },
            { "category": "Category 2", "name": "Item 2.3" },
            { "category": "Category 2", "name": "Item 2.4" },
            { "category": "Category 2", "name": "Item 2.5" },
            { "category": "Category 2", "name": "Item 2.6" },
            { "category": "Category 3", "name": "Item 3.1" },
            { "category": "Category 3", "name": "Item 3.2" },
            { "category": "Category 3", "name": "Item 3.3" },
            { "category": "Category 3", "name": "Item 3.4" },
            { "category": "Category 3", "name": "Item 3.5" },
            { "category": "Category 3", "name": "Item 3.6" },        
          ],
          selectedItems: [
          ],
        };

      }, 1000);    
    },
    onItemsAdded(selectedItems) {
      console.info("Adding:");
      for (let item of selectedItems) {            
        console.info(JSON.stringify(item));
      }
    },
    onItemsRemoved(selectedItems) {
      console.info("Removing:");
      for (let item of selectedItems) {            
        console.info(JSON.stringify(item));
      }
    }
  }
}
</script>

<style>
</style>
