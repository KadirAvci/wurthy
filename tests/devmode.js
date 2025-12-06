const waConfig = JSON.parse(localStorage.getItem("wa-config"));
console.log(waConfig);

const newWaConfig = { ...waConfig, devmode: true, modes: { ...waConfig.modes, devName: "kadir", dev: true } };
console.log(newWaConfig);

localStorage.setItem("wa-config", JSON.stringify(newWaConfig));

const item = {
    "modes": {
        "dev": false,
        "debug": false,
        "devName": "kadir"
    },
    "devmode": true
}
