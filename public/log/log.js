async function veiwlog() {
  const data = await fetch("/api");
  const json = await data.json();

  for (i of json) {
    const root = document.createElement("div");
    const mood = document.createElement("div");
    const loc = document.createElement("div");
    const img = document.createElement("img");
    root.append(mood, loc, img);

    mood.textContent = `Mood : ${i.mood}`;
    loc.textContent = `location: lat=${i.lat} lon=${i.lon}`;
    img.src = i.img64;

    document.body.append(root);
  }

  console.log(json);
}
