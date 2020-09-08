<template>
  <form
    ref="form"
    :model="form"
    inline
    label-width="auto"
    label-position="left"
    @submit.prevent="helloName(form.name)"
  >
    <h2>2. Hello, {name}</h2>
    <label class="block">
      <span class="text-gray-700">Name</span>
      <input
        v-model="form.name"
        class="block w-full mt-1 text-gray-800 form-input"
        placeholder="Jane Doe"
      />
    </label>
    <button
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      @click="helloName(form.name)"
    >
      Button
    </button>
    <p>Response: Hello {{ response }}</p>
    <p v-if="error" style="color: red">
      <strong>Error {{ error.status }}</strong>
      <br />
      {{ error.data }}
    </p>
  </form>
</template>

<script>
  export default {
    name: 'NetlifyFunctionExample',
    data() {
      return {
        form: {
          name: '',
        },
        response: '—',
        error: null,
      };
    },
    methods: {
      async helloName(name) {
        try {
          const res = await this.$axios.$get(
            `/.netlify/functions/hello?name=${name}`,
          );
          this.response = res.data.name;
          this.error = null;
        } catch (e) {
          this.error = e.response;
          this.response = '—';
        }
      },
    },
  };
</script>
