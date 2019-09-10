// 컴퓨터
var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

// 사용자
var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

// 게임
var game = {
    isComputerTurn: true,
    shotsLeft: 15,
};

function showText(s) {
    var $textElem = $('#text');
    $textElem.fadeOut(300, function() {
        $textElem.html(s);
        $textElem.fadeIn(100);
    });
}

function updateComputerScore(score) {
    computer.score += score;

    var $comScoreElem = $('#computer-score');
    $comScoreElem.animateNumber({
        number: computer.score,
    });
}

function updateUserScore(score) {
    user.score += score;

    var $userScoreElem = $('#user-score');
    $userScoreElem.animateNumber({
        number: user.score,
    });
}

function disableComputerButtons(flag) {
    $('.btn-computer').prop('disabled', flag);
}

function disableUserButtons(flag) {
    $('.btn-user').prop('disabled', flag);
}

function updateAI() {
    var diff = user.score - computer.score;

    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

function onComputerShoot() {
    if (! game.isComputerTurn) {
        return;
    } else {
        game.isComputerTurn = ! game.isComputerTurn;
    }

    updateAI();

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (Math.random() < computer['percent' + shootType]) {
        showText('컴퓨터가 ' + shootType + '점슛을 성공시켰습니다.');
        updateComputerScore(shootType);
    } else {
        showText('컴퓨터가 ' + shootType + '점슛을 실패했습니다.');
    }

    disableComputerButtons(true);
    disableUserButtons(false);
}

function onUserShoot(shootType) {
    if (game.isComputerTurn) {
        return;
    } else {
        game.isComputerTurn = ! game.isComputerTurn;
    }

    if (Math.random() < user['percent' + shootType]) {
        showText('사용자가 ' + shootType + '점슛을 성공시켰습니다.');
        updateUserScore(shootType);
    } else {
        showText('사용자가 ' + shootType + '점슛을 실패했습니다.');
    }

    game.shotsLeft--;
    var $shotsLeftElem = $('#shots-left');
    $shotsLeftElem.html(game.shotsLeft);

    if (game.shotsLeft === 0) {
        if (computer.score > user.score) {
            showText('컴퓨터가 이겼습니다.');
        } else if (user.score > computer.score) {
            showText('사용자가 이겼습니다.');
        } else {
            showText('비겼습니다.');
        }

        disableComputerButtons(true);
        disableUserButtons(true);
    } else {
        disableComputerButtons(false);
        disableUserButtons(true);
    }
}
