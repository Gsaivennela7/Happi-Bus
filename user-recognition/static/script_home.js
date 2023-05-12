function show() {
    showLoader();
    window.location.href = ('/submit?busNumber=' + document.getElementById('busNumber').value);
}

async function showLoader(){
    $('#exampleModal').modal();
}