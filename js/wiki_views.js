function shortDate(passedDate) {
    passedDate = passedDate.slice(0, 10).replace(/-/g, "")
    return passedDate
}

function wikiViews(searchpage) {
searchpage=searchpage.replace(/ /g,"_")
   
        var date = new Date(Date.now())
        var endDate = shortDate(date.toISOString())

        // change date to 1 month before on 1st day
        console.log(date)
        date.setMonth(date.getMonth() - 1);
        date.setDate(1);
        var startDate = shortDate(date.toISOString())

        console.log(startDate)
        var url = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/" + searchpage + "/monthly/" + startDate + "/" + endDate

        var views = $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                response = data;
            }
        }).done(function (response) {
            console.log(response);
            console.log(response.items[0].views); // <<< number of views of this page!
            document.getElementById(searchpage).innerHTML+=" wiki views:" + response.items[0].views+"<br>"
            var result = response.items[0].views
            return result

        })
    }
