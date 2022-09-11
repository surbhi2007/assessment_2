const scaling = 10000;
window.onload = () => {
  fetch(
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"
  )
    .then((response) => response.json())
    .then((globalData) => {
      const data = globalData["Global Quote"];
      const formattedData = {
        low: data["04. low"],
        high: data["03. high"],
        open: data["02. open"],
        prevClose: data["08. previous close"],
      };
      const maximum = data["03. high"];
      const c = document.getElementById("canvas");
      const ctx = c.getContext("2d");
      ctx.beginPath();
      let i = 0;
      for (let key in formattedData) {
        lasty = scaling - Math.floor((formattedData[key] / maximum) * scaling);
        lastx = Math.floor(200 / 4) * i;
        i === 0 && ctx.moveTo(lastx, lasty);
        ctx.lineTo(lastx, lasty);
        ctx.fillText(formattedData[key]+' '+ key, lastx + 15, lasty + 10);
        i++
      }
      ctx.stroke();
    })
    .catch((error) => {
      console.log(error);
    });
};
