// Selecionando os elementos
const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

// Verificando se o valor do input é válido
const validateInput = () => inputElement.value.trim().length > 0;

// Função para lidar com a adição de uma nova tarefa
const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    inputElement.classList.add("error");
    return;
  }

  // Criando um novo elemento de tarefa
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far", "fa-trash-alt");

  // Adicionando event listeners ao elemento de tarefa e ao botão de exclusão
  taskContent.addEventListener("click", () => {
    taskContent.classList.toggle("completed");
    updateLocalStorage();
  });

  deleteItem.addEventListener("click", () => {
    taskItemContainer.remove();
    updateLocalStorage();
  });

  // Adicionando o elemento de tarefa e o botão de exclusão ao container
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);

  // Limpando o campo de input e atualizando o armazenamento local
  inputElement.value = "";
  updateLocalStorage();
};

// Função para lidar com a validação do input
const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    inputElement.classList.remove("error");
  }
};

// Função para atualizar o armazenamento local
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => ({
    description: task.firstChild.innerText,
    isCompleted: task.firstChild.classList.contains("completed")
  }));

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

// Função para atualizar as tarefas usando o armazenamento local
const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  tasksFromLocalStorage.forEach((task) => {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => {
      taskContent.classList.toggle("completed");
      updateLocalStorage();
    });

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt");

    deleteItem.addEventListener("click", () => {
      taskItemContainer.remove();
      updateLocalStorage();
    });

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  });
};

// Adicionando event listeners ao input e ao botão de adicionar, e atualizando as tarefas a partir do armazenamento local
addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("input", handleInputChange);
refreshTasksUsingLocalStorage();
