const finalists = [
    { name: "Jesús García", song: "Hojas de Otoño", points: 51 },
    { name: "Claudia Siliezar", song: "Donde está", points: 54 },
    { name: "Esteban García", song: "Luz en el Silencio", points: 57 },
    { name: "Zuly Castillo", song: "Algoritmos No Saben Amar", points: 62 },
    { name: "Helena Samper", song: "Café y susurros", points: 66 },
    { name: "Alexander Santana", song: "Los Amigos de Pau", points: 138 },
    { name: "Xavi Perelló", song: "Seguim Cantant", points: 185 },
    { name: "Monica Bautista", song: "El poder de tu sonrisa", points: 362 }
];

const startBtn = document.getElementById('start-reveal');
const introSection = document.getElementById('intro-section');
const resultsSection = document.getElementById('results-section');
const scoreboard = document.getElementById('scoreboard');
const winnerCard = document.getElementById('winner-announcement');
const winnerNameElem = document.getElementById('winner-name');
const resetBtn = document.getElementById('reset-btn');

startBtn.addEventListener('click', startSequence);
resetBtn.addEventListener('click', () => location.reload());

async function startSequence() {
    introSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    for (let i = 0; i < finalists.length; i++) {
        await revealFinalist(finalists[i], i);
        // Wait a bit between each reveal
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    showFinalistsComplete();
}

function revealFinalist(finalist, index) {
    return new Promise(resolve => {
        const item = document.createElement('div');
        item.className = 'score-item';
        item.innerHTML = `
            <div>
                <span class="performer">${finalist.name}</span>
                <span class="song">${finalist.song}</span>
            </div>
            <div class="points" id="points-${index}">0</div>
        `;
        scoreboard.appendChild(item);

        // Animate counter
        animateValue(`points-${index}`, 0, finalist.points, 800, () => {
            resolve();
        });
    });
}

function animateValue(id, start, end, duration, callback) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            callback();
        }
    };
    window.requestAnimationFrame(step);
}

function showFinalistsComplete() {
    winnerNameElem.textContent = "ESTOS SON NUESTROS FINALISTAS";
    winnerCard.classList.remove('hidden');

    // Smooth scroll to bottom
    winnerCard.scrollIntoView({ behavior: 'smooth' });
}
