<template>
  <div>
    <div>
      <div class="loading-spacer" />
      <client-only>
        <vue-loading
          type="spiningDubbles"
          color="#aaa"
          :size="{ width: '80px', height: '80px' }"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style>
.fullview {
  width: 100%;
  height: 100%;
  background: #fefefe;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-spacer {
  height: 30%;
}
</style>
