<script setup>
import { SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'

const rockets_list = ref([])

onMounted(() => {
  const apiUrl = `${SPXAPI_URL}/api/rockets`
  const dashboard_request = new Request(apiUrl)
  fetch(dashboard_request)
    .then((response) => response.json())
    .then((data) => {
      rockets_list.value = data
      console.log(data)
    })
})
</script>

<template>
  <h2>Rockets</h2>
  <ul>
    <li v-for="{ name, description } in rockets_list">
      <u>{{ name }}</u
      >: {{ description }}
    </li>
  </ul>
</template>
