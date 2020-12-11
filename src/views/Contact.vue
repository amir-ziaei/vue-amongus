<template>
  <div class="contact">
    <vue-headful
            title="Among Us – Contact"/>
    <h2>Contact</h2>
    <h3>
      You may fill the form below or directly <a href="mailto:gg@localhost.gg">email</a> us.
    </h3>
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

<style scoped>
h3 {
  font-size: 0.875rem;
  font-weight: normal;
}
</style>