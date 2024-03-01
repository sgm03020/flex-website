// router.scrollBehavior.js
export default async function (to, from, savedPosition) {
  console.log('to', to)
  console.log('from', from)
  console.log('savedPosition', savedPosition)

  // 1)
  // if (to.hash) {
  //   return window.scrollTo({
  //     top: document.querySelector(to.hash).offsetTop + window.innerHeight,
  //     behavior: 'smooth',
  //   })
  // }
  // return window.scrollTo({ top: 0, behavior: 'smooth' })

  // 2)
  if (process.client) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    }
    if (to.hash) {
      console.log('scrollBehavior to.hash: ', to.hash)
      // let el = document.querySelector(to.hash)
      let el = document.querySelector(`${to.hash}`)
      console.log('scrollBehavior el: ', el)
      if (el) {
        if ('scrollBehavior' in document.documentElement.style) {
          // const OFFSET = 60
          const OFFSET = -60
          console.log('scrollBehavior window.scrollTo')
          return window.scrollTo({
            top: el.offsetTop - OFFSET,
            behavior: 'smooth',
          })
        } else {
          console.log('scrollBehavior window.scrollTo')
          return window.scrollTo(0, el.offsetTop)
        }
      }
    }
    return { x: 0, y: 0 }
  }
}
