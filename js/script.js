/*
$.ajax({
    dataType: "json",
    url: quoteUrl,
    data: null,
    success: createTweet
});
=> to jest to samo, co pierwsze trzy linijki kodu
*/
var tweeterLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    $.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
	var data = input[0];
	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
	if (tweetText.length > 240) {
	    getQuote();
	} else {
	    var tweet = tweeterLink + encodeURIComponent(tweetText);
	    $('.quote').text(quoteText);
	    $('.author').text("Author: " + quoteAuthor);
	    $('.tweet').attr('href', tweet);
	}
	$('.tweet').attr('href', tweet);

}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});
