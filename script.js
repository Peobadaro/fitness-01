const treino = {
    // Seu objeto de treino aqui (como fornecido)
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