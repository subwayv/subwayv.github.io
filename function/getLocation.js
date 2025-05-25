function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("该浏览器不支持获取地理位置。");
    }
}

function showPosition(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    viewer.camera.setView({ destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 1000) });
    viewer.entities.removeAll();
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
        point: {
            pixelSize: 10,
            color: Cesium.Color.fromCssColorString('#ff0000'),
            outlineColor: Cesium.Color.fromCssColorString('#ff0000'),
            outlineWidth: 2,
            show: true
        }
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("用户拒绝对获取地理位置的请求。");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("位置信息是不可用的。");
            break;
        case error.TIMEOUT:
            console.log("请求用户地理位置超时。");
            break;
        case error.UNKNOWN_ERROR:
            console.log("未知错误。");
            break;
    }
}