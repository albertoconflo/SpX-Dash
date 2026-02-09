<script setup>
import { onMounted, ref } from 'vue';

const launches_list = ref([]);

onMounted(() => {
    const launches_request = new Request("http://localhost:5000/api/launches");
    fetch(launches_request).then(response => response.json()).then(data => {
        launches_list.value = data;
        console.log(data);
    });
});
</script>

<template>
    <h2>Launches</h2>
        <ul style="grid-column: 1 / -1;">
            <li v-for="{name, details} in launches_list"><u>{{ name }}</u>: {{ details }}</li>
        </ul>
</template>
