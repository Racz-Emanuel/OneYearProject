<script setup>
import BootStrapIcons from './BootStrapIcons.vue';

defineProps({
  title: String,
  youtubeUrl: String
})

const emit = defineEmits(['play'])
</script>

<template>
  <div>
    <hr>{{ title }}</hr>
    <br>
    <a v-if="youtubeUrl" :href="youtubeUrl" target="_blank">
     <BootStrapIcons name="youtube"/>
        Vezi lectia pe youtube 
    </a>
  </div>
</template>