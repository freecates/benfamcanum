<script>
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success_handler, error_handler, {enableHighAccuracy:true});
    function success_handler(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        accuracy = position.coords.accuracy;
        console.log(JSON.stringify(latitude + ',' + longitude))
        return JSON.stringify(latitude + ',' + longitude)
    }

    function error_handler() {
        alert("Code: " + error.message);
    }
}
</script>