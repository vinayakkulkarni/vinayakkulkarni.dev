export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const response = await $fetch('/api/user');
  if (response) {
    user.value = response;
  }
});
