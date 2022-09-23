const API =
  "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLPUygacvheSOr2i89LQIYXUljJh9YegFC&part=snippet&maxResults=10";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17b0f8d731mshef4c67f560bc6e7p149070jsn87af4fe74257",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    console.log(videos);
    let view = `
    ${videos.items
      .map(
        (video) => `
      <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}" target="_blank">
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md
          overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full"/>
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
      </a>
    `
      )
      .slice(0, 8)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();

fetchData(API);
