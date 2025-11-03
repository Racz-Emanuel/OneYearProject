<script setup>

</script>


<template>
  <div>
    <select 
    
      @change="$emit('changeLanguage', $event.target.value)"
    >
      <option value="ro">Română</option>
      <option value="en">English</option>
      <option value="sign"> Limbaj Mimico-Gestual</option>
    </select>
  </div>
</template>

