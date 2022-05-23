<template>
  <div class="group-listbox">
    <div class="group-listbox-search">
      <input type="text" :placeholder="labelSearch" v-model="searchPattern" />
    </div>
    <div class="group-listbox-items">
      <div class="group-listbox-group" v-for="(subitems, categoryTitle) in groupedItems" :key="categoryTitle">
        <div class="group-listbox-group-header">
          <div class="group-listbox-group-header-title" @click="toggleExpand(categoryTitle)">
            <span v-if="mapExpand[categoryTitle]">
              <img v-if="iconsTheme == 'chevron'" src="../assets/ic_fluent_chevron_up_regular_icon.png" />
              <img v-if="iconsTheme == 'plus'" src="../assets/minus_square_icon.png" />
            </span>
            <span v-if="!mapExpand[categoryTitle]">
              <img v-if="iconsTheme == 'chevron'" src="../assets/ic_fluent_chevron_down_regular_icon.png" />
              <img v-if="iconsTheme == 'plus'" src="../assets/ic_fluent_add_square_regular_icon.png" />
            </span>
            {{ categoryTitle }}
          </div>
          <div class="group-listbox-group-header-icon" @click="select(subitems)"> {{ labelSelect }} </div>
        </div>
        <template v-if="mapExpand[categoryTitle]">
          <div class="group-listbox-group-item" v-for="(item, index) in subitems" :key="index">
            {{ item[displayField] }}
            <div class="group-listbox-group-item-icon" @click="select([item])"> {{ labelSelect }} </div>
          </div>
        </template>
              
      </div>
      <div v-if="Object.keys(groupedItems).length === 0" class="group-listbox-noresult">
        {{ labelNoResult }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupListBox',
  props: {
    value: Array,
    categoryField: String,
    displayField: String,
    labelSelect: {
      type: String,
      default() {
        return "Select ›";
      }
    },
    labelSearch: {
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
      mapExpand: {},
      searchPattern: "",
    }
  },
  computed: {
      groupedItems: function() {
        return this.groupBy(
          this.categoryField,
          !this.searchPattern ? 
              this.value : 
              this.value.filter(o => o[this.displayField].toLowerCase().indexOf(this.searchPattern.toLowerCase()) >= 0)
        );
      }
  },
  methods: {
    groupBy: function(key, array) {
      return !array ? {} :
        array.reduce((objectsByKeyValue, obj) => {
          const value = obj[key];
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
          return objectsByKeyValue;
        }, {});
    },
    toggleExpand: function(key) {
      this.$set(this.mapExpand, key, !this.mapExpand[key]);
    },
    select: function(selectedItems) {
      this.$emit('select', selectedItems);      
    }
  },
  emits: ['select']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group-listbox-search input {
    border: 1px solid #dceaef;
    width: 100%;
    padding: 7px 10px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    outline: none;
    max-width: 100%;
  }
  .group-listbox-search input:hover, .group-listbox-search input:active, .group-listbox-search input:focus {
    width: 100%;
    border-bottom: 1px solid #8c82ad;
  }
  .group-listbox-group {
    border: 1px solid #dceaef;
  }
  .group-listbox-group-header {
    border: 1px solid #dceaef;
    padding: 3px 10px;
    background-color: #dceaef;
  }
  .group-listbox-group-header-title {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
  }
  .group-listbox-group-header-icon, .group-listbox-group-item-icon {
    float:right;    
    display: none;
    border-radius: 2px;
    background-color: #65a578;
    color: white;
    padding: 2px 10px;
    cursor: pointer;
    font-size: 0.8em;
  }
  .group-listbox-group-item {
    border-bottom: 1px solid #dceaef;
    padding: 1px 10px 1px 36px;
    color: #666;
  }
  .group-listbox-group-item:hover {
    background: #fafaff;
  } 
  .group-listbox-group-header:hover {
    background: #f1f1f7;
  } 
  .group-listbox-group-header:hover .group-listbox-group-header-icon,
  .group-listbox-group-item:hover .group-listbox-group-item-icon {
    display: inline-block;
  }
  .group-listbox-noresult {
    text-align: center;
    padding: 10px;
  }
</style>
