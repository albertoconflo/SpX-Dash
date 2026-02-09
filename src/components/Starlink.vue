<script setup>
import { onMounted, ref } from 'vue';

const starlink_list = ref([]);
const average_height = ref(0);
const average_velocity = ref(0);

onMounted(() => {
    const starlink_request = new Request("http://localhost:5000/api/starlink");
    fetch(starlink_request).then(response => response.json()).then(data => {
        starlink_list.value = data;
        const sls_with_heights = data.filter(sl => sl.height_km !== null);
        const height_sum = sls_with_heights.reduce((total, sl) => total + sl.height_km, 0);
        average_height.value = height_sum / sls_with_heights.length;
        const sls_with_velocity = data.filter(sl => sl.velocity_kms !== null);
        const velocity_sum = sls_with_velocity.reduce((total, sl) => total + sl.velocity_kms, 0);
        average_velocity.value = velocity_sum / sls_with_velocity.length;
        console.log(data);
    });
});
</script>

<template>
    <h2>Starlinks</h2>
    <ul>
        <li>Average height: {{ average_height }} km</li>
        <li>Average velocity: {{ average_velocity }} km/s</li>
    </ul>
</template>
