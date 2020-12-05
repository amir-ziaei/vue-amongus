<template>
  <div class="contact">
    <vue-headful
            title="Among Us – Contact"/>
    <h2>Contact</h2>
    <div class="container">
      <TheContactForm />
    </div>
  </div>
</template>

<script>
import TheContactForm from "@/components/TheContactForm.vue"

export default {
  components: {
    TheContactForm
  }
}
</script>