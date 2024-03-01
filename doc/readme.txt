設計

サーバ始動
  storeのindex.jsでnuxtServerInit実行
  => events取得

middleware
  getevents.js (storeのsetEventsコール:google calendarのイベント取得)
  これは唯一 schedule.vueでmiddleware: 'getevents'として読んでいるが
  => これをやめて素直にmountedで呼ぼうかと思う
     理由はvuex-persistedstateを導入したのでlocalStorageへ
     保持するようになったことで、mounted時に呼ぶ方が良いのではと思った次第
     => これはライフサイクルを確認する必要がある
         middlewareの場合の実行タイミングは？
         調べたが、やはりmiddlewareはclientのmountedより遥か前に実行される
         したがって、ここで実行されると(schedule.vueにgeteventsを登録すると)
         後のmounted時にeventsがvuex-persistedstate対象になっている場合
         バッティングするだろう

     vuex-persistedstateはnuxt.config.jsのpluginsでmode:'client'としており
     ブラウザ側でのみ動作する
     => eventsに関してはvuex-persistedstateに乗せないやり方を取るかどうか
        plugins: [
         createPersistedState({
         paths: ['user'],
        }),

  さらに、2020.1.15 schedule.vueのmountedではそのまま呼ぶままだが、
   => store/index.jsのnuxtServerInitの中で、同じstoreの
      calendar/updateEvents
      を呼ぶことで、最初に一発eventsを取得しておくことにした


initEventsおよびupdateEventsについて
  storeのinitEventsの呼び出し場所
  1) middlewareのgetevents.js
     => 現在は使っていないが、そのまま残しておく
  2) store/index.jsのnuxtServerInit
     => dispatchでcalendar/updateEventsを呼ぶ



