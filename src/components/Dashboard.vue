<script setup>
import { SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'

const rockets = ref(0)
const launches = ref(0)
const starlink = ref(0)

onMounted(() => {
  const apiUrl = `${SPXAPI_URL}/api/dashboard`
  const dashboard_request = new Request(apiUrl)
  fetch(dashboard_request)
    .then((response) => response.json())
    .then((data) => {
      rockets.value = data.rockets
      launches.value = data.launches
      starlink.value = data.starlink
    })
})
</script>

<template>
  <ul>
    <!-- <li>
      <a href="#/rockets">No. of Rockets: {{ rockets }}</a>
    </li>
    <li>
      <a href="#/launches">No. of Launches: {{ launches }}</a>
    </li> -->
    <li>
      <a href="#/rocketslaunches">
        No. of Rockets: {{ rockets }} | No. of Launches: {{ launches }}
      </a>
    </li>
    <li>
      <a href="#/starlink">No. of Starlinks: {{ starlink }}</a>
    </li>
  </ul>
</template>
