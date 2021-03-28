export function getList(query) {
    return fetch(`http://localhost:8000/locations?q=${query}`)
      .then(data => data.json())
}
