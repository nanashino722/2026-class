var blueNext = 1;
var redNext = 1;
var greenNext = 1;
var TOTAL_CIRCLES = 5;
var CIRCLE_SIZE_MIN = 160;
var CIRCLE_SIZE_RANGE = 41;
var gameStartTime = 0;
var mistakeCount = 0;
var score = 0;
var placedCircles = [];
var movingCircles = [];
var animationId = null;
var loadedHighScore = localStorage.getItem("clickNumberHighScore");
var highScore = loadedHighScore !== null ? parseInt(loadedHighScore, 10) : null;
if (highScore !== null && isNaN(highScore)) {
    highScore = null;
}

// スタート画面を表示
function showStartScreen() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    movingCircles = [];

    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("clearScreen").classList.remove("show");
    document.getElementById("main").innerHTML = "";
}

// ゲームを開始
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    gameStartTime = Date.now();
    mistakeCount = 0;
    countdown(3);
}

// カウントダウン
function countdown(count) {
    var countdownElm = document.getElementById("countdown");
    countdownElm.classList.add("show");

    if (count > 0) {
        countdownElm.innerHTML = count;
        setTimeout(function () {
            countdown(count - 1);
        }, 1000);
    } else {
        countdownElm.classList.remove("show");
        displayCircles();
    }
}

// 円を表示
function displayCircles() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    placedCircles = [];
    movingCircles = [];

    // 青色の円を表示
    for (var num = TOTAL_CIRCLES; num > 0; num--) {
        var elm = document.createElement("button");
        elm.innerHTML = num;
        elm.setAttribute("id", "blue-" + num);
        elm.setAttribute("class", "circle circle-blue");
        var function_name = "removeBlue(" + num + ")"
        elm.setAttribute("onclick", function_name);
        document.getElementById("main").appendChild(elm);


        var circleSize = CIRCLE_SIZE_MIN + Math.floor(Math.random() * CIRCLE_SIZE_RANGE);

        // ランダムな位置を生成（衝突がない位置を見つけるまで試行）
        var left_pos, top_pos, isValid;
        var attempts = 0;
        do {
            left_pos = Math.floor(Math.random() * (windowWidth - circleSize));
            top_pos = Math.floor(Math.random() * (windowHeight - circleSize));

            isValid = true;
            // 既に配置された円との重なりをチェック
            for (var i = 0; i < placedCircles.length; i++) {
                if (isOverlapping(left_pos + circleSize / 2, top_pos + circleSize / 2, circleSize,
                    placedCircles[i].x, placedCircles[i].y, placedCircles[i].size)) {
                    isValid = false;
                    break;
                }
            }
            attempts++;
        } while (!isValid && attempts < 50);

        document.getElementById("blue-" + num).style.left = "" + left_pos + "px";
        document.getElementById("blue-" + num).style.top = "" + top_pos + "px";
        document.getElementById("blue-" + num).style.width = "" + circleSize + "px";
        document.getElementById("blue-" + num).style.height = "" + circleSize + "px";
        document.getElementById("blue-" + num).style.borderRadius = "50%";
        document.getElementById("blue-" + num).style.fontSize = Math.max(18, Math.round(circleSize * 0.25)) + "px";

        placedCircles.push({ x: left_pos + circleSize / 2, y: top_pos + circleSize / 2, size: circleSize });
        addMovingCircle(elm, "blue-" + num, circleSize, left_pos, top_pos);
    }

    // 赤色の円を表示
    for (var num = TOTAL_CIRCLES; num > 0; num--) {
        var elm = document.createElement("button");
        elm.innerHTML = num;
        elm.setAttribute("id", "red-" + num);
        elm.setAttribute("class", "circle circle-red");
        var function_name = "removeRed(" + num + ")"
        elm.setAttribute("onclick", function_name);
        document.getElementById("main").appendChild(elm);

        // 円のサイズをランダムに決定（下限引き上げ）
        var circleSize = CIRCLE_SIZE_MIN + Math.floor(Math.random() * CIRCLE_SIZE_RANGE);

        // ランダムな位置を生成（衝突がない位置を見つけるまで試行）
        var left_pos, top_pos, isValid;
        var attempts = 0;
        do {
            left_pos = Math.floor(Math.random() * (windowWidth - circleSize));
            top_pos = Math.floor(Math.random() * (windowHeight - circleSize));

            isValid = true;
            // 既に配置された円との重なりをチェック
            for (var i = 0; i < placedCircles.length; i++) {
                if (isOverlapping(left_pos + circleSize / 2, top_pos + circleSize / 2, circleSize,
                    placedCircles[i].x, placedCircles[i].y, placedCircles[i].size)) {
                    isValid = false;
                    break;
                }
            }
            attempts++;
        } while (!isValid && attempts < 50);

        document.getElementById("red-" + num).style.left = "" + left_pos + "px";
        document.getElementById("red-" + num).style.top = "" + top_pos + "px";
        document.getElementById("red-" + num).style.width = "" + circleSize + "px";
        document.getElementById("red-" + num).style.height = "" + circleSize + "px";
        document.getElementById("red-" + num).style.borderRadius = "50%";
        document.getElementById("red-" + num).style.fontSize = Math.max(18, Math.round(circleSize * 0.25)) + "px";

        placedCircles.push({ x: left_pos + circleSize / 2, y: top_pos + circleSize / 2, size: circleSize });
        addMovingCircle(elm, "red-" + num, circleSize, left_pos, top_pos);
    }

    // 緑色の円を表示
    for (var num = TOTAL_CIRCLES; num > 0; num--) {
        var elm = document.createElement("button");
        elm.innerHTML = num;
        elm.setAttribute("id", "green-" + num);
        elm.setAttribute("class", "circle circle-green");
        var function_name = "removeGreen(" + num + ")"
        elm.setAttribute("onclick", function_name);
        document.getElementById("main").appendChild(elm);


        var circleSize = CIRCLE_SIZE_MIN + Math.floor(Math.random() * CIRCLE_SIZE_RANGE);

        // ランダムな位置を生成（衝突がない位置を見つけるまで試行）
        var left_pos, top_pos, isValid;
        var attempts = 0;
        do {
            left_pos = Math.floor(Math.random() * (windowWidth - circleSize));
            top_pos = Math.floor(Math.random() * (windowHeight - circleSize));

            isValid = true;
            // 既に配置された円との重なりをチェック
            for (var i = 0; i < placedCircles.length; i++) {
                if (isOverlapping(left_pos + circleSize / 2, top_pos + circleSize / 2, circleSize,
                    placedCircles[i].x, placedCircles[i].y, placedCircles[i].size)) {
                    isValid = false;
                    break;
                }
            }
            attempts++;
        } while (!isValid && attempts < 50);

        document.getElementById("green-" + num).style.left = "" + left_pos + "px";
        document.getElementById("green-" + num).style.top = "" + top_pos + "px";
        document.getElementById("green-" + num).style.width = "" + circleSize + "px";
        document.getElementById("green-" + num).style.height = "" + circleSize + "px";
        document.getElementById("green-" + num).style.borderRadius = "50%";
        document.getElementById("green-" + num).style.fontSize = Math.max(18, Math.round(circleSize * 0.25)) + "px";

        placedCircles.push({ x: left_pos + circleSize / 2, y: top_pos + circleSize / 2, size: circleSize });
        addMovingCircle(elm, "green-" + num, circleSize, left_pos, top_pos);
    }

    blueNext = 1;
    redNext = 1;
    greenNext = 1;
    animateMovingCircles();
}

// 2つの円が重なっているかをチェック
function isOverlapping(x1, y1, size1, x2, y2, size2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var minDistance = (size1 + size2) / 2 + 10; // 10pxのマージン
    return distance < minDistance;
}

function addMovingCircle(elm, id, size, left, top) {
    var speed = 1.4;
    var vx = (Math.random() * speed + 1) * (Math.random() < 0.5 ? -1 : 1);
    var vy = (Math.random() * speed + 1) * (Math.random() < 0.5 ? -1 : 1);
    movingCircles.push({ id: id, elm: elm, size: size, x: left, y: top, vx: vx, vy: vy });
}

function animateMovingCircles() {
    if (movingCircles.length === 0) {
        animationId = requestAnimationFrame(animateMovingCircles);
        return;
    }

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var nextMoving = [];

    for (var i = 0; i < movingCircles.length; i++) {
        var obj = movingCircles[i];
        var elm = document.getElementById(obj.id);
        if (!elm) {
            continue;
        }

        obj.x += obj.vx;
        obj.y += obj.vy;

        if (obj.x <= 0) {
            obj.x = 0;
            obj.vx *= -1;
        } else if (obj.x + obj.size >= windowWidth) {
            obj.x = windowWidth - obj.size;
            obj.vx *= -1;
        }

        if (obj.y <= 0) {
            obj.y = 0;
            obj.vy *= -1;
        } else if (obj.y + obj.size >= windowHeight) {
            obj.y = windowHeight - obj.size;
            obj.vy *= -1;
        }

        elm.style.left = obj.x + "px";
        elm.style.top = obj.y + "px";
        nextMoving.push(obj);
    }

    movingCircles = nextMoving;
    animationId = requestAnimationFrame(animateMovingCircles);
}

// クリア画面を表示
function showClearScreen() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    var elapsedTime = (Date.now() - gameStartTime) / 1000;
    var seconds = elapsedTime.toFixed(2);

    var baseScore = Math.max(0, Math.round(20000 / elapsedTime));
    var mistakePenalty = mistakeCount * 100;
    score = Math.max(0, baseScore - mistakePenalty);

    if (highScore === null || score > highScore) {
        highScore = score;
        localStorage.setItem("clickNumberHighScore", highScore);
    }

    document.getElementById("clearTime").innerHTML = "Time: " + seconds + " seconds";
    document.getElementById("clearMistakes").innerHTML = "Mistakes: " + mistakeCount;
    document.getElementById("clearScore").innerHTML = "Score: " + score;
    document.getElementById("clearHighScore").innerHTML = "High Score: " + (highScore !== null ? highScore : 0);
    document.getElementById("clearScreen").classList.add("show");
}

function resetHighScore() {
    highScore = null;
    localStorage.removeItem("clickNumberHighScore");
    document.getElementById("clearHighScore").innerHTML = "High Score: 0";
}

// クリック時のコールバック（青）
document.removeBlue = function (id) {
    if (id === blueNext) {
        document.getElementById("main").removeChild(document.getElementById("blue-" + id));
        blueNext = blueNext + 1;

        // 3種類の円がクリックされたかチェック
        if (blueNext === TOTAL_CIRCLES + 1 && redNext === TOTAL_CIRCLES + 1 && greenNext === TOTAL_CIRCLES + 1) {
            showClearScreen();
        }
    } else {
        // 間違えたボタンをクリック
        mistakeCount = mistakeCount + 1;
    }
}

// クリック時のコールバック（赤）
document.removeRed = function (id) {
    if (id === redNext) {
        document.getElementById("main").removeChild(document.getElementById("red-" + id));
        redNext = redNext + 1;

        // 3種類の円がクリックされたかチェック
        if (blueNext === TOTAL_CIRCLES + 1 && redNext === TOTAL_CIRCLES + 1 && greenNext === TOTAL_CIRCLES + 1) {
            showClearScreen();
        }
    } else {
        // 間違えたボタンをクリック
        mistakeCount = mistakeCount + 1;
    }
}

// クリック時のコールバック（緑）
document.removeGreen = function (id) {
    if (id === greenNext) {
        document.getElementById("main").removeChild(document.getElementById("green-" + id));
        greenNext = greenNext + 1;

        if (blueNext === TOTAL_CIRCLES + 1 && redNext === TOTAL_CIRCLES + 1 && greenNext === TOTAL_CIRCLES + 1) {
            showClearScreen();
        }
    } else {
        mistakeCount = mistakeCount + 1;
    }
}

function handleMainClick(event) {
    if (event.target.closest("button")) {
        return;
    }

    var clickX = event.clientX;
    var clickY = event.clientY;
    var defaultHitFactor = 1.5;
    var smallHitFactor = 2.0;
    var smallThreshold = CIRCLE_SIZE_MIN + Math.floor(CIRCLE_SIZE_RANGE / 2);
    var hit = false;

    for (var i = movingCircles.length - 1; i >= 0; i--) {
        var obj = movingCircles[i];
        var dx = clickX - (obj.x + obj.size / 2);
        var dy = clickY - (obj.y + obj.size / 2);
        var distance = Math.sqrt(dx * dx + dy * dy);
        var hitFactor = obj.size < smallThreshold ? smallHitFactor : defaultHitFactor;
        var hitRadius = (obj.size / 2) * hitFactor;

        if (distance <= hitRadius) {
            var parts = obj.id.split("-");
            var color = parts[0];
            var id = parseInt(parts[1], 10);
            hit = true;
            if (color === "blue") {
                document.removeBlue(id);
            } else if (color === "red") {
                document.removeRed(id);
            } else if (color === "green") {
                document.removeGreen(id);
            }
            break;
        }
    }

    if (!hit) {
        mistakeCount = mistakeCount + 1;
    }
}

// STARTボタンのイベントリスナー
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("main").addEventListener("click", handleMainClick);

// RETRYボタンのイベントリスナー
document.getElementById("retryBtn").addEventListener("click", showStartScreen);
document.getElementById("resetHighScoreBtn").addEventListener("click", resetHighScore);

// 初期化
showStartScreen();