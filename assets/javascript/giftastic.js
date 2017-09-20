var gifObj = {
    htmlDisplayResponses: $("#displayResponses"),
    htmlDisplayButtons: $("#displayButtons"),
    htmlSearchField: $("#searchField"),
    htmlSearchButton: $("#searchButton"),
    dataGrab: "",
    rating: "g",
    imgSrc: "",
    buttonList: ["China", "France", "Ireland", "Israel", "Italy", "Japan", "Russia", "Spain", "United States"],

    makeButton: function() {
        var newButton = $("<button>");
        newButton.addClass("btn-primary dynamicButton");
        newButton.append(gifObj.htmlSearchField.val().trim());
        gifObj.htmlDisplayButtons.append(newButton);
    },

    makeDefaultButtons: function() {
        gifObj.buttonList.forEach(function(key, value) {
            var newButton = $("<button>");
            newButton.addClass("btn-primary dynamicButton");
            newButton.append(key);
            gifObj.htmlDisplayButtons.append(newButton);
        });
    },

    makeFrames: function() {
        gifObj.htmlDisplayResponses.empty();
        gifObj.dataGrab.data.forEach(function(key, value) {
            gifObj.imgSrc = key.images.fixed_width_still.url;
            var newFrame = $("<div>");
            newFrame.addClass("dynamicFrame");
            var newImg = $("<img>");
            newImg.attr("src", key.images.fixed_width_still.url);
            newImg.attr("datastill", key.images.fixed_width_still.url);
            newImg.attr("dataanimated", key.images.fixed_width.url);
            newImg.addClass("dynamicImage");
            console.log(newImg.attr("datastill"));
            newFrame.append(newImg);
            newFrame.append("<p class='dynamicTag'>Rating: " + key.rating + "</p>");
            gifObj.htmlDisplayResponses.append(newFrame);

        });
    },

    requestGifData: function(query) {
        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + query + "&rating=pg-13&api_key=323e843db3b04db1a3e2a8e99e0c48e9&limit=12");
        xhr.done(function(data) {
            gifObj.dataGrab = data;
            console.log(gifObj.dataGrab);
            gifObj.makeFrames();
        });
    },
};


$(document).ready(function() {
    gifObj.makeDefaultButtons();
});

//Event handlers
$("#searchButton").on("click", function() {
    gifObj.makeButton();
});


$(document).on("click", ".dynamicButton", function() {
    gifObj.requestGifData($(this).text());
});

$(document).on("click", ".dynamicImage", function() {
    console.log(this.src);
    if ($(this).attr("src") === $(this).attr("datastill")) {
        $(this).attr("src", $(this).attr("dataanimated"));
    } else {
        $(this).attr("src", $(this).attr("datastill"));
    };
});
