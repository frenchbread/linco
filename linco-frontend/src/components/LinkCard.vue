<template>
  <div class="link">
    <div class="shorten-link">
      <a target="_blank" :href="getShortenUrl(link.hash_ref)">{{
        getShortenUrl(link.hash_ref)
      }}</a>

      <span class="actions">
        <button @click.prevent="copyToClipboard(link.hash_ref)">copy</button>
        &nbsp;
        <button @click.prevent="showStats(link.hash_ref)">stats</button>
      </span>
    </div>
    <div class="original-link" :title="link.original_url">
      {{ link.original_url }}
    </div>
  </div>
</template>

<script lang="ts">
import clipboard from 'clipboardy'

import router from '@/router'

export default {
  props: ['link'],
  setup() {
    const getShortenUrl = (hash: string) => {
      return new URL(hash, process.env.VUE_APP_PUB_DOMAIN_EXAMPLE).toString()
    }

    const copyToClipboard = async (hash: string) => {
      await clipboard.write(getShortenUrl(hash))
    }

    const showStats = (hash: string) => {
      router.push(`/stats?hash=${hash}`)
    }

    return {
      getShortenUrl,
      copyToClipboard,
      showStats
    }
  }
}
</script>

<style lang="scss" scoped>
.original-link {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
