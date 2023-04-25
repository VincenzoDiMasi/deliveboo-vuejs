<script>
export default {
  name: "AppMain",
};
</script>

<template>
  <main>
    <div>
      <Router-view></Router-view>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

main {
  min-height: 500px;
}
</style>
