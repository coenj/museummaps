function shortDate(passedDate) {
    passedDate = passedDate.slice(0, 10).replace(/-/g, "")
    return passedDate
}

function wikiViews(pageName, searchpage) {
    searchpage = searchpage.replace(/The /g, "")
    searchpage = searchpage.replace(/Le /g, "")

    var date = new Date(Date.now())
    var endDate = shortDate(date.toISOString())

    mContent += '<div class=place id=' + searchpage + '><div class=place-name><a href=https://en.wikipedia.org/wiki/' + searchpage + '>' + pageName + '"</a></div></div>'


    document.getElementById('museum-review').innerHTML += mContent;

    // change date to 1 month before on 1st day
    console.log(date)
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);
    var startDate = shortDate(date.toISOString())

    console.log(startDate)
    var url = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/" + searchpage + "/monthly/" + startDate + "/" + endDate
    // get the number of views the page has on wikipedia
    var views = $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            response = data;
        }
    }).done(function (response) {
        document.getElementById(searchpage).innerHTML += '<div class=place-viewbox style="background-color: rgb(0,25,' + Math.floor(response.items[0].views / 100) + ')"><div class=place-views>' + Math.floor(response.items[0].views / 100) + '</div></div>'

        var result = response.items[0].views
        return result

    })
}
