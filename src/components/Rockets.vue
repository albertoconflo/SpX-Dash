<script setup>
import { onMounted, ref } from 'vue';

const rockets_list = ref([]);

onMounted(() => {
    const dashboard_request = new Request("http://localhost:5000/api/rockets");
    fetch(dashboard_request).then(response => response.json()).then(data => {
        rockets_list.value = data;
        console.log(data);
    });
});
</script>

<template>
    <h2>Rockets</h2>
    <ul>
        <li v-for="{name, description} in rockets_list"><u>{{ name }}</u>: {{ description }}</li>
    </ul>
</template>
