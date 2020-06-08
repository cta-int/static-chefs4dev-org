function printFunction(url) {
    var mywindow = window.open(url, 'PRINT', 'height=400,width=600');

    mywindow.window.onload = function() {
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
    };

    return false;
}