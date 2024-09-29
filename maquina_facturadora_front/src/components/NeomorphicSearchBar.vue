<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="relative w-full max-w-md">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search class="w-5 h-5 text-gray-400" />
      </div>
      <input
        v-model="searchQuery"
        type="search"
        class="w-full py-3 pl-12 pr-4 text-gray-700 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-300 transition-shadow duration-300 ease-in-out
               shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
               hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]
               focus:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.1),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]"
        placeholder="Search..."
        @input="handleSearch"
      />
    </div>
    <div v-if="searchQuery" class="absolute mt-2 text-gray-600">
      You searched for: {{ searchQuery }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const searchQuery = ref('')

const handleSearch = () => {
  // Here you can implement your search logic
  console.log('Searching for:', searchQuery.value)
}
</script>