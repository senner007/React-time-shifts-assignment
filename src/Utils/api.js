const mainUrl = "http://localhost:5000/";

export async function getData(url) {
    console.log(mainUrl + url)
  return await (await fetch(mainUrl + url)).json();
}

export async function postData(url = "", data = {}) {
  const response = await fetch(mainUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
