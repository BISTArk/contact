let vid;
let Data;
// const button = document.getElementById("mail");

function setup() {
  background(255, 0, 0);
  noCanvas();
  vid = createCapture(VIDEO);
  vid.size(360, 480);
  vid.hide();
}

async function send() {
  const lat = Data.coords.latitude;
  const lon = Data.coords.longitude;
  const mood = document.getElementById("mood").value;
  vid.loadPixels();
  const img64 = vid.canvas.toDataURL();
  console.log(mood);
  const pos = { lat, lon, mood, img64 };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pos),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);
}

async function maler() {
  const name = document.getElementById("nameid").value;
  const mail = document.getElementById("emailid").value;
  const sub = document.getElementById("subid").value;
  const body = document.getElementById("bodyid").value;
  const btn = document.getElementById("mail");

  const formdetails = { 
    name,mail,sub,body
  };
  console.log(formdetails);

  const moptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdetails),
  };
  const mresponse = await fetch("/mailapi", moptions);
  const mjson = await mresponse.json();
  if(mjson.status === 200){
    //msg sent response
    alert("Your Mail has been successfully sent");
  }else{
    //msg not sent response
    alert("Could not send mail");
  }
}

if (!navigator.geolocation) {
  status.textContent = "Geolocation is not supported by your browser";
} else {
  status.textContent = "Locating…";
  navigator.geolocation.getCurrentPosition(
    async (data) => {
      Data = data;
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;

      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;
    },
    (error) => console.log(error)
  );
}
