Vue.component('cart', {
    data() {
        return {
            cartUrl: `/server/db/cart.json`,
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({
                    quantity: 1
                }, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },

        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {
                        quantity: -1,
                    })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    computed: {
        totalCart() {
            let total = 0;
            for (let item of this.cartItems) {
                total += item.quantity * item.price;
            }
            return total;
        },
        totalAmount() {
            let total = 0;
            for (let item of this.cartItems) {
                total += item.quantity;
            }

            return total;

        }
    },
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart" class="cart__btn-img"></button>
<div class="cart" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :img="item.img"
            :cart-item="item"
            @remove="remove"></cart-item>
            <div class="total-count"> <p class="cart__total-numbers">TOTAL</p> <p class=total-sum>$ {{totalCart}}</p></div>
            <div class="cart__buttons">
            <a href="checkout.html"><button class="cart__button">Checkout</button></a>
            <a href="cart.html"><button class="cart__button">Go to cart</button></a>
        </div>
        </div>   
        <div class="cart__product-counter">{{ totalAmount }}</div>
</div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                <div class="product-bio">
                    <img class="cart__img" :src="img" alt="Some image">
                    
                </div>
                <div class="right-block">
                <div class="product-desc">
                        <p class="cart__product-title">{{cartItem.product_name}}</p>
                        <i class="fas fa-star star-cart"></i>
                        <i class="fas fa-star star-cart"></i>
                        <i class="fas fa-star star-cart"></i>
                        <i class="fas fa-star star-cart"></i>
                        <i class="fas fa-star star-cart"></i>
                        <p class="product-quantity-single-price">{{cartItem.quantity}} x $ {{cartItem.price}}</p>
                    </div>
                    <button class="del-btn" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></button>
                </div>
            </div>`
})

Vue.component ('big-cart', {
    template: `<div><div class="big-cart-list">
        <big-cart-item 
            v-for="item of $root.$refs.cart.cartItems" 
            :key="item.id_product"
            :img="item.img"
            :quantity="item.quantity"
            :id="item.id_product"
            :big-cart-item="item"
            ></big-cart-item>
            </div>
            <div class="shopping-cart__btn-container">
                <button class="shopping-cart__btn" @click = "$root.$refs.cart.clearCart()">cLEAR SHOPPING CART</button>
                <a href="/product.html"><button class="shopping-cart__btn">cONTINUE sHOPPING</button></a>
             </div>
             <div class="form">
            <form action="#" class="form__box">
                <h3 class="form__box-heading">Shipping Adress</h3>
                <label for="country"></label>
                <select name="country" id="country" class="form__box-input">
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="India">India</option>
                </select>
                <label for="state"></label>
                <input type="text" id="state" placeholder="State" class="form__box-input">
                <label for="postcode"></label>
                <input type="text" id="postcode" placeholder="Postcode / Zip" class="form__box-input">
                <button class="form__box-btn">
                    get a quote
                </button>
            </form>
            <form action="#" class="form__box">
                <h3 class="form__box-heading">coupon discount</h3>
                <span class="form__box-span">Enter your coupon code if you have one</span>
                <label for="couponCode"></label>
                <input type="text" id="couponCode" placeholder="State" class="form__box-input">
                <button class="form__box-btn">
                    Apply coupon
                </button>
            </form>
            <form action="#" class="form__box">
                <div class="form-box__sum">
                    <h4 class="form__sub-total">Sub total <span class="form__sub-total-sum">$ {{$root.$refs.cart.totalCart}}</span></h4>
                    <h3 class="form__grand-total">GRAND TOTAL<span class="form__grand-total-sum">$ {{$root.$refs.cart.totalCart}}</span></h3>
                </div>
                <button class="form__checkout-btn">proceed to checkout</button>
            </form>
        </div>
    </div>`
})

Vue.component('big-cart-item', {
    props: ['bigCartItem', 'img'],
    template: `<div><div class = "one-cart-prod"><div class="big-cart-item shopping-cart__product-block shopping-cart__product-block_wide" >
                    <img class="cart__img shopping-cart__product-img" :src="img" alt="Some image">
                        <div class="shopping-cart__product-text">
                        <a href="single-page.html" class="shopping-cart__product-text-name">{{bigCartItem.product_name}}</a>
                        <p class="shopping-cart__product-text-info">Color:
                        <span class="shopping-cart__product-text-info-value">Red</span>
                        </p>
                        <p class="shopping-cart__product-text-info">Size:
                        <span class="shopping-cart__product-text-info-value">XXL</span>
                        </p>
                        </div>
                     </div>
                     <div class="shopping-cart__product-block">
                        <span class="shopping-cart__product-price">{{bigCartItem.price}}$</span>
                     </div>
                    <div class="shopping-cart__product-block">
                        <form action="">
                        <input type="number" min="1" v-model.number="bigCartItem.quantity" class="shopping-cart__product-quantity">
                         </form>
                     </div>
                    <div class="shopping-cart__product-block">
                        <span class="shopping-cart__product-delivery-cost">free</span>
                    </div>
                    <div class="shopping-cart__product-block">
                        <span class="shopping-cart__product-subtotal">{{bigCartItem.quantity*bigCartItem.price}}$</span>
                    </div>
                    <div class="shopping-cart__product-block">
                        <button class="shopping-cart__product-del-btn" @click="$root.$refs.cart.remove(bigCartItem)">
                         <i class="fas fa-times-circle shopping-cart__product-del-cross"></i>
                         </button>
                    </div>
                </div>
            </div>`
})

