//2.
$('article img').addClass('.image-center');

//3.
const $lastP = $('p').eq(length - 1);
$lastP.remove();

//4.
$('h1').css('font-size', Math.floor(Math.random() * 101) + 1);

//5.
$('ol').append("<li>I'm here to bite someone's nose</li>");

//6.
function replaceAside() {
  $('ol')
    .parent()
    .append('p')
    .text(
      'Sorry for the inconveniencies the silly list has been removed and will apologize soon.'
    );
}
replaceAside();

//7.

function changeColor(code) {
  $('body').css('background-color', code);
}

$('.mb-5').on('change', function (f) {
  let $color1 = parseInt($('input').eq(0).val());
  let $color2 = parseInt($('input').eq(1).val());
  let $color3 = parseInt($('input').eq(2).val());
  let code = `rgb(${$color1},${$color2},${$color3})`;
  changeColor(code);
});

//8.
$('img').on('click', function () {
  $(this).fadeOut(800, function () {
    $(this).remove();
  });
});
