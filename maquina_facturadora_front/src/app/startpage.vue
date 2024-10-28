<script setup lang="ts">
import clock from '../components/clock.vue'
import NeomorphicSearch from '../components/NeomorphicSearchBar.vue'
</script>

<template>
    <div class="main">
    <clock cajota="1" />
    <NeomorphicSearch />
    </div>
</template>

<style>
.main{
    display: flex;
    flex-direction: row;
    margin: 3%;
    align-items: top;
}
</style>