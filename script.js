const treinoPedro = {
    "Treino A": [
        "Circuito 1:",
        "1. Supino reto: 3 séries de 8-10 repetições",
        "2. Supino inclinado: 3 séries de 8-10 repetições",
        "3. Crucifixo: 3 séries de 10-12 repetições",
        "4. Tríceps pulley barrinha: 3 séries de 10-12 repetições",
        "5. Tríceps corda: 3 séries até a falha",
        "6. HIIT: 15 min (exemplo: 30s sprint / 30s caminhada)",
        "Circuito 2:",
        "1. Puxada frontal: 3 séries de 8-10 repetições",
        "2. Remada curvada: 3 séries de 8-10 repetições",
        "3. Pullover corda: 3 séries de 10-12 repetições",
        "4. Rosca direta: 3 séries de 10-12 repetições",
        "5. Rosca alternada: 3 séries de 10-12 repetições",
        "6. Core (Prancha 3x45s, Abdominal Infra 3x15)",
        "Circuito 3:",
        "1. Agachamento livre: 3 séries de 10-12 repetições",
        "2. Leg press: 3 séries de 10-12 repetições",
        "3. Cadeira extensora: 3 séries de 12-15 repetições",
        "4. Desenvolvimento militar: 3 séries de 8-10 repetições",
        "5. Elevação lateral: 3 séries de 10-12 repetições",
        "6. Cardio LISS: 20 min caminhada inclinada"
    ]
};

const treinoAime = {
    "Treino A – Pernas, Glúteos e Membros Superiores": [
        "Circuito 1:",
        "1. Agachamento na polia com barra curta – 4 placas, 12 repetições",
        "2. Cadeira extensora – 3 placas, 12 repetições",
        "3. Levantamento lateral de ombros com halteres – 2kg, 12 repetições",
        "4. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 2:",
        "1. Subida unilateral no banco – 12 repetições por perna",
        "2. Elevação pélvico com elevação de perna unilateral – 15 repetições por lado",
        "3. Agachamento sumô com halteres 6kg– 12 repetições",
        "4. Tríceps com corda na polia – 12 repetições",
        "5. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 3:",
        "1. Abdutora com bola – 15 repetições, 3 segundos de isometria",
        "2. Glúteo na cama (extensão de quadril) – 12 repetições por perna",
        "3. Supino livre com halteres – 4kg, 12 repetições",
        "4. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 4:",
        "1. Abdominal elevação perna frente – 15 repetições, 3 segundos de isometria",
        "2. Abdominal encolhimento perna - 15 rep"
    ],
    "Treino B – Posteriores, Glúteos e Membros Superiores": [
        "Circuito 1:",
        "1. Agachamento terra 4kg– 12 repetições",
        "2. Prancha Levantamento perna atras - 12 rep cada perna",
        "3. Puxada triângulo por cima – 5 placas, 12 repetições",
        "4. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 2:",
        "1. Agachamento unilateral frontal (avançado) – 12 repetições por perna",
        "2. Abdominal encolhimento de perna na cama – 15 repetições",
        "3. Remada triângulo – 4 placas, 12 repetições",
        "4. Elevação pélvica unilateral com perna elevada – 12 repetições por lado",
        "5. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 3:",
        "1. Bíceps scott 3kg, 12 repetições",
        "2. Tornozelo unilateral com peso (panturrilhas) – 15 repetições por lado",
        "3. Puxada aberta costas – 4Kg, 12 repetições",
        "4. Cardio pós-circuito: Corrida ou bike, 3 minutos (120 rpm mínimo)"
    ]
};

let currentUser = 'pedro';

// Atualiza a função de setup dos botões de navegação
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentUser = item.dataset.user;
        updateWorkout(new Date().getDay());
    });
});

// Atualiza a função updateWorkout para usar o treino correto
function updateWorkout(dayIndex) {
    const workoutContainer = document.getElementById('workoutContainer');
    workoutContainer.innerHTML = '';

    const treino = currentUser === 'pedro' ? treinoPedro : treinoAime;
    const treinoKey = Object.keys(treino)[dayIndex % Object.keys(treino).length];
    const exercises = treino[treinoKey];

    const titleDiv = document.createElement('div');
    titleDiv.className = 'workout-title';
    titleDiv.textContent = treinoKey;
    workoutContainer.appendChild(titleDiv);

    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'workout-item';
        exerciseDiv.innerHTML = `
            <span>${exercise}</span>
            ${!exercise.startsWith('Circuito') ? '<input type="checkbox" />' : ''}
        `;
        workoutContainer.appendChild(exerciseDiv);
    });

    const totalSeries = exercises.filter(ex => !ex.startsWith('Circuito')).length;
    document.getElementById('seriesCount').textContent = `0/${totalSeries}`;
}

document.addEventListener('DOMContentLoaded', () => {
    setupWeekDays();
    setupWorkout();
    updateDate();
    setupProgressChart();
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

function setupProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Dados simulados de progresso (você pode substituir por dados reais)
    const data = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Exercícios Completados',
            data: [6, 4, 5, 2, 4, 3, 1],
            borderColor: '#2ecc71',
            tension: 0.4,
            fill: false
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
} 