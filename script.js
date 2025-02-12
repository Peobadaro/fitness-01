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

// Adicionar o treino da Aimê
const treinoAime = {
    "Treino A - Pernas, Glúteos e Superiores": [
        "Circuito 1:",
        "1. Agachamento na polia com barra curta – 4 placas, 12 repetições",
        "2. Cadeira extensora – 3 placas, 12 repetições",
        "3. Levantamento lateral de ombros com halteres – 2kg, 12 repetições",
        "4. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 2:",
        "1. Subida unilateral no banco – 12 repetições por perna",
        "2. Elevação pélvico com elevação de perna unilateral – 15 repetições por lado",
        "3. Agachamento sumô com halteres 6kg– 12 repetições",
        "4. Tríceps com corda na polia – 12 repetições",
        "5. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 3:",
        "1. Abdutora com bola – 15 repetições, 3s isometria",
        "2. Glúteo na cama (extensão de quadril) – 12 repetições por perna",
        "3. Supino livre com halteres – 4kg, 12 repetições",
        "4. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 4:",
        "1. Abdominal elevação perna frente – 15 repetições, 3s isometria",
        "2. Abdominal encolhimento perna - 15 rep"
    ],
    "Treino B - Posteriores, Glúteos e Superiores": [
        "Circuito 1:",
        "1. Agachamento terra 4kg– 12 repetições",
        "2. Prancha Levantamento perna atras - 12 rep cada perna",
        "3. Puxada triângulo por cima – 5 placas, 12 repetições",
        "4. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 2:",
        "1. Agachamento unilateral frontal – 12 repetições por perna",
        "2. Abdominal encolhimento de perna na cama – 15 repetições",
        "3. Remada triângulo – 4 placas, 12 repetições",
        "4. Elevação pélvica unilateral com perna elevada – 12 rep por lado",
        "5. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)",
        "Circuito 3:",
        "1. Bíceps scott 3kg, 12 repetições",
        "2. Tornozelo unilateral com peso – 15 repetições por lado",
        "3. Puxada aberta costas – 4Kg, 12 repetições",
        "4. Cardio: Corrida ou bike, 3 minutos (120 rpm mínimo)"
    ]
};

let currentUser = 'pedro';

// Reorganiza o treino para começar na segunda-feira
const treinoOrdenado = {
    "Domingo - Descanso ou Atividade Leve": treino["Dia 7 - Descanso ou Atividade Leve"],
    "Segunda - Peito, Tríceps e Cardio HIIT": treino["Dia 1 - Peito, Tríceps e Cardio HIIT"],
    "Terça - Costas, Bíceps e Core": treino["Dia 2 - Costas, Bíceps e Core"],
    "Quarta - Pernas, Ombros e Cardio": treino["Dia 3 - Pernas, Ombros e Cardio"],
    "Quinta - Descanso Ativo": treino["Dia 4 - Descanso Ativo"],
    "Sexta - Treino Funcional e Core": treino["Dia 5 - Treino Funcional e Core"],
    "Sábado - Pernas e Cardio HIIT": treino["Dia 6 - Pernas e Cardio HIIT"]
};

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

function updateWorkout(dayIndex) {
    const workoutContainer = document.getElementById('workoutContainer');
    workoutContainer.innerHTML = '';

    let currentTreino;
    let dayKey;
    let exercises;

    if (currentUser === 'pedro') {
        dayKey = Object.keys(treinoOrdenado)[dayIndex];
        exercises = treinoOrdenado[dayKey];
    } else {
        // Para Aimê, alterna entre Treino A e B dependendo do dia
        dayKey = dayIndex % 2 === 0 ? 
            "Treino A - Pernas, Glúteos e Superiores" : 
            "Treino B - Posteriores, Glúteos e Superiores";
        exercises = treinoAime[dayKey];
    }

    const titleDiv = document.createElement('div');
    titleDiv.className = 'workout-title';
    titleDiv.textContent = dayKey;
    workoutContainer.appendChild(titleDiv);

    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'workout-item';
        if (exercise.startsWith('Circuito')) {
            exerciseDiv.className += ' circuit-title';
        }
        exerciseDiv.innerHTML = `
            <span>${exercise}</span>
            <input type="checkbox" />
        `;
        workoutContainer.appendChild(exerciseDiv);
    });

    const totalSeries = exercises.length;
    document.getElementById('seriesCount').textContent = `0/${totalSeries}`;
}

// Atualizar a função de setup dos botões de navegação
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentUser = item.dataset.user;
        updateWorkout(new Date().getDay());
    });
}); 