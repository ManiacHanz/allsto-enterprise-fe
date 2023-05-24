// @ts-nocheck
// TODO: define types
async function fetcher(req, opt) {
  let reqUrl
  if (req.startsWith("http")) {
    reqUrl = req
  } else {
    reqUrl = `/api/v1/${req}`
  }
  const res = await fetch(reqUrl, opt)
  const json = await res.json()
  return json
  // TODO: Wrap in middleware
  // if (json.result) {
  //   return json.result
  // } else {
  //   throw new Error(json.error.message)
  // }
}

fetcher.post = async function (req, body, opt?: any) {
  return await fetcher(req, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...opt,
  })
}

fetcher.put = async function (req, body, opt) {
  return await fetcher(req, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...opt,
  })
}

fetcher.delete = async function (req, body, opt) {
  return await fetcher(req, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...opt,
  })
}

export default fetcher
