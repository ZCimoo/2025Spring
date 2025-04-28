<script setup lang="ts">
import { getOne, type Product } from '@/models/products'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

dayjs.extend(relativeTime)

const route = useRoute('/products/[id]')
const product = ref<Product>()
getOne(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id).then((response) => {
  product.value = response
})

const avg_rating = computed(() => {
  ;(product.value?.reviews?.reduce((acc, review) => acc + (review?.rating ?? 0), 0) ?? 0) /
    (product.value?.reviews?.length ?? 1)
})
</script>

<template>
  <div>
    <div class="product section" v-if="product">
      <div class="product-images">
        <img v-for="i in product.images" :src="i" alt="product image" />
      </div>
      <div class="product-info">
        <b-rate v-model="avg_rating" disabled show-score size="is-large"></b-rate>
        <h1 class="title">
          {{ product.title }}
        </h1>
        <h2 class="subtitle">
          {{ product.category }} - {{ product.brand }} - {{ product.tags?.join(' / ') }}
        </h2>
        <p>{{ product.description }}</p>
        <span class="price">${{ product.price }}</span>
        <button class="button is-success">Add to cart</button>

        <div>
          Reviews:
          <ul>
            <li class="card" v-for="review in product.reviews" :key="review.id">
              <div class="card-text">
                <img :src="review.reviewer?.image" alt="reviewer avatar" />
                <strong>{{ review.reviewer?.firstName }}{{ review.reviewer?.lastName }}</strong> -

                <b-rate v-model="review.rating" disabled :show-score="true"></b-rate>
                <p>{{ review.comment }}</p>
                <i>{{ dayjs(review.date).fromNow() }}</i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="section">
      <h1 class="title">Loading...</h1>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.card {
  display: flex;
  align-items: center;
  margin: 1em;
}
.card-text {
  display: flex;
  flex-direction: column;
  margin-left: 1em;
}
.product {
  display: flex;
}

.product-images {
  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: palevioletred;
  display: block;
  margin: 1em;
}

.rate {
  float: right;
}
</style>
