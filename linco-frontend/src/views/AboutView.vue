<template>
  <div class="about">
    <h1>{{ $t('about.description') }}</h1>

    <p>
      <b>Lin.co</b>
    </p>
    <code v-html="$t('about.footer')"></code>
  </div>
</template>

<script lang="ts">
export default {}
</script>
