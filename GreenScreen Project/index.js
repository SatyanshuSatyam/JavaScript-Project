// DOM Elements
const videoElement = document.getElementById("v1")
const canvas1 = document.getElementById("c1")
const canvas2 = document.getElementById("c2")
const c1 = canvas1.getContext("2d")
const c2 = canvas2.getContext("2d")

// Control Elements
const hueRangeSlider = document.getElementById("hueRange")
const satThresholdSlider = document.getElementById("satThreshold")
const lightThresholdSlider = document.getElementById("lightThreshold")
const hueRangeValue = document.getElementById("hueRangeValue")
const satThresholdValue = document.getElementById("satThresholdValue")
const lightThresholdValue = document.getElementById("lightThresholdValue")
const uploadImageBtn = document.getElementById("uploadImageBtn")
const uploadVideoBtn = document.getElementById("uploadVideoBtn")
const imageInput = document.getElementById("imageInput")
const videoInput = document.getElementById("videoInput")
const presetButtons = document.querySelectorAll(".preset-btn")
const effectButtons = document.querySelectorAll(".effect-btn")
const colorButtons = document.querySelectorAll(".color-btn")

// Configuration
const config = {
  hueRange: Number.parseInt(hueRangeSlider.value),
  satThreshold: Number.parseInt(satThresholdSlider.value),
  lightThreshold: Number.parseInt(lightThresholdSlider.value),
  screenColor: "green",
  effect: "none",
}

// Background image/video
let backgroundImage = new Image()
const backgroundVideo = document.createElement("video")
let useVideoBackground = false

// Default background
backgroundImage.src = "/placeholder.svg?height=400&width=600"
backgroundImage.onload = () => {
  // Draw initial background
  drawBackground()
}

// Set canvas dimensions
function setCanvasDimensions() {
  const width = videoElement.videoWidth || 640
  const height = videoElement.videoHeight || 480

  canvas1.width = width
  canvas1.height = height
  canvas2.width = width
  canvas2.height = height
}

// Initialize webcam
async function initWebcam() {
  try {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    videoElement.srcObject = stream

    // Wait for video to be loaded
    videoElement.onloadedmetadata = () => {
      setCanvasDimensions()
    }

    // Start processing when video plays
    videoElement.onplay = () => {
      setInterval(computeFrame, 1000 / 30) // 30 fps
    }
  } catch (error) {
    console.error("Error accessing webcam:", error)
    alert("Error accessing webcam. Please make sure you have a webcam connected and have granted permission to use it.")
  }
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Check if a pixel is part of the screen color
function isScreenColor(h, s, l) {
  switch (config.screenColor) {
    case "green":
      return (
        h >= 60 - config.hueRange &&
        h <= 180 + config.hueRange &&
        s >= config.satThreshold &&
        l >= config.lightThreshold
      )
    case "blue":
      return (
        h >= 180 - config.hueRange &&
        h <= 260 + config.hueRange &&
        s >= config.satThreshold &&
        l >= config.lightThreshold
      )
    case "red":
      return (
        ((h >= 330 - config.hueRange && h <= 360) || (h >= 0 && h <= 30 + config.hueRange)) &&
        s >= config.satThreshold &&
        l >= config.lightThreshold
      )
    default:
      return false
  }
}

// Apply effects to pixels
function applyEffect(pixels) {
  const data = pixels.data
  const length = data.length

  switch (config.effect) {
    case "grayscale":
      for (let i = 0; i < length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg
        data[i + 1] = avg
        data[i + 2] = avg
      }
      break
    case "sepia":
      for (let i = 0; i < length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
      }
      break
    case "invert":
      for (let i = 0; i < length; i += 4) {
        data[i] = 255 - data[i]
        data[i + 1] = 255 - data[i + 1]
        data[i + 2] = 255 - data[i + 2]
      }
      break
    case "brightness":
      for (let i = 0; i < length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.2)
        data[i + 1] = Math.min(255, data[i + 1] * 1.2)
        data[i + 2] = Math.min(255, data[i + 2] * 1.2)
      }
      break
  }

  return pixels
}

// Draw background to canvas2
function drawBackground() {
  if (useVideoBackground && backgroundVideo.readyState >= 3) {
    c2.drawImage(backgroundVideo, 0, 0, canvas2.width, canvas2.height)
  } else {
    c2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height)
  }
}

// Process video frame
function computeFrame() {
  if (!videoElement.paused && !videoElement.ended) {
    // Draw the video frame to canvas1
    c1.drawImage(videoElement, 0, 0, canvas1.width, canvas1.height)

    // Get the image data from canvas1
    const frame = c1.getImageData(0, 0, canvas1.width, canvas1.height)
    const pixels = frame.data

    // Process each pixel
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]

      // Convert RGB to HSL
      const [h, s, l] = rgbToHsl(r, g, b)

      // If the pixel is part of the screen color, make it transparent
      if (isScreenColor(h, s, l)) {
        pixels[i + 3] = 0 // Set alpha to 0 (transparent)
      }
    }

    // Apply effects if selected
    if (config.effect !== "none") {
      applyEffect(frame)
    }

    // Put the processed image data back to canvas1
    c1.putImageData(frame, 0, 0)

    // Draw background to canvas2
    drawBackground()

    // Draw the processed video (with transparent green pixels) on top of the background
    c2.drawImage(canvas1, 0, 0)
  }
}

// Create preset backgrounds
function createPresetBackground(type) {
  useVideoBackground = false

  switch (type) {
    case "beach":
      backgroundImage = new Image()
      backgroundImage.src =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODdDRUVCO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSI2NSUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwRTc0QTc7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkQzOTQ7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIvPjxjaXJjbGUgY3g9IjUwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI0ZGRDcwMCIvPjwvc3ZnPg=="
      break
    case "space":
      backgroundImage = new Image()
      backgroundImage.src =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzQ1NDU4RTtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAxNDtzdG9wLW9wYWNpdHk6MSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHg9IjAiIHk9IjAiIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIi8+PC9zdmc+"
      for (let i = 0; i < 100; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        const x = Math.random() * 600
        const y = Math.random() * 400
        const r = Math.random() * 1.5
        star.setAttribute("cx", x)
        star.setAttribute("cy", y)
        star.setAttribute("r", r)
        star.setAttribute("fill", "white")
      }
      break
    case "city":
      backgroundImage = new Image()
      backgroundImage.src =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjkyOTI5O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiLz48cGF0aCBkPSJNMCAyNTAgTDUwIDI1MCBMNTAgMTUwIEw3NSAxNTAgTDc1IDI1MCBMMTAwIDI1MCBMMTAwIDIwMCBMMTI1IDIwMCBMMTI1IDI1MCBMMTUwIDI1MCBMMTUwIDE3NSBMMTc1IDE3NSBMMTc1IDI1MCBMMjAwIDI1MCBMMjAwIDIyNSBMMjI1IDIyNSBMMjI1IDI1MCBMMjUwIDI1MCBMMjUwIDE1MCBMMjc1IDE1MCBMMjc1IDI1MCBMMzAwIDI1MCBMMzAwIDIwMCBMMzI1IDIwMCBMMzI1IDI1MCBMMzUwIDI1MCBMMzUwIDE3NSBMMzc1IDE3NSBMMzc1IDI1MCBMNDAwIDI1MCBMNDAwIDIyNSBMNDI1IDIyNSBMNDI1IDI1MCBMNDUwIDI1MCBMNDUwIDE1MCBMNDc1IDE1MCBMNDc1IDI1MCBMNTAwIDI1MCBMNTAwIDIwMCBMNTI1IDIwMCBMNTI1IDI1MCBMNTUwIDI1MCBMNTUwIDE3NSBMNTc1IDE3NSBMNTc1IDI1MCBMNjAwIDI1MCBMNjAwIDQwMCBMMCA0MDAgWiIgZmlsbD0iIzEzMTMxMyIvPjwvc3ZnPg=="
      break
  }
}

// Event Listeners
hueRangeSlider.addEventListener("input", function () {
  config.hueRange = Number.parseInt(this.value)
  hueRangeValue.textContent = this.value
})

satThresholdSlider.addEventListener("input", function () {
  config.satThreshold = Number.parseInt(this.value)
  satThresholdValue.textContent = this.value
})

lightThresholdSlider.addEventListener("input", function () {
  config.lightThreshold = Number.parseInt(this.value)
  lightThresholdValue.textContent = this.value
})

uploadImageBtn.addEventListener("click", () => {
  imageInput.click()
})

imageInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      backgroundImage = new Image()
      backgroundImage.src = event.target.result
      useVideoBackground = false
    }

    reader.readAsDataURL(file)
  }
})

uploadVideoBtn.addEventListener("click", () => {
  videoInput.click()
})

videoInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)

    backgroundVideo.src = url
    backgroundVideo.loop = true
    backgroundVideo.muted = true
    backgroundVideo.play()
    useVideoBackground = true
  }
})

presetButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const bgType = this.getAttribute("data-bg")
    createPresetBackground(bgType)
  })
})

effectButtons.forEach((button) => {
  button.addEventListener("click", function () {
    effectButtons.forEach((btn) => btn.classList.remove("active"))
    this.classList.add("active")
    config.effect = this.getAttribute("data-effect")
  })
})

colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    colorButtons.forEach((btn) => btn.classList.remove("active"))
    this.classList.add("active")
    config.screenColor = this.getAttribute("data-color")
  })
})

// Initialize the app
window.addEventListener("load", () => {
  // Set initial values for sliders
  hueRangeValue.textContent = hueRangeSlider.value
  satThresholdValue.textContent = satThresholdSlider.value
  lightThresholdValue.textContent = lightThresholdSlider.value

  // Initialize webcam
  initWebcam()

  // Set first effect button as active
  effectButtons[0].classList.add("active")
})

