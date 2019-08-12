Vue.component('products', {
    data(){
      return {
          catalogUrl: `/server/db/products.json`,
          products: [],
          filtered: [],
      }
    },
    props: ["amount"],
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
        v-for="product of filtered.slice(0, amount)" 
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
            <span class="product__price">&#36;{{product.price}}</span>
                <button class="buy-btn product__add" @click ="$root.$refs.cart.addProduct(product)"><img src="img/cart-white.svg" alt="cart add">add to cart</button>
            </div>
        </div>`
})
