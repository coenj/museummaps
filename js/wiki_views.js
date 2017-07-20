function shortDate(passedDate) {
    passedDate = passedDate.slice(0, 10).replace(/-/g, "")
    return passedDate
}

function wikiViews(pageName, searchPage) {
    // ask mediawiki api for the views of 1 month ago
    var date = new Date(Date.now())
    var endDate = shortDate(date.toISOString())
    var viewBox, url, startDate

    //wikipedia does not want The Le La in the title
    searchPage = searchPage.replace(/The_|Le_|La_/g, "")

    // change date to 1 month before on 1st day
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);
    startDate = shortDate(date.toISOString())
    url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/${searchPage}/monthly/${startDate}/${endDate}`

    // get the number of views the page has on wikipedia
    var views = $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            response = data;
        }
    }).done(function (response) {
        // get the response pageviews from wikipedia and output them to the DOM
        var viewScore =Math.floor(response.items[0].views / 100)
        var viewColor=`style="background-color: rgb(0,25,${viewScore})"`
        viewBox = `<div class=place-viewbox ${viewColor}><div class=place-views>${viewScore}</div></div>`
        content = `<div class=place id=${searchPage}><div class=place-name><a href=https://en.wikipedia.org/wiki/${searchPage}>${pageName}</a></div>${viewBox}</div>`
        document.getElementById('top-container').innerHTML += content;
        
        return viewScore

    }).fail(function () {
        // if the page is unknown put it in the bottom container in the DOM
        viewBox = '<div class=place-viewbox style="background-color: rgb(125,125,125)"><div class=place-views>-</div></div>'
        content = `<div class=place id=${searchPage}><div class=place-name><a 5href=https://en.wikipedia.org/wiki/${searchPage}>${pageName}</a></div>${viewBox}</div>`
        document.getElementById('bottom-container').innerHTML += content;
        return -1
    })
}
