document.getElementById('draw').addEventListener('click', function () {
    const omikujiResults = ['超大吉', '大吉', '中吉', '小吉', '末吉', '凶', '大凶'];
    const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
    const resultEl = document.getElementById('result');

    // 運勢ごとに割り当てるクラス名
    const classMap = {
        '超大吉': 'omikuji-super',
        '大吉': 'omikuji-verygood',
        '中吉': 'omikuji-good',
        '小吉': 'omikuji-mild',
        '末吉': 'omikuji-neutral',
        '凶': 'omikuji-bad',
        '大凶': 'omikuji-verybad'
    };

    resultEl.textContent = `あなたの運勢は... ${result}!`;
    // 既存のクラスをクリアしてから該当クラスを追加
    resultEl.className = '';
    resultEl.classList.add(classMap[result]);
    const container = document.querySelector('.container');

    // 良い運勢時の演出
    function createConfetti(count = 30) {
        const colors = ['#FFD700', '#FF6B6B', '#8BC34A', '#FF8C00', '#9C27B0'];
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'confetti';
            el.style.left = Math.random() * 100 + '%';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            el.style.animationDelay = (Math.random() * 0.5) + 's';
            container.appendChild(el);
            // 一定時間で削除
            setTimeout(() => el.remove(), 3500);
        }
    }

    // result に合わせて演出を実行
    if (result === '超大吉' || result === '大吉') {
        resultEl.classList.add('celebrate');
        createConfetti(40);
        setTimeout(() => resultEl.classList.remove('celebrate'), 3000);
    } else if (result === '中吉') {
        resultEl.classList.add('pulse');
        setTimeout(() => resultEl.classList.remove('pulse'), 2000);
    }
});