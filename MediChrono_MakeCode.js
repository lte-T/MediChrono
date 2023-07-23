input.onSwitchMoved(SwitchDirection.Right, function () {
    timerStarted = false
    light.showAnimation(light.cometAnimation, 500)
    light.clear()
    isEditing = true
    displayTime(colors[idx])
})
input.onSwitchMoved(SwitchDirection.Left, function () {
    idx = 0
    light.showAnimation(light.rainbowAnimation, 500)
    light.clear()
    timerStarted = false
    isEditing = false
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (isEditing) {
        times[idx] = (times[idx] + 1) % 11
        displayTime(colors[idx])
    } else if (!(isEditing) && !(timerStarted)) {
        timerStarted = true
        startTimer()
    }
})
function startTimer () {
    for (let i = 0; i < times[idx] * 3600; i++) {
        if (timerStarted) {
            light.showAnimation(light.colorWipeAnimation, 1000)
        }
    }
    if (timerStarted) {
        for (let i = 0; i < 4; i++) {
            music.baDing.play()
            if (idx == 0) {
                light.showRing(
                `red black red black red black red black red black`
                )
            } else if (idx == 1) {
                light.showRing(
                `green black green black green black green black green black`
                )
            } else if (idx == 2) {
                light.showRing(
                `blue black blue black blue black blue black blue black`
                )
            }
            pause(500)
            light.clear()
            pause(100)
        }
    }
    light.clear()
    timerStarted = false
    idx = (idx + 1) % 3
}
function displayTime (text: string) {
    light.clear()
    if (text == "Red") {
        for (let k = 0; k <= times[idx] - 1; k++) {
            light.setPixelColor(k, 0xff0000)
        }
    } else if (text == "Green") {
        for (let l = 0; l <= times[idx] - 1; l++) {
            light.setPixelColor(l, 0x00ff00)
        }
    } else if (text == "Blue") {
        for (let m = 0; m <= times[idx] - 1; m++) {
            light.setPixelColor(m, 0x0000ff)
        }
    }
}
input.buttonB.onEvent(ButtonEvent.Click, function () {
    if (isEditing) {
        idx = (idx + 1) % 3
        displayTime(colors[idx])
    } else {
        if (timerStarted) {
            timerStarted = false
        }
    }
})
let idx = 0
let timerStarted = false
let isEditing = false
let colors: string[] = []
let times: number[] = []
times = [1, 1, 1]
colors = ["Red", "Green", "Blue"]
if (input.switchRight()) {
    isEditing = true
    timerStarted = false
    light.showAnimation(light.cometAnimation, 500)
    light.clear()
    displayTime(colors[idx])
} else {
    idx = 0
    timerStarted = false
    isEditing = false
    light.showAnimation(light.rainbowAnimation, 500)
    light.clear()
}
