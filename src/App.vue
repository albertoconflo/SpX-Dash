<script setup>
import { computed, ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Rockets from './components/Rockets.vue'
import Launches from './components/Launches.vue'
import Starlink from './components/Starlink.vue'
import RocketsLaunches from './components/RocketsLaunches.vue'

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/rockets': Rockets,
  '/launches': Launches,
  '/rocketslaunches': RocketsLaunches,
  '/starlink': Starlink,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Dashboard
})
</script>

<template>
  <component :is="currentView" />
</template>
