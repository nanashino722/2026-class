document.getElementById('draw').addEventListener('click', function () {
    const omikujiResults = ['超大吉', '大吉', '中吉', '小吉', '末吉', '凶', '大凶'];
    const resultEl = document.getElementById('result');
    const commentEl = document.getElementById('comment');
    const drawButton = document.getElementById('draw');

    const container = document.querySelector('.container');
    // 引くアニメーション: ボタンを無効化してランダム表示を回す
    drawButton.disabled = true;
    drawButton.classList.add('drawing');
    // container を振る
    if (container) container.classList.add('shake');
    let roller = setInterval(() => {
        const r = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
        resultEl.textContent = `あなたの運勢は... ${r}!`;
    }, 80);

    // 少し待ってから本当の結果を表示
    setTimeout(() => {
        clearInterval(roller);
        const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

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
        // 一言コメントマップ
        const commentMap = {
            '超大吉': 'お。すごい！おめでとさん。',
            '大吉': '大当たり！おめでと。',
            '中吉': 'ほどほどでございます。',
            '小吉': 'ちょっとした幸運があるといいね。',
            '末吉': 'まあ、これくらいがちょうどいいかもね。',
            '凶': '夜道に気を付けて。',
            '大凶': '早く帰って寝たほうが良いんじゃない？'
        };
        // 既存のクラスをクリアしてから該当クラスを追加
        resultEl.className = '';
        resultEl.classList.add(classMap[result]);
        // コメント表示
        if (commentEl) commentEl.textContent = commentMap[result] || '';
        const container = document.querySelector('.container');

        // --- シンプルな CSS ベースのコンフェッティに戻す ---
        function createConfetti(count = 120) {
            const colors = ['#FFD700', '#FF6B6B', '#8BC34A', '#FF8C00', '#9C27B0'];
            const shapes = ['star', 'circle', 'square'];
            for (let i = 0; i < count; i++) {
                const el = document.createElement('div');
                el.className = 'confetti';
                // 形をランダムに割り当て
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                el.classList.add(shape);
                el.style.left = Math.random() * 100 + '%';
                el.style.top = '-20px';
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                el.style.transform = `rotate(${Math.random() * 360}deg)`;
                el.style.animationDelay = (Math.random() * 0.8) + 's';
                // ランダムで大きめのコンフェッティを少量混ぜる
                if (Math.random() < 0.06) el.classList.add('big');
                document.body.appendChild(el);
                // CSSアニメーションに合わせて削除タイミングを短くする
                setTimeout(() => el.remove(), 4800);
            }
            // テスト用にコンソールから呼べるように公開
            window.showConfetti = function (n = 120) { createConfetti(n); };
        }

        // 中央で一瞬のバースト（大きな光のエフェクト）
        function createBurst() {
            const burst = document.createElement('div');
            burst.className = 'burst';
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 900);
        }
        // テスト用に公開
        window.showBurst = createBurst;

        // result に合わせて演出を実行（超大吉/大吉は演出を派手に）
        if (result === '超大吉') {
            resultEl.classList.add('celebrate');
            createBurst();
            createConfetti(260);
            setTimeout(() => resultEl.classList.remove('celebrate'), 3000);
        } else if (result === '大吉') {
            resultEl.classList.add('celebrate');
            // 大吉は少し遅延してパラパラ＋中くらいの派手さ
            setTimeout(() => createConfetti(160), 150);
            setTimeout(() => resultEl.classList.remove('celebrate'), 3000);
        } else if (result === '中吉') {
            resultEl.classList.add('pulse');
            setTimeout(() => resultEl.classList.remove('pulse'), 2000);
        }

        // 最後にボタンを戻す
        drawButton.disabled = false;
        drawButton.classList.remove('drawing');
        if (container) container.classList.remove('shake');
    }, 1000); // 引き演出の長さ
});