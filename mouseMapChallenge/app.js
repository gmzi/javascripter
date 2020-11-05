const body = document.querySelector("body");
body.addEventListener("mousemove", function (e) {
  let width = Math.round((e.pageX * 255) / window.innerWidth);
  let height = Math.round((e.pageY * 255) / window.innerHeight);
  let diagonal = Math.round(width + height / 255);
  let r = 255 - diagonal;
  let g = width - height;
  let b = Math.round(0 + width + (0 + height) - diagonal);

  if (g < 0) {
    g = g - g * 2;
    b = width;
  }

  let color = `rgb(${r}, ${g}, ${b})`;
  body.style.backgroundColor = color;
  console.log(color);
  console.log(`width ${width}`);
  console.log(`height ${height}`);
  console.log(`diagonal ${diagonal}`);
});
