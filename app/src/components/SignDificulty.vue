<script setup>
import{ref} from 'vue'

const difficulty =ref('incepator')

const levels = ['incepator', 'mediu', 'avansat']
</script>

<template>
<div>
<h3>Selector Dificulate</h3>
<select v-model="difficulty">
    <option v-for="level in levels":key=level :value="level">
        {{ level }}
    </option>
<p>Dificultatea semnului : <strong>{{ difficulty }}</strong></p>
</select>
</div>
</template>