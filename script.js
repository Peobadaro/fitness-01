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

document.addEventListener('DOMContentLoaded', () => {
    setupWeekDays();
    setupWorkout();
    updateDate();
});

function setupWeekDays() {
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const dayCircles = document.querySelector('.day-circles');
    const today = new Date().getDay();

    days.forEach((day, index) => {
        const circle = document.createElement('div');
        circle.className = `day-circle ${index === today ? 'active' : ''}`;
        circle.innerHTML = day;
        dayCircles.appendChild(circle);

        circle.addEventListener('click', () => {
            document.querySelectorAll('.day-circle').forEach(c => c.classList.remove('active'));
            circle.classList.add('active');
            updateWorkout(index);
        });
    });
}

function updateDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    const date = new Date().toLocaleDateString('pt-BR', options);
    document.getElementById('currentDate').textContent = date;
}

function setupWorkout() {
    const today = new Date().getDay();
    updateWorkout(today);
}

function updateWorkout(dayIndex) {
    const workoutContainer = document.getElementById('workoutContainer');
    workoutContainer.innerHTML = '';

    const dayKey = Object.keys(treino)[dayIndex];
    const exercises = treino[dayKey];

    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'workout-item';
        exerciseDiv.innerHTML = `
            <span>${exercise}</span>
            <input type="checkbox" />
        `;
        workoutContainer.appendChild(exerciseDiv);
    });

    // Atualiza o contador de séries
    const totalSeries = exercises.length;
    document.getElementById('seriesCount').textContent = `0/${totalSeries}`;
}

// Adiciona funcionalidade aos botões de navegação
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
}); 