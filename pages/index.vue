<template>
  <!-- <v-container fluid ma-0 pa-0 fill-height> -->
  <!-- v-containerにここではfill-heightを付けるとv-imgが収まらなくなる -->
  <v-container fluid ma-0 pa-0 v-show="blackLoaded || topLoaded" class="main">
    <!-- {{ loadedSectionCount }} eager:{{ eager }} -->
    <!-- PC幅の場合にはリンク表示 -->
    <!-- d-none d-md-flex justify="center"-->
    <section
      v-show="blackLoaded || topLoaded"
      style="background-color: black !important"
      class="ma-0 px-2 pt-4 pb-2 d-none d-md-flex container--fluid"
    >
      <v-row justify="space-around" align-content="center">
        <!-- 以下 nuxt要素を取ってnuxt-linkそのものでもよい -->
        <!-- justify-space-between -->
        <v-btn
          v-for="el in anchors"
          :key="el.title"
          nuxt
          x-large
          :to="{
            path: el.url || '/',
            hash: el.anchorId ? '#' + el.anchorId : '',
          }"
          @click.native.stop="handleScroll(el.anchorId)"
          text
          class="grey--text px-2 mx-1"
        >
          {{ el.title }}
        </v-btn>
      </v-row>
    </section>
    <!--         -->
    <!-- TOP画像 -->
    <!--         -->
    <section class="ma-0 px-0 pt-8 pt-md-3 pb-8 bg-black container--fluid">
      <v-container class="mx-auto my-0 pa-0 max-container-top">
        <v-img
          eager
          contain
          :lazy-src="require('~/assets/images/top/black.png')"
          :src="require('~/assets/images/top/black.png')"
          v-on:load="loadedBlack()"
        >
          <transition v-for="(el, index) in items" :key="el.src" name="bounce">
            <div v-show="currentImg === index && !firstShow" class="">
              <v-overlay absolute class="my-overlay">
                <v-img
                  eager
                  contain
                  :src="el.src"
                  v-on:load="loadedCount < 2 && imageLoaded('top', index)"
                  v-on:click="
                    currentImg !== items.length - 1
                      ? currentImg++
                      : (currentImg = 0)
                  "
                />
              </v-overlay>
            </div>
          </transition>
        </v-img>
      </v-container>
    </section>
    <!--                   -->
    <!-- イントロダクション -->
    <!--                   -->
    <section
      id="introduction"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 pt-0 pb-3 bg-light justify-center container--fluid"
    >
      <!--  my-0 py-0 px-0  -->
      <v-container class="mx-auto mt-0 pt-0 max-container">
        <!-- justify : 'start','center','end','space-around','space-between' -->
        <v-row
          class="mx-0 mt-0 mb-6 pa-0"
          justify="space-between"
          align="center"
        >
          <!-- <v-col class="mx-auto my-0 pa-0"> -->
          <a
            href="https://line.me/ti/p/K2_SC98IPi"
            class=""
            style="line-height: 48px; vertical-align: middle"
            ><img
              style="
                line-height: 48px;
                margin: auto;
                vertical-align: middle;
                display: inline-block;
              "
              alt="友だち追加"
              border="0"
              height="36"
              :src="require('@/assets/images/contacts/ja.png')"
              width="100"
          /></a>

          <v-btn color="primary" href="/contact">お問い合わせ</v-btn>
          <v-btn
            v-if="0"
            depressed
            style="
              height: 36;
              border: 1px solid !important;
              border-color: white !important;
            "
            large
            color="primary"
            to="/contact"
            class="mx-2 my-0 px-2 py-0"
          >
            <span class="ma-0 pa-0 title">お問い合わせ</span>
          </v-btn>
          <!-- </v-col> -->
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <!-- <h2 class="display-4 text-center font-weight-bold text-danger py-2">
              2021年4月 OPEN！
            </h2> -->
            <p class="h3 text-left text-dark font-weight-bold px-0">
              オーバーロードは長野市に2021年オープンした少人数本格プライベートジムです。
            </p>
          </v-col>
        </v-row>
        <v-row v-if="0" class="ma-0 pa-0">
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="pa-2"
            v-for="el in introductions"
            :key="el.src"
          >
            <!-- eagerはマウント時に強制レンダリング -->
            <!-- border付ける場合はborderを指定 -->
            <!-- eager  -->
            <v-img contain class="rounded" :src="el.src" />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!--      -->
    <!-- 概要 -->
    <!--      -->
    <section
      id="greetings"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 pt-0 pb-3 bg-sec1 justify-center container--fluid"
    >
      <!-- my-0 py-0 px-0 -->
      <v-container class="position-relative mx-auto my-0 max-container">
        <v-row class="mx-0 my-0 px-0 py-0">
          <v-col
            offset="1"
            cols="10"
            class="mx-auto my-0 py-0 d-flex d-sm-none"
          >
            <v-img
              contain
              class=""
              :src="
                require('~/assets/images/greetings/dumbbell_512x320_compress.png')
              "
              alt=""
            />
          </v-col>
        </v-row>
        <v-row class="px-0 mx-0">
          <v-col
            cols="12"
            sm="12"
            md="7"
            class="mx-0 pt-0 px-0 message"
            style="z-index: 1"
          >
            <!-- h2 ->  text-h4 -> h2をbootstrapから移植 -->
            <!-- text-primary -> blue--text text--darken-1 -> text-primary 作成-->
            <!-- <h3 class="text-h4-custom text-primary font-weight-bold pt-2 pb-4"> -->
            <h2 class="h2 text-primary font-weight-bold pt-2 pb-4">
              オーバーロードとは
            </h2>
            <!-- h4 text-dark -> text-h5 grey--text text--darken-4 -->
            <!-- grey--text text--darken-3 -->
            <p class="h4 text-dark font-weight-bold">
              25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
            </p>
            <p class="h4 text-dark font-weight-bold mb-3 pb-0">
              初心者でも安心！自重、軽い重量で狙った筋肉への効かせ方をお教えします！
            </p>
            <!-- class m-0 -> mt-0 pt-0 -->
            <p class="ma-0 pa-0">
              <em
                >ただ負荷をかけるのではなく、軽度なものでも効果的に働きかけてくれるので、身体が変わってくることが自然に楽しく、いつの間にか筋トレにはまってしまいます！！</em
              >
            </p>
          </v-col>
          <!-- Debug -->
          <!-- v-if="0"停止 -->
          <!-- <div v-show="0">
            sm: {{ $vuetify.breakpoint.sm }} md:
            {{ $vuetify.breakpoint.md }} smAndDown:
            {{ $vuetify.breakpoint.smAndDown }} smAndUp:
            {{ $vuetify.breakpoint.smAndUp }} mdAndDown:
            {{ $vuetify.breakpoint.mdAndDown }}
            mobileBreakpoint:{{ $vuetify.breakpoint.mobileBreakpoint }}
          </div> -->
          <v-overlay
            v-show="1"
            class="my-overlay d-none d-sm-flex pt-5"
            absolute
            :opacity="0"
            :z-index="0"
          >
            <v-row class="mx-0 px-0 my-0 py-0" justify="center">
              <v-col sm="0" md="5"> </v-col>
              <!-- 重要 offsetでズラす -->
              <v-col cols="12" sm="12" md="7" class="content-right">
                <!-- class="ml-auto" -->
                <!-- style="opacity: 0.5" -->
                <!-- smの時だけ、opacityを0.5とする -->
                <!-- 1) OK !$vuetify.breakpoint.sm && $vuetify.breakpoint.md -->
                <!-- 2) OK $vuetify.breakpoint.smAndUp && $vuetify.breakpoint.mdAndDown -->
                <!-- ただし、vuetifyのbreakpoints thresholdsの問題なのか -->
                <!-- 576pxではopacity-50が有効にならず、600pxからになってしまう -->
                <!-- そこで、576pxからになるように opacity-50-slaveを定義した -->
                <!-- mobileBreakpointというpropが関係している？(関係なし) -->
                <!-- どうやら $vuetify.breakpoint.smAndUp の判定が 600pxになったままなようだ -->
                <!-- なので、$vuetify.breakpointはちょっと使えない -->
                <!--
                    'opacity-50':
                      !$vuetify.breakpoint.sm && $vuetify.breakpoint.md,
                -->
                <v-img
                  :class="{
                    'ml-auto': true,
                    'opacity-50-slave': true,
                  }"
                  max-width="400px"
                  contain
                  :src="
                    require('~/assets/images/greetings/dumbbell_512x320_compress.png')
                  "
                  alt="メッセージ画像"
                />
              </v-col>
            </v-row>
          </v-overlay>
        </v-row>
      </v-container>
    </section>
    <!--        -->
    <!-- ビデオ -->
    <!--        -->
    <section id="video" class="bg-video">
      <div v-if="0" class="video-container mx-auto">
        <!-- iframeのサイズ -->
        <!-- https://stackoverflow.com/questions/35814653/automatic-height-when-embedding-a-youtube-video -->
        <!-- <v-container> -->
        <!-- <v-row class="">
          <v-col class=""> -->
        <!-- <iframe
          style="margin-right: 1%; margin-left: 1%"
          width="98%"
          height=""
          src="https://www.youtube.com/embed/HwzQbfde-kE"
          frameborder="0"
        ></iframe> -->
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HwzQbfde-kE"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <!-- <iframe
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"
          ></iframe> -->
        <!-- </v-col>
        </v-row> -->
        <!-- </v-container> -->
      </div>
      <v-container v-if="0" class="mx-0 px-0">
        <v-row class="mx-0 px-0">
          <!-- class="mx-auto" -->
          <!-- px-sm-0 px-md-1 px-lg-2 -->
          <v-col cols="12" class="mx-0 px-0 px-md-2 px-lg-10">
            <div class="wrapper">
              <div class="h_iframe">
                <!-- width="560" height="315" -->
                <img class="ratio" src="http://placehold.it/16x9" />
                <!-- v=0eNKVf3Qw6M 0eNKVf3Qw6M -->
                <!-- <iframe
                  src="https://www.youtube.com/embed/0eNKVf3Qw6M"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe> -->
                <!-- <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/lGETWi1QufE"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe> -->
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/ulfxSOgea4M"
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
      <!-- M7lc1UVf-VE ulfxSOgea4M -->
      <!-- ulfxSOgea4M -->
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/VjJmjXVZjbE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      <!-- VjJmjXVZjbE(SADA社長) hrcV4e7_yC0(ハムスター) -->
      <!-- オーバーロード sd1Anc-5OEA 5Ok3wypmg6w 5ZJ96L9wS-I-->
      <promotion-video videoId="5ZJ96L9wS-I" />
    </section>
    <!--        -->
    <!-- 体験談 -->
    <!--        -->
    <section
      id="exp"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 pt-0 pb-8 bg-black justify-center container--fluid"
    >
      <v-container class="container--fluid mx-0 my-0 px-0 py-0 bg-blue">
        <h2 class="text-center text-light mx-0 px-0 py-6">
          ご利用者様の体験談
        </h2>
      </v-container>
      <!-- mx-autoでセンタリングされる -->
      <!-- my-0 py-0 px-0 -->
      <v-container class="mx-auto my-5 max-container">
        <!-- あえてv-rowを入れない -->
        <!-- <h2 class="text-center text-light py-4 bg-dark">ご利用者様の体験談</h2>
        <br /> -->
        <Experience
          v-for="(el, index) in exps"
          :key="el.url"
          :index="index"
          :exp="el"
          :eager="false"
        />
      </v-container>
    </section>
    <!--      -->
    <!-- 施設 -->
    <!--      -->
    <section
      id="facilities"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 py-8 justify-center container--fluid"
    >
      <!-- my-0 py-0 px-6 -->
      <v-container v-if="0" class="mx-auto max-container">
        <v-row class="ml-0 mt-0 mb-3 pa-0">
          <h2 class="heading d-inline-block mr-2">ギャラリー</h2>
        </v-row>
        <v-row v-show="0" class="mx-0 mt-2 mb-0 pa-0">
          <v-col
            class="mt-0 mb-2 pa-0"
            cols="12"
            sm="4"
            v-for="el in galleries"
            :key="el.src"
          >
            <v-card class="mx-0 mx-sm-2 pa-4 pa-sm-2">
              <!-- 記述パターンがいくつかあるが、ここで直接requireを記述したい -->
              <!-- <v-img contain :src="el.src" /> -->
              <!-- <img style="width:100%" :src="el.src" /> -->
              <!-- OK <img style="width:100%" :src="require('~/assets/images/galleries/p1.jpg')" /> -->
              <!-- NG <img style="width:100%" :src="require(el.src1)" /> -->
              <!-- OK <img style="width: 100%" :src="require('~/assets/images/galleries/' + el.name)" /> -->
              <!-- eager -->
              <v-img
                contain
                :src="require('~/assets/images/galleries/' + el.name)"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- 動作確認必要 -->
      <Galleries />
    </section>
    <!--             -->
    <!-- プロフィール -->
    <!--             -->
    <section
      id="profile"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 py-8 justify-center container--fluid"
    >
      <v-container class="mx-auto max-container">
        <Profile :eager="false" :profile="profile" />
      </v-container>
    </section>
    <!--       -->
    <!-- 料金1 -->
    <!--       -->
    <section
      id="pricelist"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 pt-8 pb-4 bg-sec3 justify-center container--fluid"
    >
      <!-- my-0 py-0 px-6 -->
      <v-container class="mx-auto max-container">
        <v-row class="ml-0 mt-0 mb-3 pa-0">
          <h2 class="heading d-inline-block mr-2 text-light">ご利用料金</h2>
        </v-row>
        <v-row class="mx-0 mt-4 mb-6 pl-2" align="end">
          <span class="h4 mb-0 pb-0 white--text">入会金 10,000円</span>
          <span class="subtitle-1 ma-0 pa-0 white--text d-inline-block"
            >（全コースプラン、月額プラン）</span
          >
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col
            cols="12"
            md="6"
            lg="4"
            class="ma-0 px-2 py-0"
            v-for="el in pricelist"
            :key="el.title"
          >
            <PriceListItem :eager="false" :priceListItem="el" />
          </v-col>
        </v-row>
        <v-row v-if="0" class="ma-0 pa-0 justify-space-around">
          <v-icon
            v-for="(el, index) in [0, 1, 2, 3]"
            :key="index"
            small
            class="grey--text ml-2"
            >{{ mdiTriangle }}</v-icon
          >
        </v-row>
        <v-row v-if="0" class="ma-0 pa-0">
          <!-- preitter-ignore -->
          <v-col class="ma-0 px-2 py-0">
            <v-card class="grey lighten-1 pa-2">
              <h3 class="h4">
                上記 3つのコース料金に含まれるもの<br />
                <!-- <span class="small pl-3">※コース・プランに適用</span> -->
              </h3>
              <p class="mb-3">
                （電話、LINE、E-mailによる）<br />
                食事、およびトレーニング関係のアドバイス
              </p>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-0 mx-0 px-2">
          <v-row
            style="vertical-align: middle"
            class="mx-0 mt-0 mb-2 px-0 pt-1 pb-2 border-bottom border-secondary white--text d-inline-block"
          >
            <span
              style="vertical-align: middle"
              class="h3 ma-0 pa-0 white--text"
            >
              料金に含まれるもの
            </span>
            <span
              style="vertical-align: middle"
              class="h6 ma-0 pl-4 d-inline-block white--text"
            >
              ※コースプランに適用
            </span>
            <v-spacer />
          </v-row>
          <p class="white--text pl-4">
            食事関係のアドバイス、
            <span class="d-inline-block">トレーニング関係のアドバイス</span>
            <span class="d-inline-block">（電話、LINE、E-mailにて）</span>
          </p>
        </v-row>
      </v-container>
      <!-- <v-container class="mx-auto max-container">
        <v-row class="mx-0 my-4 pa-0">
          <v-col class="ma-0 px-2">
            <v-divider class="grey--text" />
          </v-col>
        </v-row>
        <PriceTable />
        <v-col cols="10" class="mx-auto my-0 pa-0 justify-center">
          <v-btn
            block
            style="min-height: 4rem"
            x-large
            color="success"
            to="/contact"
            class="mt-4 pa-0"
          >
            <span class="ma-0 pa-0 title font-weight-bold"
              >お問い合わせフォームへ</span
            >
          </v-btn>
        </v-col>
      </v-container> -->
    </section>
    <!--       -->
    <!-- 料金2 -->
    <!--       -->
    <section id="pricelist2" class="pb-5 bg-sec4">
      <v-container class="mx-auto max-container">
        <v-row class="ma-0 pa-0">
          <v-col cols="12">
            <v-card class="pa-3 bg-lightgreen justify-center text-center">
              <span class="h4 font-weight-bold text-center">
                都度セッション<span class="body-1 text-dark">（1回75分）</span>
              </span>
              <span class="h4 d-inline-block font-weight-bold text-center"
                >13,000円<span class="body-1">（税込）</span></span
              >
              <!-- <v-row class="ma-0 pa-0 justify-center">
                <h4 class="card-title font-weight-bold mt-2 text-center">
                  都度セッション<span class="body-1 text-dark"
                    >（1回50分）</span
                  >
                </h4>
              </v-row>
              <v-row class="ma-0 pa-0 justify-center">
                <h4 class="card-title font-weight-bold mt-0 mb-0 text-center">
                  13,000円<span class="body-1">（税込）</span>
                </h4>
              </v-row> -->
              <h4 class="card-title font-weight-bold mt-2 text-center">
                【※入会金なし】
              </h4>
              <p class="card-text text-center my-0 pb-2">
                お忙しくなかなか長期間がとれない方のための一回のセッションです。課題を事前にお伝えください。
              </p>
              <p class="caption text-center my-0 py-0">
                ※ アドバイス等はセッション時のみに限ります
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!--       -->
    <!-- 料金3 -->
    <!--       -->
    <section
      id="pricelist3"
      class="ma-0 px-0 py-6 bg-secondary justify-center container--fluid"
    >
      <h3 class="text-center white--text ma-0 pa-0">
        <!-- <i class="fas fa-sort-down mr-3"></i>月額プランもあります！<i
        class="fas fa-sort-down mr-3"
      ></i> -->
        <!-- classにて180度回転 -->
        <v-icon small class="white--text mr-2 rotate">{{ mdiTriangle }}</v-icon
        >月額プランもあります！<v-icon small class="white--text ml-2 rotate">{{
          mdiTriangle
        }}</v-icon>
      </h3>
    </section>
    <section class="pt-3 pb-5 bg-sec4">
      <v-container class="mx-auto max-container">
        <PriceTable />
        <!-- <v-row class="ma-0 pa-0">
          <v-col cols="10" class="mx-auto my-0 pa-0 justify-center">
            <v-btn
              block
              style="min-height: 4rem"
              x-large
              color="success"
              to="/contact"
              class="mt-4 pa-0"
            >
              <span class="ma-0 pa-0 title font-weight-bold"
                >お問い合わせフォームへ</span
              >
            </v-btn>
          </v-col>
        </v-row> -->
      </v-container>
    </section>
    <section id="contact" class="bg-secondary">
      <v-container class="mx-auto py-12 max-container">
        <!-- 見やすさの観点から問い合わせからの戻りをこの位置とする -->
        <h3 class="white--text font-weight-bold mb-4">
          初回に無料カウンセリング及びお試しトレーニングを1時間程度いたします。
        </h3>
        <v-btn
          block
          depressed
          style="
            min-height: 4rem;
            border: 1px solid !important;
            border-color: white !important;
          "
          x-large
          color="primary"
          to="/contact"
          class="mt-4 mx-1 px-2"
        >
          <span class="ma-0 pa-0 title">お問い合わせフォームへ</span>
        </v-btn>
      </v-container>
    </section>

    <!--          -->
    <!-- お知らせ -->
    <!--          -->
    <section class="ma-0 px-0 py-8 justify-center" id="sec7">
      <Announce />
    </section>
    <!--               -->
    <!-- アクセスマップ -->
    <!--               -->
    <section
      id="access"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 py-8 bg-lightyellow2 justify-center container--fluid"
    >
      <!-- max-container px-6 px-sm-6 px-md-10 -->
      <!-- my-0 py-0 px-6 -->
      <v-container class="mx-auto max-container">
        <v-row class="ml-0 mt-0 mb-3 pa-0">
          <h2 class="heading d-inline-block mr-2">アクセス</h2>
        </v-row>
      </v-container>
      <!-- 画面一杯、max-containerなし -->
      <v-container fluid class="mx-auto mx-0 my-0 px-0 py-0">
        <AccessMap />
      </v-container>
      <!-- my-0 py-0 px-6 -->
      <v-container class="mx-auto max-container">
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 px-0 py-0">
            <p>
              長電バス平林線バス停「中和田」より徒歩1分。しなの鉄道「北長野駅」より徒歩20分。<br />
              お車でお越しの場合は専用駐車場をご利用ください。<br />※18時以降は裏口(東側入口)よりお越しください。<br />
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!--                       -->
    <!-- お問合せフォームボタン -->
    <!--                       -->
    <!-- <section
      id="contact"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 py-8 justify-center text-center"
    ></section> -->
    <!--          -->
    <!-- フッター  -->
    <!--          -->
    <section
      id="footer"
      v-show="blackLoaded || topLoaded"
      class="ma-0 px-0 py-8 bg-black justify-center"
    >
      <!-- my-0 py-0 px-6 px-sm-6 px-md-10 -->
      <v-container class="mx-auto max-container">
        <Footer telNumber="090-1829-7194" stopImage />
      </v-container>
    </section>
  </v-container>
</template>

<script>
import Experience from '@/components/Experience'
import AccessMap from '@/components/AccessMap'
import Profile from '@/components/Profile'
import PriceListItem from '@/components/PriceListItem'
import PriceTable from '@/components/PriceTable'
import Announce from '@/components/Announce'
import Footer from '@/components/Footer'
import Galleries from '@/components/Galleries'
import { mdiTriangle } from '@mdi/js'
import expsJson from '@/assets/json/experiences.json'
import PromotionVideo from '@/components/PromotionVideo'

export default {
  components: {},
  head() {
    return {
      title: '【長野市 パーソナルジム】オーバーロード',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPost.fields.description,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'オーバーロード',
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://over-road.com/',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '【長野市 パーソナルジム】 オーバーロード',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.currentPost.fields.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://over-road.com/images/topimage.png',
        },
        // {
        //   hid: 'twitter:card',
        //   property: 'twitter:card',
        //   content: 'summary_large_image',
        // },
      ],
    }
  },
  data() {
    return {
      mdiTriangle, // アイコン
      eager: false,
      timerId: null, // top画像ローテーション用タイマーID
      firstShow: true, // hash付きのアクセスに対応するためのフラグ
      currentImg: 0,
      loadedCount: 0,
      loadedSectionCount: 0,
      blackLoaded: false, // top画像の最初の黒画像ロード
      topLoaded: false, // top画像の
      sectionIndex: 0,
      cycle: true,
      // SEO対策
      currentPost: {
        fields: {
          title: '【長野市 パーソナルジム】オーバーロード',
          description:
            '長野市 パーソナルトレーニングジム オーバーロードは、筋トレ、筋力アップ、バルクアップ、ダイエットを目指す方々を対象とする、マンツーマン方式のパーソナルトレーニングを行う長野市にあるスポーツジムです。また、ベストボディおよびJBBF等、各団体のコンテスト出場を目指す選手を育成しています。',
        },
      },
      // 最上位のassetsの場合は、ビルド時に解決だろうからwebアクセス不可
      // imagePath: '@/assets/images/top_image1-2.png',
      // static下へ作った場合はwebアクセス可能
      anchors: [
        {
          anchorId: null,
          title: 'HOME',
          url: null,
        },
        // {
        //   anchorId: 'introduction',
        //   title: 'イントロダクション',
        //   url: null,
        // },
        // {
        //   anchorId: 'notice',
        //   title: 'お知らせ',
        //   url: null,
        // },
        // {
        //   anchorId: 'greetings',
        //   title: 'ごあいさつ',
        //   url: null,
        // },
        {
          anchorId: 'sec7',
          title: 'お知らせ',
          url: null,
        },
        {
          anchorId: 'exp',
          title: '体験談',
          url: null,
        },
        // {
        //   anchorId: 'facilities',
        //   title: '施設',
        //   url: null,
        // },
        {
          anchorId: 'facilities',
          title: 'ギャラリー',
          url: null,
        },
        {
          anchorId: 'profile',
          title: 'プロフィール',
          url: null,
        },
        {
          anchorId: 'pricelist',
          title: '料金',
          url: null,
        },
        // {
        //   anchorId: null,
        //   title: '予約',
        //   url: '/schedule',
        // },
        {
          anchorId: null,
          title: '問い合わせ',
          url: '/contact',
        },
        {
          anchorId: 'access',
          title: 'アクセス',
          url: null,
        },
      ],
      items: [
        {
          // src:
          //   'https://www.dpc2.net/test/wp-content/uploads/2021/02/top_image1-2.png',
          // src: '/images/top_image1-2.png',
          // src: require('@/assets/images/top/top_image1-2-min-3.png'),
          src: require('@/assets/images/top/topimage.png'),
        },
        {
          // src:
          //   'https://www.dpc2.net/test/wp-content/uploads/2021/02/top_image2.png',
          // src: '/images/top_image2.png',
          src: require('@/assets/images/top/top_image2-min_799x400.png'),
        },
        {
          src: require('@/assets/images/top/top_image3-min_799x400.png'),
        },
      ],
      introductions: [
        {
          src: require('@/assets/images/introductions/image1.jpg'),
        },
        {
          src: require('@/assets/images/introductions/image2.jpg'),
        },
        {
          src: require('@/assets/images/introductions/image3.jpg'),
        },
      ],
      expsOld: [
        {
          // '/images/person1.jpg',
          imageUrl1: require('@/assets/images/persons/person1.png'),
          // imageUrl2: require('@/assets/images/persons/person1-2.jpg'),
          title: '原さんの指導を受けて',
          subTitle1: '2020石川オープン大会ボディビル3位／ボディビル歴2年',
          subTitle2: '須坂市 青木 宏門様',
          mainContent:
            'トレーニングは何より怪我をしないやり方を重視されていて、これだけの経験があっても強制的ではなく提案していただけ、良きパートナーと言う感覚で教えていただけるのでやる気も上がります。',
          subContent:
            '時間の効率的かつ解剖学を軸にや競技歴25年以上の経験に裏打ちされた\
            引き出しの多いコーチングで、的確にどんな方でも短時間で筋肉に刺激が入ります。\
            結果身体の変化に驚く程早く現れます。\
            私が、ハードな仕事をしながら続けて行くことに悩んでいたときも、\
            アドバイスや時間の作り方、食事のタイミング等のコツを教えていただきました。\
            原さんの様に通常のサラリーマンを長年しながら現役、戦歴、経験からの指導が出来る方はこれまで、\
            お目にかかれませんでした。 \
            YouTubeやトレーニングの内容だけが日々を通しての身体作りではないのですから。\
             殆どのクライアントさんが、トレーナー以外の仕事と考えると、\
             それをこなしての、時間の作り方、生活全般の過ごし方話など、\
             通常のトレーナーでは、わからないところまで寄り添ってくれるので、\
             有りがたく思います。 1ヶ月目で自身が変わり、\
             ２ヶ月目には他人にその変化が何人にも言われるくらいのセッションですので、\
             短期間で自分を変えたい方にはビッタリだと思います。',
        },
        {
          // imageUrl: '/images/person2.jpg',
          imageUrl1: require('@/assets/images/persons/person2.png'),
          title: '一歩を踏み出す勇気で変われます',
          subTitle1:
            '2020月刊誌アイアンマンオンラインコンテスト ボディビルノービスの部三連覇／ボディビル歴1年',
          subTitle2: '上越市 田原 良樹様',
          mainContent:
            '僕が原さんに出会って１年が経ちましたが、自分でもこの1年の成長には驚いています。\
            この1年は今までの数年分に相当したと思います。それくらい効果がありました。',
          subContent:
            'お金を払ってトレーニングを学ぶことに抵抗がある人がいるかも知れませんが、\
            僕は何1つ後悔していません。\
            この1年の伸び、そしてこれから先のトレーニング人生を考えるととてもいい投資が\
            できたと思っています。もしあの時、原さんから習うことを決意していなかったら\
            今の自分の身体はできていません。\
            パーソナルトレーニングは自分の未来への投資です。\
            一歩を踏み出す勇気さえあれば人は変われます。 \
            本物を学びたい、そんな人はぜひ原さんに身を委ねてみてください。',
        },
        {
          // imageUrl: '/images/person3.jpg',
          imageUrl1: require('@/assets/images/persons/person3.jpg'),
          title:
            'バイク以外にも、野球、ゴルフ、スキー、スノーボード、格闘技関係等も指導されているのでそんな方にもお薦めです。',
          subTitle1: 'BMXバイシクルモトクロス2020東京オリンピック候補',
          subTitle2: '上越市 池田　大輝様',
          mainContent:
            '私の場合は東京オリンピック出場を目標にしていたので、ボディメイクの的確な基礎フォームからスタートしました。',
          subContent:
            '第2段階でミーティングをし、瞬発系を重視したかったのでこちらから提案した際も、\
            そこからより効果的なメニューを考えて、競技の成績調子共に上げていただきました！ \
            ボディメイク以外のアスリートのセッションも、こなせる原さんは凄いと思います。 \
            私みたいにバイク以外にも、野球、ゴルフ、スキー、スノーボード、\
            格闘技関係等も指導されているのでそんな方にもお薦めです。 \
            自身はボディメイクのエキスパートでしょうが、そこら辺の引き出しも幅広いと、思います。',
          // className: 'grey black--text',
        },
        {
          imageUrl1: null,
          title: 'パーソナルを終えて',
          subTitle1: null,
          subTitle2: '長野市 Kさん 60代男性',
          mainContent:
            '私は毎朝公園でラジオ体操や、散歩、鉄棒を使っての運動をコロナ禍で、していました。この春、ジムが閉鎖されたということで朝の公園でお逢いしたのが原さんでした。',
          subContent:
            'ジャングルジムや、鉄棒を使っての私のような高齢でも確かな負荷をかける\
            トレーニングをいくつか習い、足腰が強くなり階段や坂道でも全く疲れず\
            一時間歩けるようになり それからジムで少しずつ教えていただきました。\
            今では上半身もしゃんとして、姿勢が変わったと廻りの友人から言われて健康が\
            文字通り買えたと思いました。こらからも宜しく頼みますよ原さん。',
          className: null,
        },
        {
          imageUrl1: null,
          title: 'パーソナルの感想',
          subTitle1: null,
          subTitle2: '長野市 Kさん 50代男性',
          mainContent:
            '原さんにお世話になり早五年になります。私は一人でトレーニングを続けるのが苦手で、週一でお任せしてました。',
          subContent:
            '１年経った頃より近所の方や仕事のお付き合い相手から身体が大きくなったと、\
            言われて気づけばオーダースーツしか着れない身体になり嬉しくなり引き続き講師を\
            頼みました。\
             原さんは私ら初心者~分かりやすくポイントを丁寧に見本を見せながら教えて頂けます。\
             原さん自体素晴らしい現役選手だけに長年の引き出しや、\
             年配に対するコミュニケーションがとても上手いと感じます。 \
             50代後半から初めて肥満体の私が維持できるので、誰にでもお勧めできます。',
          className: null,
        },
        {
          imageUrl1: null,
          title: 'なりたい自分になれます',
          subTitle1: null,
          subTitle2: '長野市 Mさん40代 女性',
          mainContent:
            '私が原さんと出会ったのは、大手パーソナルジムを受け終えたあと、\
            これから維持や向上をどうして良いかわからない時でした。原さんは知識と経験が豊富なので、\
            引き出しが沢山あり、必要な事を絶妙なタイミングで教えてくださいます。',
          subContent:
            'そして教わった通りに実践すると、体にまた変化が現れ、\
            変化と進化を繰り返す自分の体に驚きました。日々の努力は必要ですが、\
            変わることにより自発的にやる気が出るんです。\
            太っていた頃の私とサヨナラして筋トレと食事で\
            体のコンプレックスはほとんど解消することができることを学びました。\
            現在ではビキニ世界一の方の体を目標に、日々己と対峙しています。 \
            またジムを利用する時のマナーに関しても教えいただき、\
            これは前のところでも習えなかったので、今も役立って自信をもって挑んでいます。\
            また、私がトレーニング、食事、休息などについてラインにて質問すると、\
            その日のうちに必ず返事をくださいます。\
            パーソナルトレーナーさんは沢山居ても、\
            なかなか原さんの様な面倒見の良いトレーナーさんには出会えないと思います。 \
            私は原さんのおかげで最短で今の自分になれました。本当に感謝しています。\
            原さんも筋トレも裏切りません、原さんの指導のもと、\
            努力を続ければ必ずなりたい自分になれます！',
          className: null,
        },
        {
          imageUrl1: null,
          title: 'トレーニングの習慣が付きました',
          subTitle1: null,
          subTitle2: '長野市 小林さん 20代男性',
          mainContent:
            '僕は原さんに出会うまで自己管理ができない人間でした。運動もしない、\
            夜中にスナック菓子を食べる生活でした。痩せたいと思っていましたがいつか\
            痩せれば良いなと思っていました。そんな時、原さんと出会いました。',
          subContent:
            'はじめの頃は僕は原さんのパーソナルが終わったら、\
            辞めるつもりでいたのですが、結果的には、辞めずに教えていただいたことを\
            もとに１人ジムに通い、続けています。\
            その理由は原さんとのトレーニングにより僕の体が変化していくたびに、\
            周りの人達から「すごい変わった」と褒められたからです。\
            ただトレーニングを教えるのではなく、パーソナルが終わってからのことまで\
            学べたからです。\
            体重も3ヶ月で10キロほど落とせていたので、その効果には驚いています。\
            僕は元々プロレスを見るのが好きなので、筋トレを始めてからは見る角度も\
            変わりプロレスラーの筋肉を良く見るようになりました。\
            こんな選手みたいな体になりたいと思い、自身もトレーニングの習慣が付きました。\
            原さんに出会わなければ人生がこんなに変わることは、なかったと思います。',
          className: null,
        },
      ],
      galleries: [
        // {
        //   src: require('@/assets/images/galleries/ph-10.jpg'),
        //   src1: '~/assets/images/galleries/ph-10.jpg',
        //   name: 'ph-10.jpg',
        // },
        // {
        //   src: require('@/assets/images/galleries/ph-11.jpg'),
        //   src1: '~/assets/images/galleries/ph-11.jpg',
        //   name: 'ph-11.jpg',
        // },
        // {
        //   src: require('@/assets/images/galleries/ph-12.jpg'),
        //   src1: '~/assets/images/galleries/ph-12.jpg',
        //   name: 'ph-12.jpg',
        // },
        // {
        //   src: require('@/assets/images/galleries/ph-13.jpg'),
        //   src1: '~/assets/images/galleries/ph-13.jpg',
        //   name: 'ph-13.jpg',
        // },
        // {
        //   src: require('@/assets/images/galleries/ph-14.jpg'),
        //   src1: '~/assets/images/galleries/ph-14.jpg',
        //   name: 'ph-14.jpg',
        // },
        // {
        //   src: require('@/assets/images/galleries/ph-15.jpg'),
        //   src1: '~/assets/images/galleries/ph-15.jpg',
        //   name: 'ph-15.jpg',
        // },
      ],
      profile: {
        name1: '原　剛士',
        name2: 'ハラ　タケシ',
        name3: 'パーソナルトレーナー',
        mainContent:
          'ボディビル競技を25年間現役で継続しつつ、10年ほど前から、コンテスト出場希望者、アスリート、\
        一般のダイエッターを対象として、トレーニングや食事に関する指導をさせていただいております。<br />\
        クライアント様の中からベストボディジャパン、JBBF各大会にて入賞者を多数輩出中です。<br /><br />',
        detailContent:
          '私がトレーニングを始めたきっかけは、20代の頃までは身体が細かったので、もっと大きな身体になりたいと思い、近くのジムに通い始めました。そのとき師匠に出会い、始めた当初は出場する気がなかったボディビル選手権に、僅か３ヶ月で出場していました。選手の皆さんに圧倒されたと同時に、この人たちにまた来年もこの場で逢いたいと思い、出場を続けて２５年が経ちました。<br />\
        それから現代、多種多様する世の中で、自分の身体に磨きをかけることに価値を見出す人が多くなり、ここ数年でパーソナルトレーナーが多くなったと実感しています。<br />\
        近年、益々健康に対する気運は高まっており、そんな時に私に役に立てる事はないかと考えたのがパーソナルセッションです。<br />\
        指導経験、引き出しの多さと実績には絶対の自信を持っております。一度自分と本気で向き合いたいとお考えの方がいらっしゃいましたら、是非私にご用命下さい。今日よりも明日、1か月後に、ご自身がなりたい身体に進化している姿を共に観てみませんか。<br />\
        お待ちしております。<br /><br />\
        ',
        careers: [
          '個人パーソナル歴五年プライペートパーソナルGYM勤務経験あり',
          'JBBF全日本マスターズ40歳以上の部八位',
          'JBBF東日本マスターズ40歳以上の部三位',
          'JBBF東日本75kg級四位',
          'JBBF北陸甲信越マスターズボディビル優勝',
          'JBBF長野県マスターズボディビル優勝',
          'JBBF長野県理事',
        ],
        qualifications: ['介護運動指導員', 'NSCA-CPT正会員'],
      },
      pricelist: [
        {
          imageUrl: require('@/assets/images/pricelist/course_1.png'),
          // imageUrl:require('@/assets/images/galleries/p1.jpg'),
          title: 'ボディデザインコース',
          entryName: '入会金',
          entryPrice: '10,000円',
          lessonTime: '1回75分',
          lessonDesc: '食事指導付き',
          totalNumber: '全12回',
          period: '(3ヶ月)',
          mainContent:
            '既にトレーニング経験が数年あり、バルクアップ、筋肥大、ゆくゆくはコンテストなどに出たい方にオススメです。',
          priceMain: '130,000円',
          priceSub1: null,
          priceSub2: null,
        },
        {
          imageUrl: require('@/assets/images/pricelist/course_2.png'),
          // imageUrl:require('@/assets/images/galleries/p1.jpg'),
          title: 'ダイエットコース',
          entryName: '入会金',
          entryPrice: '10,000円',
          lessonTime: '1回75分',
          lessonDesc: '食事指導付き',
          totalNumber: '全16回',
          period: '(3ヶ月)',
          mainContent:
            '初心者、肥満予防、健康維持しながら健康的なダイエットを実現したい方にオススメなプランです。',
          priceMain: '150,000円',
          priceSub1: null,
          priceSub2: null,
        },
        {
          imageUrl: require('@/assets/images/pricelist/course_3.png'),
          // imageUrl:require('@/assets/images/galleries/p1.jpg'),
          title: 'マスターズコース',
          entryName: '入会金',
          entryPrice: '10,000円',
          lessonTime: '1回75分',
          lessonDesc: '食事指導付き',
          totalNumber: '全16回',
          period: '(3ヶ月)',
          mainContent:
            '50歳以上の初心者から経験者まで幅広くご希望に合わせて指導いたしますのでお気軽にお問い合わせください。',
          priceMain: '140,000円',
          priceSub1: null,
          priceSub2: null,
          additionalInfo: null,
        },
      ],
      exps: null,
    }
  },
  async asyncData({ $axios, route }) {
    // return { products: Subscriptions }
    // https://snipcart-backend.netlify.app/.netlify/functions/products
    let url = '/assets/json/experiences'
    try {
      // const result = await $axios.get(url)
      const result = require(`~/assets/json/experiences.json`)
      // console.log('result: ', result)
      // const { data } = result
      // console.log('data: ', data)
      // 絞り込み
      const exps = result.filter((v) => v.enabled === true)
      return {
        exps: exps,
      }
    } catch (err) {
      // エラーの場合は静的なProductsを返す
      return { exps }
    }
  },
  mounted() {
    // this.$vuetify.breakpoint
    // console.log('this.$vuetify.breakpoint:', this.$vuetify.breakpoint)
    // console.log('mounted exp:', document.querySelector('#exp'))
    // 他のページからhash付きで遷移してきた場合
    // => ここでは反応しないためこの処理は created() へ移動した。
    // if (this.$route.hash) {
    //   const hash0 = this.$route.hash.replace('#', '')
    //   this.handleScroll(hash0)
    // }
    // 初めてこのページへ来た場合(今はうまく動かない)
    // setTimeout(() => {
    //   if (this.$route.hash) {
    //     const hash0 = this.$route.hash.replace('#', '')
    //     console.log('mounted handleScroll hash0:', hash0)
    //     this.handleScroll(hash0)
    //   }
    // }, 0)

    // スライド停止
    setTimeout(() => {
      if (this.timerId) clearInterval(this.timerId)
      //　画像を1にしておく
      this.currentImg = 1
    }, 3 * 60 * 1000)

    // v-carouselのcycleを止める
    setTimeout(() => {
      this.cycle = false
    }, 3 * 60 * 1000)
  },
  updated() {
    // console.log('updated')
    // 同じページの違う場所にいても反応してしまうため、firstShowとしてフラグを導入
    this.$nextTick(function () {
      if (this.firstShow && this.$route.hash) {
        const hash0 = this.$route.hash.replace('#', '')
        // console.log('updated handleScroll hash0:', hash0)
        // 上に画像がある場合に、表示後にズレてしまうため、
        // 2回呼ぶ(タイマーをかける)
        this.firstShow = false
        // 1回目
        this.handleScroll(hash0) // => ここでも同じ
        // 上の画像が読み込まれていないため、位置がズレる
        // タイマーをかける
        setTimeout(() => {
          // 2回目
          this.handleScroll(hash0)
        }, 800)
      } else if (this.firstShow) {
        this.firstShow = false
      }
    })
  },
  watch: {
    firstShow: function (newValue, oldValue) {
      if (!newValue && !this.timerId) {
        this.timerId = setInterval(() => {
          if (this.currentImg === this.items.length - 1) {
            this.currentImg = 0
          } else {
            this.currentImg = this.currentImg + 1
          }
        }, 7 * 1000)
      }
    },
  },
  computed: {},
  methods: {
    handleScroll(anchorId) {
      if (this.$route.hash) {
        // console.log('handleScroll: ', anchorId)
        const anchor = document.querySelector(`#${anchorId}`)
        // console.log('anchor: ', anchor)
        // 別の方法
        // document.querySelector("[id='22']")

        // Check if the anchor has been found
        // console.log(' window.pageYOffset: ', window.pageYOffset)
        // window.pageYOffsetは0ぽいので適当に -90 とする
        if (anchor) {
          // console.log('window.scrollTo')
          window.scrollTo({
            // Scroll so that the anchor is at the top of the view
            // top: anchor.getBoundingClientRect().top + window.pageYOffset,
            top: anchor.getBoundingClientRect().top + window.pageYOffset + -90,
            // top: anchor.getBoundingClientRect().top
          })
        }
      }
    },
    imageLoaded(anchor, index) {
      this.loadedCount++
      if (this.loadedCount > 1) {
        setTimeout(() => {
          this.topLoaded = true
        }, 0)
      }
    },
    loadedBlack() {
      this.blackLoaded = true
    },
  },
}
</script>

<style lang="scss" scoped>
// 子コンポーネントにもbg-dark等効かせるためには、
// ::v-deep を付ける必要がある。
// しかし、全ての子コンポーネントに伝わるため良くない。
// 一旦やめて、bg-darkやheadingを使うタグを外に出すよう
// 子コンポーネントを再構成する(Profile)方がよいのか？
// または、scopedを付けないでstyleに入れる
// @import '~assets/styles/layout';
// ::v-deep {
//   @import '~assets/styles/layout';
// }

// bootstrapの場合
// xs: 0,
// sm: 576px,
// md: 768px,
// lg: 992px,
// xl: 1200px,

// 以下はどうやら書く順序が重要らしい
// @media (min-width: 576px) {
//   .max-container {
//     max-width: 540px;
//   }
// }
// @media (min-width: 768px) {
//   .max-container {
//     max-width: 720px !important;
//   }
// }
// @media (min-width: 992px) {
//   .max-container {
//     max-width: 960px !important;
//   }
// }
// @media (min-width: 1200px) {
//   .max-container {
//     max-width: 1140px;
//   }
// }
//
// 2021.4.7 TOP画像がデカくなりすぎなために以下で制限する
//
.max-container-top {
  max-width: 720px !important;
}

.position-relative {
  position: relative !important;
}
.position-absolute {
  position: absolute !important;
  left: 0;
}
// display-4
// 現在 _bootstrap.scssをassets配下へ作成してそこで変数定義
// global.scssにdisplay-4の定義を追加
// 未使用にできる

.my-overlay {
  bottom: initial;
}

.my-parent {
  position: relative;
}

// ポイント(これで中央に集まる)
.my-parent .my-overlay {
  position: absolute;
}

// 以下、v-imgをv-cardに入れない場合に角を丸める時に指定する
.border {
  border: 1px solid #ccc;
}
.border-bottom {
  border-bottom: 1px solid #dee2e6;
}
.border-secondary {
  border-color: #6c757d !important;
}
// dumbbell.pngが重なる場合のopacity調節
// (現在は下の救済策が優先度高い)
.opacity-50 {
  opacity: 0.5;
}
// 576px から 600pxの間でopacityが0.5にならない対策
.opacity-50-slave {
  @media screen and (min-width: 576px) {
    opacity: 0.5;
  }
  @media screen and (min-width: 768px) {
    opacity: 1;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to /* .v-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s; //0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
// 以下を入れないとダメ(後ろの画像が最後にならないと見えない)
.bounce-enter, .bounce-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
// アイコン回転
.v-icon.rotate {
  transform: rotate(-180deg) !important;
}
// Youtubeセクション背景
.bg-video {
  // background: linear-gradient(to bottom, #dddddd 30%, #dddddd);
  background: #ddd;
}
// Youtube (1)
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  /* height: 720; /* original = 0 */
  height: 0;
  // max-width: 720;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
// Youtube (2) 採用中
// https://stackoverflow.com/questions/11122249/scale-iframe-css-width-100-like-an-image?rq=1
// html,
// body {
//   height: 100%;
// }
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

<!-- 上書きグローバルスタイル -->
<style lang="scss">
// 提供されたlayout.cssを.mainで括り、以下のようにした
.main {
  @import '~assets/styles/layout';
}

.my-overlay > .v-overlay__content {
  width: 100%;
}

// アイコン回転
// .v-icon.rotate {
//   transform: rotate(-180deg) !important;
// }

/* Chrome, Safari スクロールバー非表示 */
// .breadcrumb-wrapper::-webkit-scrollbar {
//   visibility: visible;
//   display: none;
// }
</style>
