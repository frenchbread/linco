<template>
  <div class="home">
    <form @submit.prevent="submitForm" class="form">
      <input
        ref="inputField"
        type="text"
        v-model="input"
        placeholder="Paste your link here"
      />
      &nbsp;
      <button type="submit" name="button">ok</button>
    </form>

    <h1>recent urls</h1>

    <div v-if="!linksLoading" class="links">
      <div v-if="links.length">
        <LinkCard v-for="link in links" :key="link" :link="link"></LinkCard>
      </div>
      <div v-else>No links have been shortened yet.</div>
    </div>
    <div v-else>loading..</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import type { Ref } from 'vue'

import store from '@/store'

import LinkCard from '@/components/LinkCard.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const input = ref('')
    const inputField: Ref<HTMLInputElement | null> = ref(null)

    const links = computed(() => store.getters.links)
    const linksLoading = computed(() => store.getters.linksLoading)

    const submitForm = () => {
      if (input.value) {
        store.dispatch('add_link', input.value)

        input.value = ''
      } else if (inputField.value) {
        inputField.value.focus()
      }
    }

    onBeforeMount(() => {
      store.dispatch('init_links')
    })

    return {
      input,
      submitForm,
      linksLoading,
      links,
      inputField
    }
  },
  components: { LinkCard }
})
</script>

<style scopes lang="scss">
.home {
  width: 50rem;
  margin: 0 auto;

  .form {
    padding: 1rem;

    display: flex;

    input[type='text'] {
      width: 100%;
      padding: 1rem;
      border: 1px solid #ccc;
    }

    button {
      width: 5rem;
    }
  }

  .links {
    .link {
      text-align: left;
      padding: 1rem;
      border: 1px solid #ccc;

      border-radius: 3px;

      .shorten-link {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
          font-weight: bold;
          font-size: 1.3rem;
          color: #42b983;
        }
      }

      .original-link {
        margin-top: 0.5rem;
      }

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-enter-active {
  animation: fade-in 0.3s;
}
.fade-leave-active {
  animation: fade-in 0.3s reverse;
}
</style>
