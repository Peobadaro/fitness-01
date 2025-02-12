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

    // Handle navigation
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}); 