<template>
  <div ref="container" class="timeline-container"></div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import * as d3 from 'd3'

/**
 * Props
 * data format:
 * [
 *   { event: 'Event name', date: 'YYYY-MM-DD' }
 * ]
 */
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const container = ref(null)

onMounted(drawTimeline)

// Redraw when data changes
watch(
  () => props.data,
  () => drawTimeline(),
  { deep: true },
)

function drawTimeline() {
  if (!container.value || !props.data.length) return

  // Clear previous SVG
  d3.select(container.value).selectAll('*').remove()

  const parsedData = props.data
    .map((d) => ({
      ...d,
      date: new Date(d.date),
    }))
    .sort((a, b) => a.date - b.date)

  const margin = { top: 40, right: 40, bottom: 40, left: 40 }
  const width = container.value.clientWidth - margin.left - margin.right
  const height = 120

  const svg = d3
    .select(container.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(parsedData, (d) => d.date))
    .range([0, width])
    .nice()

  // Timeline line
  svg
    .append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', height / 2)
    .attr('y2', height / 2)
    .attr('stroke', '#999')
    .attr('stroke-width', 2)

  // Axis
  svg
    .append('g')
    .attr('transform', `translate(0, ${height / 2})`)
    .call(d3.axisBottom(xScale).ticks(5))

  const events = svg
    .selectAll('.event')
    .data(parsedData)
    .enter()
    .append('g')
    .attr('class', 'event')
    .attr('transform', (d) => `translate(${xScale(d.date)}, ${height / 2})`)

  events.append('circle').attr('r', 6).attr('fill', '#4f46e5')

  events
    .append('text')
    .text((d) => d.event)
    .attr('y', -12)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')

  events
    .append('text')
    .text((d) => d3.timeFormat('%Y-%m-%d')(d.date))
    .attr('y', 18)
    .attr('text-anchor', 'middle')
    .style('font-size', '10px')
    .style('fill', '#555')
}
</script>

<style scoped>
.timeline-container {
  width: 100%;
}
</style>
