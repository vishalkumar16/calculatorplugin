
/*
Input Params: None
Description: This loads the from and to currencies in the drop down
             menu on page load
*/
$(function () {
    $.get('https://free.currencyconverterapi.com/api/v5/currencies', function (data) {
        var response = data.results;
        var options = '<option value="-1">Select Currency</option>';
        $.each(response, function (i, d) {
            options += '<option value="' + d.id + '">' + d.currencyName + '</option>';
        });
        $("select#from").html(options);
        $("select#to").html(options);
    });

});

/*
Input Params: None
Description: This makes the button click function ready and internally calls
             validate method to validate the input by the user 
*/
$(function () {
    $("#convertBtn").click(function () {

        fromCurrency = $('select#from').val();
        toCurrency = $('select#to').val();
        validateInputValues(fromCurrency, toCurrency);

    });
});

/*
Input Params: from Currency -> Base Currency
              to Currency -> Currency to be converted to
Description: This method validates the input by the user and then on no
             errors, calls an API to fetch the conversion rate.
*/
function validateInputValues(fromCurrency, toCurrency) {

    //If user has failed to select any of the currencies, an error is shown
    if (fromCurrency == -1 || toCurrency == -1) {
        $("#result").html("Please select a valid currency");
        return;
    }

    //if both from and to currencies are same, an error is shown
    if (fromCurrency == toCurrency) {
        $("#result").html("You cannot check the conversion rate for same currency");
        return;
    }

    //if both validations are passed, function is called to fetch the result
    getCoversionRate(fromCurrency, toCurrency);

}

/*
Input Params: from Currency -> Base Currency
              to Currency -> Currency to be converted to
Description: This method calls the API to fetch the currency conversion rate.
*/
function getCoversionRate(fromCurrency, toCurrency) {
    var queryParam = fromCurrency + '_' + toCurrency;
    $.get('http://free.currencyconverterapi.com/api/v5/convert?q=' + queryParam + '&compact=y', function (data) {
        $("#result").html(data[queryParam].val);
    });
}