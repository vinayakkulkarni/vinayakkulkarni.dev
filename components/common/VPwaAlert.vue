<template>
  <client-only>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="absolute bottom-4 right-4 max-w-xs flex flex-col gap-4 rounded-lg from-stone-800 to-stone-600 bg-gradient-to-tr p-4 font-medium text-gray-200 shadow-lg hover:shadow-md"
      role="alert"
    >
      <span v-if="$pwa.offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button
          class="relative inline-flex items-center rounded-l-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-gray-300/10 ring-inset focus:z-10 hover:bg-white/20"
          @click="$pwa?.updateServiceWorker(true)"
        >
          Reload
        </button>
        <button
          @click="$pwa?.cancelPrompt()"
          class="relative inline-flex items-center rounded-r-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-gray-300/10 ring-inset focus:z-10 -ml-px hover:bg-white/20"
        >
          Close
        </button>
      </span>
    </div>
    <div
      v-if="
        $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
      "
      class="absolute bottom-4 right-4 max-w-xs flex flex-col gap-4 rounded-lg from-stone-800 to-stone-600 bg-gradient-to-tr p-4 font-medium text-gray-200 shadow-lg hover:shadow-md"
      role="alert"
    >
      <span> Install PWA ? </span>
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button
          @click="$pwa?.install()"
          class="relative inline-flex items-center rounded-l-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-gray-300/10 ring-inset focus:z-10 hover:bg-white/20"
        >
          Install
        </button>
        <button
          @click="$pwa?.cancelInstall()"
          class="relative inline-flex items-center rounded-r-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-gray-300/10 ring-inset focus:z-10 -ml-px hover:bg-white/20"
        >
          Cancel
        </button>
      </span>
    </div>
  </client-only>
</template>
