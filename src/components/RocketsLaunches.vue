<script setup>
import { getFieldAverage, SPXAPI_URL } from '@/shared'
import { onMounted, ref } from 'vue'
// import RocketsTimeline from './RocketsTimeline.vue'
import Timeline from './Timeline.vue'

const rockets_list = ref([])
const launches_list = ref([])
const rocketsLaunchDates = ref([])
const rocketsAverageMass = ref(0)
const rocketsAverageCostPerLaunch = ref(0)

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
    const rocketsMassData = rocketsData.map((rd) => rd.mass || { kg: null })
    rocketsAverageMass.value = getFieldAverage(rocketsMassData, 'kg')
    rocketsAverageCostPerLaunch.value = getFieldAverage(rocketsData, 'cost_per_launch')
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
    <h4>Some rockets statistics</h4>
    <ul>
      <li>Average mass: {{ rocketsAverageMass }} kg</li>
      <li>Average cost per launch: ${{ rocketsAverageCostPerLaunch }} USD</li>
    </ul>
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
