var SCISSORS = '가위';
var ROCK = '바위';
var PAPER = '보';

function onButtonClick(userInput) {
    var comInput;

    // Math.random()은 0부터 1 사이의 임의의 값을 리턴함.
    var rnd = Math.random();

    if (rnd < 0.33) {
        comInput = SCISSORS;
    } else if (rnd < 0.66) {
        comInput = ROCK;
    } else {
        comInput = PAPER;
    }

    // 승무패결정
    var result = '컴퓨터: ' + comInput;

    if (userInput === comInput) {
        result += ' - 컴퓨터와 비겼습니다.';
    } else {
        if (userInput === SCISSORS) {
            result += (comInput === ROCK) ? ' - 컴퓨터에게 졌습니다.' : ' - 컴퓨터를 이겼습니다.';
        } else if (userInput === ROCK) {
            result += (comInput === PAPER) ? ' - 컴퓨터에게 졌습니다.' : ' - 컴퓨터를 이겼습니다.';
        } else {
            result += (comInput === SCISSORS) ? ' - 컴퓨터에게 졌습니다.' : ' - 컴퓨터를 이겼습니다.';
        }
    }

    alert(result);
}
