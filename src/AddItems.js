

 db.collection("orders").add({
  name: name.value,
  check: list,
  total: money.totalsum.textContent,
  created_at: firebase.firestore.Timestamp.fromDate(now)
})