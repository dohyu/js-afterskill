var list = [];
var result = [];

for (var i = 1; i <= 45; i++) {
    list.push(i);
}

for (var i = 0; i < 6; i++) {
    // 랜덤으로 index 생성
    var index = Math.floor(Math.random() * list.length);
    
    // index의 값
    var num = list[index];

    // 배열에서 인덱스 값 제거
    list.splice(index, 1);
    result.push(num);
}

result.sort(function(a, b) {
    return a - b;
});

for (var i = 0; i < result.length; i++) {
    document.write('<span class="ball">' + result[i] + '</span>');
}
