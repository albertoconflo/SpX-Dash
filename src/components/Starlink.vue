<script setup>
import { getFieldAverage, SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'

const starlink_list = ref([])
const average_height = ref(0)
const average_velocity = ref(0)

onMounted(() => {
  const apiUrl = `${SPXAPI_URL}/api/starlink`
  const starlink_request = new Request(apiUrl)
  fetch(starlink_request)
    .then((response) => response.json())
    .then((data) => {
      starlink_list.value = data
      average_height.value = getFieldAverage(data, 'height_km')
      average_velocity.value = getFieldAverage(data, 'velocity_kms')
      console.log(data)
    })
})
</script>

<template>
  <h2>Starlinks</h2>
  <ul>
    <li>Average height: {{ average_height }} km</li>
    <li>Average velocity: {{ average_velocity }} km/s</li>
  </ul>
</template>
