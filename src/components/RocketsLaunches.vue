<script setup>
import { SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'
// import RocketsTimeline from './RocketsTimeline.vue'
import Timeline from './Timeline.vue'

const rockets_list = ref([])
const launches_list = ref([])
const rocketsLaunchDates = ref([])

const getRocketLaunchDates = (rData) => {
  return rData.map((rd) => {
    const { name: event, first_flight: date } = rd
    return { event, date }
  })
}

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
    rocketsLaunchDates.value = getRocketLaunchDates(rocketsData)
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
    <!-- <RocketsTimeline :rocketsHistory="rocketsLaunchDates"></RocketsTimeline> -->
    <Timeline :data="rocketsLaunchDates"></Timeline>
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
