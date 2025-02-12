const treino = {
    "Dia 1 - Peito, Tríceps e Cardio HIIT": [
        "Supino reto: 4 séries de 8-10 repetições",
        "Supino inclinado com halteres: 4 séries de 8-10 repetições",
        "Crucifixo: 3 séries de 10-12 repetições",
        "Tríceps pulley: 3 séries de 10-12 repetições",
        "Mergulho entre bancos: 3 séries até a falha",
        "HIIT: 15 min (exemplo: 30s sprint / 30s caminhada)"
    ],
    "Dia 2 - Costas, Bíceps e Core": [
        "Puxada frontal: 4 séries de 8-10 repetições",
        "Remada curvada: 4 séries de 8-10 repetições",
        "Pullover: 3 séries de 10-12 repetições",
        "Rosca direta: 3 séries de 10-12 repetições",
        "Rosca alternada: 3 séries de 10-12 repetições",
        "Core (Prancha 3x45s, Abdominal Infra 3x15)"
    ],
    "Dia 3 - Pernas, Ombros e Cardio": [
        "Agachamento livre: 4 séries de 10-12 repetições",
        "Leg press: 4 séries de 10-12 repetições",
        "Cadeira extensora: 3 séries de 12-15 repetições",
        "Desenvolvimento militar: 4 séries de 8-10 repetições",
        "Elevação lateral: 3 séries de 10-12 repetições",
        "Cardio LISS: 20 min caminhada inclinada"
    ],
    "Dia 4 - Descanso Ativo": [
        "Caminhada de 30-40 min ou Yoga/Alongamento"
    ],
    "Dia 5 - Treino Funcional e Core": [
        "Circuito de 6-8 exercícios (burpees, agachamento, saltos, corda, flexões, prancha)",
        "Cada exercício por 40s com 20s descanso",
        "3 a 4 rodadas com 2 min de descanso entre elas"
    ],
    "Dia 6 - Pernas e Cardio HIIT": [
        "Agachamento sumô: 4 séries de 8-10 repetições",
        "Avanço com halteres: 3 séries de 10 repetições por perna",
        "Stiff com halteres: 3 séries de 10 repetições",
        "Gêmeos em pé: 3 séries de 12-15 repetições",
        "HIIT: 15 min (exemplo: 30s sprint / 30s caminhada)"
    ],
    "Dia 7 - Descanso ou Atividade Leve": [
        "Caminhada ou alongamento"
    ]
};

// Estado global da aplicação
const state = {
    currentDay: 0,
    points: 0,
    streakDays: 0,
    workoutHistory: [],
    timer: {
        active: false,
        seconds: 0,
        interval: null
    }
};

// Carregar dados salvos
function loadSavedData() {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
        const data = JSON.parse(savedData);
        state.points = data.points || 0;
        state.streakDays = data.streakDays || 0;
        state.workoutHistory = data.workoutHistory || [];
        updateMetrics();
    }
}

// Salvar dados
function saveData() {
    localStorage.setItem('workoutData', JSON.stringify({
        points: state.points,
        streakDays: state.streakDays,
        workoutHistory: state.workoutHistory
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    setupNotifications();
    const today = new Date().getDay();
    state.currentDay = today;
    updateDayCircles();
    setupProgressRings();
    loadWorkout(today);
    setupNavigation();
    setupWorkoutListeners();
    showStats();
});

// Configuração de notificações
async function setupNotifications() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            scheduleWorkoutReminder();
        }
    }
}

function scheduleWorkoutReminder() {
    // Agendar notificação para próximo treino
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);

    const timeUntilNotification = tomorrow.getTime() - now.getTime();

    setTimeout(() => {
        new Notification('Hora do Treino! 💪', {
            body: 'Seu próximo treino está aguardando. Vamos manter o foco!',
            icon: '/icon.png'
        });
        scheduleWorkoutReminder(); // Reagendar para o próximo dia
    }, timeUntilNotification);
}

function updateDayCircles() {
    const dayCircles = document.querySelectorAll('.day-circle');
    dayCircles.forEach((circle, index) => {
        circle.classList.remove('active');
        if (index === state.currentDay) {
            circle.classList.add('active');
        }
        // Adicionar histórico visual
        if (state.workoutHistory.includes(index)) {
            circle.classList.add('completed');
        }
    });
}

function setupProgressRings() {
    const svg = document.querySelector('.progress-ring');
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    // Calcular progresso baseado no histórico
    const weekProgress = state.workoutHistory.length / 7;
    const pointsProgress = Math.min(state.points / 1000, 1);
    const streakProgress = Math.min(state.streakDays / 30, 1);

    const rings = [
        { color: '#FF3B30', progress: weekProgress },
        { color: '#34C759', progress: pointsProgress },
        { color: '#5AC8FA', progress: streakProgress }
    ];

    svg.innerHTML = ''; // Limpar anéis existentes

    rings.forEach((ring, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '100');
        circle.setAttribute('r', radius - (index * 20));
        circle.setAttribute('stroke', ring.color);
        circle.setAttribute('stroke-width', '15');
        circle.setAttribute('fill', 'none');
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference * (1 - ring.progress);
        circle.style.transform = 'rotate(-90deg)';
        circle.style.transformOrigin = '100px 100px';
        
        // Adicionar animação
        circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
        
        svg.appendChild(circle);
    });
}

function updateMetrics() {
    const exercisesCompleted = state.workoutHistory.length;
    const totalExercises = Object.keys(treino).length;
    
    document.querySelector('.metric:nth-child(1) .value').textContent = 
        `${exercisesCompleted}/${totalExercises}`;
    document.querySelector('.metric:nth-child(2) .value').textContent = 
        `${Math.floor(state.timer.seconds / 60)} min`;
    document.querySelector('.metric:nth-child(3) .value').textContent = 
        `${state.points} pts`;
}

function loadWorkout(dayIndex) {
    const workoutContainer = document.getElementById('workout-container');
    const dayName = Object.keys(treino)[dayIndex];
    const exercises = treino[dayName];
    
    const completedToday = state.workoutHistory.includes(dayIndex);

    workoutContainer.innerHTML = `
        <h3>${dayName}</h3>
        ${exercises.map(exercise => `
            <div class="exercise-item">
                <label>
                    <input type="checkbox" class="exercise-check" 
                           ${completedToday ? 'checked disabled' : ''}>
                    ${exercise}
                </label>
                <div class="timer-controls">
                    <button class="timer-btn">⏱️</button>
                    <span class="exercise-timer">00:00</span>
                </div>
            </div>
        `).join('')}
        ${!completedToday ? `
            <button id="complete-workout" class="complete-btn">
                Finalizar Treino
            </button>
        ` : ''}
    `;

    setupWorkoutListeners();
}

function setupWorkoutListeners() {
    const completeBtn = document.getElementById('complete-workout');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeWorkout);
    }

    // Setup timer buttons
    document.querySelectorAll('.timer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exerciseItem = e.target.closest('.exercise-item');
            toggleExerciseTimer(exerciseItem);
        });
    });
}

function toggleExerciseTimer(exerciseItem) {
    const timerDisplay = exerciseItem.querySelector('.exercise-timer');
    const timerBtn = exerciseItem.querySelector('.timer-btn');
    
    if (!state.timer.active) {
        // Iniciar timer
        state.timer.active = true;
        state.timer.seconds = 0;
        timerBtn.textContent = '⏹️';
        
        state.timer.interval = setInterval(() => {
            state.timer.seconds++;
            const minutes = Math.floor(state.timer.seconds / 60);
            const seconds = state.timer.seconds % 60;
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            updateMetrics();
        }, 1000);
    } else {
        // Parar timer
        clearInterval(state.timer.interval);
        state.timer.active = false;
        timerBtn.textContent = '⏱️';
    }
}

function completeWorkout() {
    const points = calculatePoints();
    state.points += points;
    
    if (!state.workoutHistory.includes(state.currentDay)) {
        state.workoutHistory.push(state.currentDay);
        state.streakDays++;
    }
    
    showCompletionModal(points);
    saveData();
    updateMetrics();
    setupProgressRings();
    updateDayCircles();
}

function calculatePoints() {
    const exercisesCompleted = document.querySelectorAll('.exercise-check:checked').length;
    const totalExercises = document.querySelectorAll('.exercise-check').length;
    const completionPercentage = exercisesCompleted / totalExercises;
    
    let points = Math.floor(completionPercentage * 100);
    points += state.timer.seconds > 0 ? Math.floor(state.timer.seconds / 60) * 10 : 0;
    points += state.streakDays * 5;
    
    return points;
}

function showCompletionModal(points) {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>🎉 Treino Concluído!</h2>
            <p>Você ganhou ${points} pontos</p>
            <p>Sequência atual: ${state.streakDays} dias</p>
            <button onclick="this.closest('.completion-modal').remove()">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showStats() {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <h3>Suas Estatísticas</h3>
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-label">Total de Pontos</span>
                <span class="stat-value">${state.points}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Sequência</span>
                <span class="stat-value">${state.streakDays} dias</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Treinos Completados</span>
                <span class="stat-value">${state.workoutHistory.length}</span>
            </div>
        </div>
    `;
    
    document.querySelector('.summary-section').appendChild(statsContainer);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
} 