Vue.component('filters', {
  data(){
    return {
        userSearch: ''
    }
},
template: `<div><form action="#" method="post" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input type="text" class="frame" placeholder="Search for Item..." v-model="userSearch">
        <button class="buttonBrowse" type="submit">
            <img alt="search" src="img/searchIcon.png">
        </button>
    </form></div>`
});
