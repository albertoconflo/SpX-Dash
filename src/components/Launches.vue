<script setup>
import { SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'

const launches_list = ref([])

onMounted(() => {
  const apiUrl = `${SPXAPI_URL}/api/launches`
  const launches_request = new Request(apiUrl)
  fetch(launches_request)
    .then((response) => response.json())
    .then((data) => {
      launches_list.value = data
      console.log(data)
    })
})
</script>

<template>
  <h2>Launches</h2>
  <ul style="grid-column: 1 / -1">
    <li v-for="{ name, details } in launches_list">
      <u>{{ name }}</u
      >: {{ details }}
    </li>
  </ul>
</template>
