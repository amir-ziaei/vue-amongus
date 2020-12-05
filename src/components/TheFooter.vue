<template>
   <footer id="footer">
      <small>&copy; Copyright 2020, Amirhossein Ziaei R.</small>
      <a href="" target="_blank">
        <font-awesome-icon icon="map"/>
        </a>
    </footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped>
#footer {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0;
  font-size: 0.9rem;
}

#footer > * {
  padding: 0 0.625rem;
  color: rgba(0, 0, 0, 0.7);
}

#footer i:hover {
  color: #8cfdff;
  cursor: pointer;
}
</style>
