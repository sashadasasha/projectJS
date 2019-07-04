Vue.component('search', {
  data(){
      return {
          userSearch: ''
      }
  },
  template: `<div>
  <input type="text" class="frame" placeholder="Search for Item...">
  <button class="buttonBrowse" type="submit"><img alt="search" src="img/searchIcon.png"></button>
            </div>`
});