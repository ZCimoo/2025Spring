<script setup lang="ts">

</script>

<template>
    <div>
        <div class="product">
            <div class="product-image">
                <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <p>{{ product.price }}</p>
                <button @click="addToCart(product)">Add to Cart</button>
            </div>
    </div>
</template>

<style scoped>
.product{
    display: flex
}
.product-image{
    display: flex;
    flex-basis: 50%;
    

}
</style>