Vue.component('products', {
    data(){
      return {
          catalogUrl: `/catalogData.json`,
          products: [],
          filtered: [],
      }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.filtered.push(el);       
                }
            });
    },
    template: `<div class="product-box container">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :product="product">
        </product>
    </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `<div class="product" >
    <a href="single_page.html" class="product__link"> <img :src="product.img" :alt="product.product_name" class="product__img"></a>
            <div class="product__info">
            <a href="#"><p class="product__text">{{product.product_name}}</p></a>
            <span class="product__price">{{product.price}}</span>
                <button class="buy-btn product__add" @click="$root.$refs.cart.addProduct(product)"><img src="img/cart-white.svg" alt="cart add">add to cart</button>
            </div>
        </div>`
})

// /* <div class="product-box container">
// <div class="product">
//     <a href="single_page.html" class="product__link"><img class="product__img" src="img/shirt1.jpg" alt="product"></a>
//     <div class="product__info">
//         <a href="#"><p class="product__text">Mango  People  T-shirt</p></a>
//         <span class="product__price">$52.00</span>
//     </div>
//     <a href="#" class="product__add"><img src="img/cart-white.svg" alt="cart add">add to cart</a>
// </div> */

