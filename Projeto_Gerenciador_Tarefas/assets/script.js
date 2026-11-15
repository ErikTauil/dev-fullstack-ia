const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

const tasks = [];

function renderTasks() {
    taskList.replaceChildren();

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "Nenhuma tarefa adicionada.";
        taskList.append(emptyMessage);
    }

    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        item.className = "task-item";

        const text = document.createElement("span");
        text.className = task.completed ? "task-text is-completed" : "task-text";
        text.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const toggleButton = document.createElement("button");
        toggleButton.className = "button button-primary";
        toggleButton.type = "button";
        toggleButton.dataset.action = "toggle";
        toggleButton.dataset.index = index;
        toggleButton.textContent = task.completed ? "Desfazer" : "Concluir";
        toggleButton.setAttribute(
            "aria-label",
            `${task.completed ? "Desfazer" : "Concluir"} tarefa: ${task.text}`
        );

        const deleteButton = document.createElement("button");
        deleteButton.className = "button button-delete";
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.index = index;
        deleteButton.textContent = "Deletar";
        deleteButton.setAttribute("aria-label", `Deletar tarefa: ${task.text}`);

        actions.append(toggleButton, deleteButton);
        item.append(text, actions);
        taskList.append(item);
    });

    taskCount.textContent = `${tasks.length} ${
        tasks.length === 1 ? "tarefa" : "tarefas"
    }`;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) {
        taskInput.focus();
        return;
    }

    tasks.push({ text, completed: false });
    taskForm.reset();
    taskInput.focus();
    renderTasks();
});

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !taskList.contains(button)) {
        return;
    }

    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
        return;
    }

    if (button.dataset.action === "toggle") {
        tasks[index].completed = !tasks[index].completed;
    } else if (button.dataset.action === "delete") {
        tasks.splice(index, 1);
    } else {
        return;
    }

    renderTasks();
});

renderTasks();
