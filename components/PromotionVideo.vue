<template>
  <v-container class="mx-0 px-0 pt-8 pb-12">
    <v-row class="mx-0 px-0">
      <!-- class="mx-auto" -->
      <!-- px-sm-0 px-md-1 px-lg-2 -->
      <v-col cols="12" class="mx-0 px-0 px-md-2 px-lg-10 pb-10">
        <div class="wrapper">
          <div class="h_iframe">
            <!-- <img class="ratio" src="http://placehold.it/16x9" /> -->
            <img class="ratio" :src="require('~/assets/images/16x9.png')" />
            <!-- M7lc1UVf-VE v=0eNKVf3Qw6M 0eNKVf3Qw6M ulfxSOgea4M-->
            <iframe
              width="560"
              height="315"
              :src="`https://www.youtube.com/embed/${videoId}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: 'ulfxSOgea4M',
    },
  },
}
</script>

<style lang="scss" scoped>
// Youtube (2) 採用中
// https://stackoverflow.com/questions/11122249/scale-iframe-css-width-100-like-an-image?rq=1
// html,
// body {
//   height: 100%;
// }
.bg-video {
    background: linear-gradient(to top,  #f8f9fa 30%, #dddddd);
}
.wrapper {
  // width: 80%; -> original
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ccc;
  // background: #111;
}
.h_iframe {
  position: relative;
}
.h_iframe .ratio {
  display: block;
  width: 100%;
  height: auto;
}
.h_iframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
