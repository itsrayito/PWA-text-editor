const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

function showInstallPromotion() {
    console.log('showInstallPromotion');
};

function hideInstallPromotion() {
    console.log('hideInstallPromotion');
};

window.addEventListener('beforeinstallprompt', (e) => {
    // this is going to prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // this will stash the event so it can be triggered later.
    deferredPrompt = e;
    // this will optionally send analytics event that PWA install promo was shown
    console.log(`'beforeinstallprompt' event was fired.`);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('deferredPrompt', deferredPrompt)
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        deferredPrompt = null;
    }
}
});

window.addEventListener('appinstalled', () => {

    // this is going to hide the app-provided install promotion
    hideInstallPromotion();

    // this will clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;

    // this will optionally send analytics event to indicate a succesful install
    console.log('PWA was installed!');
});