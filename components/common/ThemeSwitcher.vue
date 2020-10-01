<template>
  <div class="absolute top-0 right-0 visible m-4">
    <label class="px-6">
      <input v-model="toggleTheme" type="checkbox" class="w-0 h-0 opacity-0" />
      <span
        class="shadow outline-none focus:shadow-outline slider round"
        title="Toggle Theme"
      />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'ThemeSwitcher',
    props: {
      theme: {
        type: String,
        required: true,
        default: 'light',
      },
    },
    data() {
      return {
        toggleTheme: false,
      };
    },
    watch: {
      toggleTheme(val, oldVal) {
        if (process.client) {
          if (val) {
            localStorage.setItem('theme', 'dark');
            this.$emit('set-theme', 'dark');
          } else {
            localStorage.setItem('theme', 'light');
            this.$emit('set-theme', 'light');
          }
        }
      },
    },
    created() {
      if (process.client) {
        if (
          localStorage.getItem('theme') &&
          localStorage.getItem('theme') === 'dark'
        ) {
          this.$emit('set-theme', 'dark');
          this.toggleTheme = true;
        }
      }
    },
  };
</script>

<style scoped>
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c0c0c0;
    -webkit-transition: 200ms;
    transition: 200ms;
  }

  .slider::before {
    position: absolute;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    -webkit-transition: 200ms;
    transition: 200ms;
    box-shadow: 0 15 rgba(32, 32, 32, 0.239);
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcy8+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIyNTYiIGZpbGw9IiNmZmQ4M2IiLz4KICA8ZyBmaWxsPSIjZjNjNDMyIj4KICAgIDxjaXJjbGUgY3g9IjE2Ni4zNTIiIGN5PSIxMTQuNTQ0IiByPSI0OCIvPgogICAgPGNpcmNsZSBjeD0iMzgwLjE0NCIgY3k9IjE0My45MDQiIHI9IjM1LjY0OCIvPgogICAgPGNpcmNsZSBjeD0iMjUwLjAzMiIgY3k9IjI1NiIgcj0iMzEuMzc2Ii8+CiAgICA8Y2lyY2xlIGN4PSIyODUuMzkyIiBjeT0iMzQ2Ljc4NCIgcj0iMTMuMTg0Ii8+CiAgICA8Y2lyY2xlIGN4PSIxMTguMzIiIGN5PSIyNDUuODQiIHI9IjEzLjE4NCIvPgogICAgPHBhdGggZD0iTTM5Mi4zODQgMzkuNjE2QzQxNy4zNDQgNzkuMTM2IDQzMiAxMjUuODA4IDQzMiAxNzZjMCAxNDEuMzc2LTExNC42MDggMjU2LTI1NiAyNTYtNTAuMTkyIDAtOTYuODY0LTE0LjY1Ni0xMzYuMzg0LTM5LjYxNkM4NC45NiA0NjQuMTc2IDE2NC44MTYgNTEyIDI1NiA1MTJjMTQxLjM5MiAwIDI1Ni0xMTQuNjI0IDI1Ni0yNTYgMC05MS4xODQtNDcuODI0LTE3MS4wNC0xMTkuNjE2LTIxNi4zODR6Ii8+CiAgPC9nPgogIDxjaXJjbGUgY3g9IjI2My43NDQiIGN5PSI0NjAuOTQ0IiByPSIxNy42NjQiIGZpbGw9IiNlOGFmMmEiLz4KICA8Y2lyY2xlIGN4PSIxNTcuNjQ4IiBjeT0iMzQ2Ljc4NCIgcj0iMjYuMTQ0IiBmaWxsPSIjZjNjNDMyIi8+CiAgPGNpcmNsZSBjeD0iNDIwLjMyIiBjeT0iMzMzLjYxNiIgcj0iMjYuMTQ0IiBmaWxsPSIjZThhZjJhIi8+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-position: center;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider::before {
    -webkit-transform: translateX(1.5rem);
    -ms-transform: translateX(1.5rem);
    transform: translateX(1.5rem);
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcy8+CiAgPHBhdGggZmlsbD0iI2ZmYTYwMCIgZD0iTTUwNy44MzQgMzAxLjYwOGwtNTQuNzY5LTQ4LjMxMiA1Mi44MzItNTAuMzk5YTcuNDYgNy40NiAwIDAwMi4wOTktNy4xODkgNy41MDUgNy41MDUgMCAwMC01LjIxMS01LjQwMWwtNzAuMzE2LTIwLjI5MiAyNS45ODgtNjguMDU2YTcuNDU0IDcuNDU0IDAgMDAtMS4yMDQtNy4zODkgNy41NSA3LjU1IDAgMDAtNy4wMzgtMi42NTdsLTcyLjI3NCAxMS42NTItNS44NzgtNzIuNTYxYTcuNDg1IDcuNDg1IDAgMDAtNC4yNzUtNi4xNjEgNy41NjkgNy41NjkgMCAwMC03LjUwNC42MDFsLTYwLjI2NiA0MS4zNDItMzYuNjA5LTYzLjA0NEE3LjUzNiA3LjUzNiAwIDAwMjU2Ljg4OSAwYTcuNTM0IDcuNTM0IDAgMDAtNi41MTkgMy43NDJMMjA4LjM0NyA3Ni4xMWwtNzIuNjktNDEuOTUzYTcuNTY2IDcuNTY2IDAgMDAtNy41MjgtLjAxOCA3LjQ3NyA3LjQ3NyAwIDAwLTMuNzggNi40NzNsLS4xNzYgNzIuNzk1LTcyLjk2NS02LjAxNGE3LjU1IDcuNTUgMCAwMC02LjgwNyAzLjE5NCA3LjQ0NCA3LjQ0NCAwIDAwLS42MjIgNy40NTlsMzEuMjQyIDY1LjgzNS02OC41MTMgMjUuNjgxYTcuNDk5IDcuNDk5IDAgMDAtNC43NzMgNS43ODkgNy40NTYgNy40NTYgMCAwMDIuNjU2IDcuMDAzbDU2LjYxOSA0Ni4xNTItNTAuODEzIDUyLjQxYTcuNDU3IDcuNDU3IDAgMDAtMS44MTYgNy4yNjQgNy41MDggNy41MDggMCAwMDUuNDE5IDUuMTk0bDcxLjA1NSAxNy41NTEtMjMuMjk1IDY5LjAxMWE3LjQ1MyA3LjQ1MyAwIDAwMS40OTQgNy4zMzYgNy41NTQgNy41NTQgMCAwMDcuMTM3IDIuMzgybDcxLjc2LTE0LjQ0MyA4LjcyMSA3Mi4yNzhhNy40ODggNy40ODggMCAwMDQuNTEzIDUuOTkgNy41NjUgNy41NjUgMCAwMDcuNDc1LS44OTFsNTguNTk2LTQzLjY0NyAzOS4wNTUgNTkuNTY2YTcuNTM4IDcuNTM4IDAgMDA2LjY2MiAzLjQ4NiA3LjUzMyA3LjUzMyAwIDAwNi4zNjgtMy45OTJsMzQuMTA3LTYyLjQwNSA2MS44MzkgMzguOTc0YTcuNTY2IDcuNTY2IDAgMDA3LjUyMi4zMSA3LjQ4MiA3LjQ4MiAwIDAwNC4wMy02LjMyMmwzLjAzMS03Mi43MzQgNzIuNjc0IDguODRhNy41NTUgNy41NTUgMCAwMDYuOTI4LTIuOTI3IDcuNDUgNy40NSAwIDAwLjkxNC03LjQzTDQzNS43NSAzMzcuMzFsNjkuNDY1LTIzLjAwM2E3LjUwMiA3LjUwMiAwIDAwNC45OTctNS41OTkgNy40NiA3LjQ2IDAgMDAtMi4zNzgtNy4xeiIvPgogIDxlbGxpcHNlIGN4PSIyNTQuMzUiIGN5PSIyNTQuNjkxIiBmaWxsPSIjZmZkYjJkIiByeD0iMTU1LjA2OSIgcnk9IjE1NC45NDkiLz4KICA8cGF0aCBmaWxsPSIjZmZjYTAwIiBkPSJNMjU0LjM1NCA5OS43NDNjLTMuODg0IDAtNy43MzIuMTQ3LTExLjU0My40MjggODAuMjUgNS45MDEgMTQzLjUyNSA3Mi44MjUgMTQzLjUyNSAxNTQuNTIxIDAgODEuNjk1LTYzLjI3NSAxNDguNjE5LTE0My41MjUgMTU0LjUyMSAzLjgxMS4yOCA3LjY2LjQyOCAxMS41NDMuNDI4IDg1LjY0MSAwIDE1NS4wNjgtNjkuMzczIDE1NS4wNjgtMTU0Ljk0OCAwLTg1LjU3Ny02OS40MjctMTU0Ljk1LTE1NS4wNjgtMTU0Ljk1eiIvPgo8L3N2Zz4K');
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 1rem;
  }

  .slider.round::before {
    border-radius: 50%;
  }
</style>
