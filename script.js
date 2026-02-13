const valli = ['க', 'ச', 'ட', 'த', 'ப', 'ற'];
const melli = ['ங', 'ஞ', 'ண', 'ந', 'ம', 'ன'];
const idai = ['ய', 'ர', 'ல', 'வ', 'ழ', 'ள'];
const uyir = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];

let score = 0;
let totalAsked = 0;
let currentLetter = "";
let currentType = "";

// பகுதிகளை மாற்றும் செயல்பாடு
function showSection(id) {
    document.querySelectorAll('.section, #main-menu').forEach(el => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    
    if(id === 'noolpaa') loadNoolpaa();
    if(id === 'practice') generatePractice();
    if(id === 'game') nextQuestion();
}

// நூற்பாக்களைக் காட்டுதல்
function loadNoolpaa() {
    const list = document.getElementById('noolpaa-list');
    const data = [
        "17. புள்ளி இல்லா எல்லா மெய்யும் அகரமொடு உயிர்த்தலும்...",
        "18. மெய்யின் வழியது உயிர் தோன்று நிலையே.",
        `19. வல்லெழுத்து என்ப: ${valli.join(', ')}`,
        `20. மெல்லெழுத்து என்ப: ${melli.join(', ')}`,
        `21. இடையெழுத்து என்ப: ${idai.join(', ')}`
    ];
    list.innerHTML = data.map(n => `<p>${n}</p>`).join('<hr>');
}

// பயிற்சி உதாரணங்கள்
function generatePractice() {
    const randomMey = [...valli, ...melli, ...idai][Math.floor(Math.random() * 18)];
    const randomUyir = uyir[Math.floor(Math.random() * 3) + 1]; // ஆ, இ, ஈ
    
    document.getElementById('akaram-sample').innerText = `க + அ = க, ச + அ = ச`;
    document.getElementById('thirithal-sample').innerText = `${randomMey} + ${randomUyir} = ${randomMey}${randomUyir}`;
}

// விளையாட்டுச் செயல்பாடுகள்
function nextQuestion() {
    const all = [...valli, ...melli, ...idai];
    currentLetter = all[Math.floor(Math.random() * all.length)];
    
    if(valli.includes(currentLetter)) {
        currentType = "வல்லெழுத்து";
        hint = "க ச ட த ப ற - வன் மெய்கள்";
    } else if(melli.includes(currentLetter)) {
        currentType = "மெல்லெழுத்து";
        hint = "ங ஞ ண ந ம ன - மென் மெய்கள்";
    } else {
        currentType = "இடையெழுத்து";
        hint = "ய ர ல வ ழ ள - இடை மெய்கள்";
    }

    document.getElementById('question-text').innerText = `'${currentLetter}' - இது எந்த வகை மெய்யெழுத்து?`;
    document.getElementById('hint-text').innerText = `குறிப்பு: ${hint}`;
    document.getElementById('feedback').innerText = "";
}

function checkAnswer(userChoice) {
    totalAsked++;
    const feedback = document.getElementById('feedback');
    
    if(userChoice === currentType) {
        score++;
        feedback.innerText = "✓ சரி!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = `✗ தவறு. ${currentLetter} ஒரு ${currentType}`;
        feedback.style.color = "red";
    }
    
    document.getElementById('score-board').innerText = `மதிப்பெண்: ${score} / ${totalAsked}`;
    setTimeout(nextQuestion, 1500);
}

function resetGame() {
    score = 0;
    totalAsked = 0;
    document.getElementById('score-board').innerText = `மதிப்பெண்: 0 / 0`;
}
