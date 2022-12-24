// http://www.wassilykandinsky.net/work-247.php
function regenerate(seed) {

  if (seed) {
    Math.seedrandom(seed)
  } else {
    Math.seedrandom()
  }

  var parameters = ''

  var addToParameters = function (param) {
    if (parameters.length !== 0) {
      parameters += "&";
    }
    parameters += param
  }

  var blendModeCircles = ['screen', 'overlay', 'darken', 'lighten', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  var blendModeBars = ['screen', 'overlay', 'lighten', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  var blendModeBackground = ['screen', 'overlay', 'darken', 'lighten', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  var randBlendModeCircles = blendModeCircles[Math.floor((blendModeCircles.length) * Math.random())]
  
  var randBlendModeBars = blendModeBars[Math.floor((blendModeBars.length) * Math.random())]
  var randBlendModeBackground = blendModeBackground[Math.floor((blendModeBackground.length) * Math.random())]

  var blendMode = ['screen', 'overlay', 'lighten', 'soft-light', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

  // var blendMode = ['screen', 'overlay', 'lighten', 'soft-light', 'hue', 'saturation', 'color'];
  var value = blendMode[Math.floor((blendMode.length) * Math.random())]

  addToParameters(value)

  randBlendModeBars = value
  randBlendModeCircle = value
  randBlendModeBackground = value

  console.log(randBlendModeBars)

  var N_X = 10
  var N_Y = 10
  
  var BACKGROUND_COLOR_1 = Snap.rgb(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()))
  var BACKGROUND_COLOR_2 = Snap.rgb(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()))
  var BACKGROUND_COLOR_3 = Snap.rgb(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()))
  
  var BIG_CIRCLE_STROKE_WIDTH = Math.random();
  var BIG_CIRCLE_RADIUS = Math.min(N_X / (4 * Math.random() + 1), N_X / 2.3);
  var BIG_CIRCLE_COLOR = Snap.rgb(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()))

  const nC = Math.floor(5 * Math.random());
  var N_CIRCLES = nC > 0 ? nC : 1;
  addToParameters(N_CIRCLES.toString())

  const nL = Math.floor(7 * Math.random());
  var N_LINES = nL > 3 ? nL : 3;
  addToParameters((N_LINES * 2).toString())

  const nB = Math.floor(5 * Math.random());
  var N_BARS = nB
  addToParameters(N_BARS.toString())

  var spaceDelta = 9.5 - 2*BIG_CIRCLE_RADIUS

  var X_CENTER = Math.random() > 0.5 ? true : false
  var Y_CENTER = Math.random() > 0.5 ? true : false

  var X = X_CENTER ? N_X/2 : Math.random()*((N_X / 2 + spaceDelta) - (N_X / 2 - spaceDelta) + (N_X / 2 - spaceDelta))
  var Y = Y_CENTER ? N_Y/2 : Math.random()*((N_X / 2 + spaceDelta) - (N_X / 2 - spaceDelta) + (N_X / 2 - spaceDelta))

  var drawBars = function (nBars) {
    var n_done = 0
    while (n_done < nBars) {
      var bar = s.rect(-N_X / 2, N_Y / 2, 2 * N_X, 2).attr({
        stroke: 'none',
        fill: chroma.random(),
        style: `mix-blend-mode: ${randBlendModeBars}`
      })
      bar.transform(
        Snap.format('r{angle},{x_center},{y_center}', {
          angle: 360 * Math.random(),
          x_center: N_X / 2,
          y_center: N_Y / 2
        })
      )
      n_done += 1
    }
  }

  var drawCircles = function (nCircles, maxRadius) {
    var n_done = 0
    while (n_done < nCircles) {
      var color = chroma.random().hex()
      var x = 2 + (N_X - 4) * Math.random()
      var y = 2 + (N_Y - 4) * Math.random()
      var r = Math.pow(2 * Math.random(), 1)
      var dx = (x - N_X / 2)
      var dy = (y - N_Y / 2)
      var dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      if ((dr + r) < maxRadius) {
        s.circle(x, y, r).attr({
          stroke: 'none',
          fill: color,
          style: `mix-blend-mode: ${randBlendModeCircle}`
        })
        n_done += 1
      }
    }

    // download(parameters);
  }

  var drawLines = function (nLines, length, baseWidth, jitterWidth, color) {
    var n_done = 0
    while (n_done < nLines) {
      var x1 = 2 + (N_X - 4) * Math.random()
      var y1 = 2 + (N_Y - 4) * Math.random()
      var x2 = 2 + (N_X - 4) * Math.random()
      var y2 = 2 + (N_Y - 4) * Math.random()
      var dx = x2 - x1
      var dy = y2 - y1
      var dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      if (dr < N_X / length) {
        var strokeWidth = baseWidth + jitterWidth * Math.random()
        s.line(x1, y1, x2, y2).attr({
          stroke: color,
          strokeWidth: strokeWidth
        })
        n_done += 1
      }
    }
  }

  var s = makeSVG(N_X, N_Y)

  var isBackground = Math.random() > 0.1 ? true : false

  addToParameters(isBackground.toString())

  var isGradient = Math.random() > 0.7 ? true : false

  addToParameters(isBackground ? isGradient.toString() : 'none')

  const gradientCombinations = ['l(0, 0, 1, 1)','l(1, 1, 1, 0)','l(0, 1, 1, 1)','l(0, 1, 1, 0)','r(0.5,0.5,1)']
  const gradientIndex = Math.floor(Math.random()*gradientCombinations.length)

  if (X_CENTER & Y_CENTER) {
    addToParameters(X_CENTER && Y_CENTER)
  } else {
    addToParameters(false)
  }

  var g = Snap("#canvas").gradient(`${gradientCombinations[gradientIndex]}${BACKGROUND_COLOR_1}-${BACKGROUND_COLOR_3}`);

  s.rect(0, 0).attr({
    stroke: Snap.rgb(0, 0, 0),
    fill: isBackground ? isGradient ? g : BACKGROUND_COLOR_1 : Snap.rgb(255, 255, 255),
    style: `mix-blend-mode: ${randBlendModeBackground}`,
    strokeWidth: 0.1,//`${Math.random()*3}`,
    width: N_X,
    height: N_Y
  })

  // draw big circle
  s.circle(X, Y, BIG_CIRCLE_RADIUS).attr({
    stroke: BIG_CIRCLE_COLOR,
    fill: 'none',
    strokeWidth: BIG_CIRCLE_STROKE_WIDTH
  })

  drawLines(N_LINES, 3, 0.005, 0.015, 'black')
  drawBars(N_BARS)
  drawLines(N_LINES, 2, 0.04, 0.09, 'black')
  drawCircles(N_CIRCLES, BIG_CIRCLE_RADIUS - BIG_CIRCLE_STROKE_WIDTH)

  download(parameters);
}
if (/headless/i.test(window.navigator.userAgent)) {
  console.log("headless browser detected");
  document.getElementById("non-image").style.visibility = "hidden";
}

// for (var i = 1; i < 400; i++) {
  regenerate(window.location.hash.toLowerCase())
// }

