if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/sw.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
            console.error("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.warn("ServiceWorker belum didukung browser ini.");
}