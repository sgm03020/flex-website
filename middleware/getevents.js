export default async ({ store }) => {
  if (store.state.calendar.events === null) {
    // await store.dispatch('calendar/setEvents')
    // console.log('middleware events is null. call dispatch calendar/initEvents')
    await store.dispatch('calendar/initEvents')
  }
}
