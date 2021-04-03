jQuery( function( $ ) {

    $('#btnPrint').on( 'click', function( e ) {
        e.preventDefault();
        printJS( 'content', 'html');
    });

    function fetchReport( code ) {
        code = code.toLowerCase();
        var url = "https://606810e298f405001728f3f5.mockapi.io/" + code;

        $.ajax({
            method: 'GET',
            url: url,
            dataType: "json"
        }).done( function( data ) {
            var errorMsg = '<h1>' + data.data + '</h1>'
            $('#content').html( errorMsg );
        }).fail(function( error ) {
            var errorMsg = error.responseText.replace('/"/g', '');
            errorMsg = '<h1>' + errorMsg + '</h1>'
            $('#content').html( errorMsg );
        });
    }

    onScan.attachTo(
        document,
        {
            scanButtonKeyCode      : false,
            scanButtonLongPressTime: 500,
            timeBeforeScanTest     : 100,
            avgTimeByChar          : 30,
            minLength              : 0,
            suffixKeyCodes         : [9,13],
            prefixKeyCodes         : [],
            ignoreIfFocusOn        : false,
            stopPropagation        : false,
            preventDefault         : false,
            reactToKeydown         : true,
            reactToPaste           : true,
            singleScanQty          : 0,
            reactToKeyDown         : true,

            onScan: function( code, qty ) {
                console.log( "Code = " + code );
                console.log( "Quantity = " + qty );
                fetchReport(code);
            },
        }
    )
});
