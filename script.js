const treino = {
    "Dia 1 - Peito, Tríceps e Cardio HIIT": [
        "Supino reto: 4 séries de 8-10 repetições",
        "Supino inclinado com halteres: 4 séries de 8-10 repetições",
        "Crucifixo: 3 séries de 10-12 repetições",
        "Tríceps pulley: 3 séries de 10-12 repetições",
        "Mergulho entre bancos: 3 séries até a falha",
        "HIIT: 15 min (exemplo: 30s sprint / 30s caminhada)"
    ],
    // ... rest of your workout object
};

document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('current-date').textContent = 
        currentDate.toLocaleDateString('pt-BR', options).toUpperCase();

    // Render workout plan
    const workoutContainer = document.getElementById('workout-container');
    
    Object.entries(treino).forEach(([day, exercises]) => {
        const card = document.createElement('div');
        card.className = 'workout-card';
        
        const title = document.createElement('h3');
        title.textContent = day;
        
        const list = document.createElement('ul');
        exercises.forEach(exercise => {
            const item = document.createElement('li');
            item.textContent = exercise;
            list.appendChild(item);
        });
        
        card.appendChild(title);
        card.appendChild(list);
        workoutContainer.appendChild(card);
    });

    // View Management
    const views = document.querySelectorAll('.view');
    const navButtons = document.querySelectorAll('.nav-item');
    const viewTitle = document.getElementById('view-title');

    function showView(viewId) {
        views.forEach(view => view.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        const targetView = document.getElementById(viewId);
        const targetButton = document.querySelector(`[data-view="${viewId}"]`);
        
        targetView.classList.add('active');
        targetButton.classList.add('active');
        viewTitle.textContent = targetButton.querySelector('span:last-child').textContent;
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showView(button.dataset.view);
        });
    });

    // Day Navigation
    const dayButtons = document.querySelectorAll('.day-btn');
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    let currentDate = new Date();

    function updateDateDisplay() {
        const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('current-date').textContent = 
            currentDate.toLocaleDateString('pt-BR', options).toUpperCase();
        
        // Update active day button
        dayButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.day) === currentDate.getDay()) {
                btn.classList.add('active');
            }
        });
    }

    prevDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        updateWorkoutDisplay();
    });

    nextDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
        updateWorkoutDisplay();
    });

    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDay = parseInt(button.dataset.day);
            const diff = targetDay - currentDate.getDay();
            currentDate.setDate(currentDate.getDate() + diff);
            updateDateDisplay();
            updateWorkoutDisplay();
        });
    });

    // Weekly Progress Chart
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            datasets: [{
                label: 'Calorias',
                data: [500, 605, 550, 580, 600, 590, 570],
                backgroundColor: '#FF375F'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#333'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    function updateWorkoutDisplay() {
        const workoutContainer = document.getElementById('workout-container');
        workoutContainer.innerHTML = ''; // Clear current workout
        
        // Get day of week (0-6)
        const dayIndex = currentDate.getDay();
        const workoutDay = Object.keys(treino)[dayIndex];
        
        if (workoutDay) {
            const card = document.createElement('div');
            card.className = 'workout-card';
            
            const title = document.createElement('h3');
            title.textContent = workoutDay;
            
            const list = document.createElement('ul');
            treino[workoutDay].forEach(exercise => {
                const item = document.createElement('li');
                item.textContent = exercise;
                list.appendChild(item);
            });
            
            card.appendChild(title);
            card.appendChild(list);
            workoutContainer.appendChild(card);
        }
    }

    // Initial setup
    updateDateDisplay();
    updateWorkoutDisplay();
    showView('summary-view');
}); 