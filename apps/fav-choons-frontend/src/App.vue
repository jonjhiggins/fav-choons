<template>
  <div
    id="app"
    class="bg-rose-500 p-6 content-center font-sans shadow-lg rounded max-w-xl mx-auto my-6"
  >
    <nav id="nav">
      <h1 class="text-4xl text-center font-bold mt-3 mb-6">
        <router-link to="/">fav choons</router-link>
      </h1>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
