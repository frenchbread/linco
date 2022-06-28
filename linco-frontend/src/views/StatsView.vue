<template lang="html">
  <div class="stats-header">
    <span>
      Stats for <a target="_blank" :href="shortenUrl">{{ shortenUrl }}</a>
    </span>
    <button @click.prevent="removeLink()">delete</button>
  </div>

  <div v-if="!statsLoading">
    <div v-if="stats.length">
      <div class="chart-container"></div>
    </div>
    <div v-else>no vists yet :(</div>
  </div>
  <div v-else>loading..</div>
</template>

<script lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'
import Chartist from 'chartist'
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
          new Chartist.Line(
            '.chart-container',
            {
              labels: stats.value.map(({ _id }: { _id: string }) =>
                spacetime(getMs(_id)).format('{date-ordinal}')
              ),
              series: [stats.value.map(({ count }: { count: string }) => count)]
            },
            {
              fullWidth: true,
              chartPadding: {
                right: 100,
                left: 100
              },
              axisY: {
                onlyInteger: true
              }
            }
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
  height: 20rem;
  margin: 0 auto;
}
</style>
