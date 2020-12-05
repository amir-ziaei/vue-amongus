<template>
  <span 
    :id="id"
    :class="classes"
    :style="style"
    @click="applyFilter">
      {{ name }}
    </span>
</template>

<script>
export default {
  name: "GalleryCat",
  props: {
    id: Number,
    name: String,
    color: String,
    enabled: Boolean
  },
  computed: {
      classes () {
        const disabled = !this.enabled ? 'disabled' : '';
        return 'cat ' + disabled;
      },
      style() {
        return 'background-color: ' + this.color;
      },
  },
  methods: {
    applyFilter() {
      this.$emit('apply-filter', this.id);
    }
  }
}
</script>

<style scoped>
.cat {
  color: #fff;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  margin: 0.125rem 0;
  font-size:0.8rem;
}
.disabled {
  background-color: gray !important;
}
</style>
