<script setup lang="ts">
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const user = useUser();
  const dropdown = ref(false);

  const logout = async () => {
    try {
      await $fetch('/api/logout', {
        method: 'POST',
      });
      navigateTo('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, show an error message to the user
    }
  };
</script>

<template>
  <section class="flex items-center justify-between invisible min-w-full p-4">
    <!-- Logo -->
    <nuxt-link to="/" class="visible cursor-pointer pl-4">
      <icon
        :name="isDark ? 'base:v-logo-dark' : 'base:v-logo-dark'"
        size="32"
        mode="svg"
        class="v-logo dark:text-white text-black"
        @click="toggleDark()"
      />
    </nuxt-link>
    <div class="flex items-center justify-center visible gap-4 px-4 py-2">
      <!-- Sign In Button (Only shown when user is not logged in) -->
      <a v-if="!user" href="/login/github" aria-label="Sign in" class="flex">
        <icon name="mi:log-in" size="16" />
      </a>
      <!-- User Menu (Only shown when user is logged in) -->
      <client-only>
        <template v-if="user">
          <div class="relative p-4 ml-3">
            <div>
              <button
                id="user-menu-button"
                type="button"
                class="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800 dark:focus:ring-gray-700"
                :aria-expanded="dropdown"
                aria-haspopup="true"
                @click="dropdown = !dropdown"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  :src="user.avatarUrl"
                  :alt="`${user.username} Profile picture`"
                  :title="user.username"
                />
              </button>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="dropdown"
                class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  id="user-menu-item-2"
                  href="#"
                  class="flex items-center gap-3 px-4 py-2 text-base hover:bg-gray-200 dark:hover:bg-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  @click="logout"
                >
                  <icon name="mi:log-out" size="24" />
                  Sign out
                </a>
              </div>
            </transition>
          </div>
        </template>
      </client-only>
      <!-- Theme switcher -->
      <client-only>
        <span class="relative z-0 inline-flex rounded-full cursor-pointer">
          <icon
            :name="isDark ? 'carbon:moon' : 'carbon:sun'"
            size="16"
            @click="toggleDark()"
          />
        </span>
      </client-only>
    </div>
  </section>
</template>
