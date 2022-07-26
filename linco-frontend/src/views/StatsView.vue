<template lang="html">
  <div class="stats">
    <div class="stats-header">
      <span>
        {{ $t('stats.stats_for') }}
        <a target="_blank" :href="shortenUrl">{{ shortenUrl }}</a>
      </span>
      <button @click.prevent="removeLink()">
        {{ $t('stats.delete_link') }}
      </button>
    </div>

    <div v-if="!statsLoading">
      <div v-if="stats.length">
        <div id="chart-container"></div>
      </div>
      <div v-else>{{ $t('stats.no_visits') }}</div>
    </div>
    <div v-else>{{ $t('stats.loading_stats') }}</div>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'
import Plotly from 'plotly.js-dist'
import spacetime from 'spacetime'

import router from '@/router'
import store from '@/store'

export default {
  setup() {
    const query = computed(() => router.currentRoute.value.query?.hash)
    const stats = computed(() => store.getters.stats)
    const statsLoading = computed(() => store.getters.statsLoading)

    const getStats = async (hash: string) => {
      const linkExists = await store.dispatch('get_stats', hash)

      if (!linkExists) {
        router.push('/')
      }
    }

    const shortenUrl = computed(() => {
      return new URL(
        query.value as string,
        process.env.VUE_APP_PUB_DOMAIN_EXAMPLE
      ).toString()
    })

    const getMs = (_id: string) => {
      const [yyyy, mm, dd, HH, MM] = _id.split('-')

      return spacetime(`${yyyy}/${mm}/${dd}`, 'europe/podgorica')
        .hour(parseInt(HH))
        .minute(parseInt(MM)).epoch
    }

    const removeLink = () => {
      store.dispatch('remove_link', query.value)
      router.push('/')
    }

    const initChart = () => {
      if (stats.value.length) {
        setTimeout(() => {
          Plotly.newPlot(
            document.getElementById('chart-container'),
            [
              {
                x: stats.value.map(({ _id }: { _id: string }) =>
                  spacetime(getMs(_id)).format(
                    '{date-ordinal} {month-short}, {hour}:{minute}'
                  )
                ),
                y: stats.value.map(({ count }: { count: string }) => count),
                type: 'bar'
              }
            ],
            {
              margin: { t: 0 },
              yaxis: {
                tickvals: stats.value.map(
                  ({ count }: { count: string }) => count
                ),
                ticktext: stats.value.map(
                  ({ count }: { count: string }) => count
                )
              }
            },
            { showSendToCloud: true }
          )
        }, 500)
      }
    }

    onBeforeMount(() => {
      getStats(query.value as string)
    })

    onMounted(() => {
      initChart()
    })

    watch(() => stats.value.length, initChart)

    return {
      query,
      stats,
      shortenUrl,
      statsLoading,
      removeLink
    }
  }
}
</script>

<style lang="scss" scoped>
.stats {
  margin: 0 auto;
  width: 50rem;

  .stats-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    padding: 1rem;

    a {
      font-weight: bold;
    }
  }

  .chart-container {
    height: 30rem;
  }
}
</style>
