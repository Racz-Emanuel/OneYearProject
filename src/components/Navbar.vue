<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  lang: {
    type: String,
    default: 'ro'
  }
})
</script>

<template>
  <nav class="flex gap-2">
    <RouterLink to="/">
      {{ lang === 'ro' ? 'Acasă' : 'Home' }}
    </RouterLink> |

    <RouterLink to="/lessons">
      {{ lang === 'ro' ? 'Lecții' : 'Lessons' }}
    </RouterLink> |

    <RouterLink to="/quiz">
      {{ lang === 'ro' ? 'Teste' : 'Quizzes' }}
    </RouterLink> |

    <RouterLink to="/contact">
      {{ lang === 'ro' ? 'Contact' : 'Contact' }}
    </RouterLink> |

    <RouterLink to="/despre">
      {{ lang === 'ro' ? 'Despre' : 'About' }}
    </RouterLink> |

    <RouterLink to="/daily-challenge">
      {{ lang === 'ro' ? 'Provocarea Zilei' : 'Daily Challenge' }}
    </RouterLink>
  </nav>
</template>