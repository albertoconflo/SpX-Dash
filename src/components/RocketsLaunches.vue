<script setup>
import { SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'

const rockets_list = ref([])
const launches_list = ref([])

onMounted(() => {
  const rocketsApiUrl = `${SPXAPI_URL}/api/rockets`
  const rocketsRequest = new Request(rocketsApiUrl)
  const rocketsPromise = fetch(rocketsRequest).then((r) => r.json())
  const launchesApiUrl = `${SPXAPI_URL}/api/launches`
  const launchesRequest = new Request(launchesApiUrl)
  const launchesPromise = fetch(launchesRequest).then((r) => r.json())
  Promise.all([rocketsPromise, launchesPromise]).then((responsesData) => {
    const [rocketsData, launchesData] = responsesData
    rockets_list.value = rocketsData
    launches_list.value = launchesData
    console.log(responsesData)
  })
})
</script>

<template>
  <div>
    <h2>Rockets</h2>
    <ul>
      <li v-for="{ name, description } in rockets_list">
        <u>{{ name }}</u
        >: {{ description }}
      </li>
    </ul>
  </div>
  <div>
    <h2>Launches</h2>
    <ul>
      <li v-for="{ name, details } in launches_list">
        <u>{{ name }}</u
        >: {{ details }}
      </li>
    </ul>
  </div>
</template>
