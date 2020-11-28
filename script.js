const colors = ['#009688', '#00BCD4', '#3F51B5', '#673AB7', '#9C27B0', '#DB4437', '#FF9800', '#00BCD4', '#00FA9A'];

let lang = 'en';
let forismaticUrl = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=${lang}&format=jsonp&jsonp=?`;

$(document).ready(() => {
  $.getJSON(forismaticUrl)
    .done(update).fail(handleErr);

  $('#newquote').click(() => {
    $.getJSON(forismaticUrl)
      .done(update).fail(handleErr);
  });

  $('#set a').click(() => {
    if (lang == 'en') {
      lang = 'ru';
      $('#set a').text('ENG');
    }
    else {
      lang = 'en';
      $('#set a').text('RUS');
    }
  
    $.getJSON(forismaticUrl)
      .done(update).fail(handleErr);
  });
});

const update = (quote) => {
  const quoteText = JSON.stringify(quote.quoteText);
  const quoteAuthor = JSON.stringify(quote.quoteAuthor);
  
  $('body').css('background-color', colors[Math.round(Math.random() * 8) + 1]);
  $('#thetarget').html(quoteText);
  $('#quote h5').html(`- <a href='https://www.google.com/search?q=${quoteAuthor.replace('"', '').replace('"', '')}' target='_blank'>${quoteAuthor.replace('"', '').replace('"', '')}</a>`);

  /*$('#tweet').html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=' + JSON.stringify(quote.quoteText) + ' -' + JSON.stringify(quote.quoteAuthor) +'" data-size="large"></a>');
    $('#tweet').html(
      '<a class=\"twitter-share-button\" href=\"https://twitter.com/intent/tweet?text=' + JSON.stringify(quote.quoteText) + '\" data-size=\"large\"></a>'
    );*/
  let message = `${quoteText}   -  ${quoteAuthor}`;
  $('#tweet').html(
    `<a class='twitter-share-button' href='https://twitter.com/intent/tweet?text=${message} data-size='large'></a>`
  );

}

const handleErr = (jqxhr, textStatus, err) => {
  console.log(`Request Failed: ${textStatus}, ${err}`);
}