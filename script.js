const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.getElementsByClassName("new-task-button")[0];
const tasksContainer = document.querySelector(".tasks-container");

refreshTasksUsingLocalStorage();
// Função que valida se o input tem conteúdo
const validateInput = () => {
  // Obtém o valor do input e remove espaços em branco
  const input = inputElement.value.trim();
  // Retorna true se o input tiver conteúdo, false se não tiver
  return input.length > 0;
};

// Função que é executada ao clicar no botão "Adicionar Tarefa"
const handleAddTask = () => {
  // Chama a função de validação do input
  const inputIsValid = validateInput();

  // Se o input não for válido, adiciona a classe "error" no input e interrompe a execução da função
  if (!inputIsValid) {
    inputElement.classList.add("error");
    return;
  }

  // Se o input for válido, executa o código para adicionar a tarefa
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.textContent = inputElement.value;

  taskContent.addEventListener('click',() => handleClick(taskContent))

  const deleteButton = document.createElement("i");
  deleteButton.classList.add("far", "fa-trash-alt");

  deleteButton.addEventListener('click',() => handleDeleteClick(taskItem,taskContent))

  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);

  tasksContainer.appendChild(taskItem);

  // Limpa o valor do input
  inputElement.value = "";
  updateLocalStorage()
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;//Vai pegar todos elementos filhos do tasksContainer

    for(const task of tasks){
      if (task.firstChild.isSameNode(taskContent)){
          task.firstChild.classList.toggle("completed");
      }
    }
    updateLocalStorage()
}

const handleDeleteClick = () =>{
   const tasks =tasksContainer.childNodes;
   
   for(const task of tasks){
    if (task.firstChild.isSameNode(tasksContainer,taskContent)){
      tasksContainer.remove
    }
   }
   updateLocalStorage()
}

// Função que é executada ao mudar o conteúdo do input
const handleInputChange = () => {
  // Chama a função de validação do input
  const inputIsValid = validateInput();

  // Se o input for válido, remove a classe "error" do input
  if (inputIsValid) {
    inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () =>{
   const taslk = tasksContainer.childNodes;

   const localStorageTasks = [... tasks].map(task =>{
    const content  = task.firstChild;
    const isCompleted = content.classList.contains("completed")

    return{description:content.innerTex, isCompleted}
   })

   localStorage.setItem('tasks',JSON.stringify(localStorageTasks))
}

const refreshTasksUsingLocalStorage = () =>{
  const tasksFromLocalStorage  = JSON.parse(localStorage.getItem("tasks"))
}

refreshTasksUsingLocalStorage()

// Adiciona um listener para o evento "click" no botão "Adicionar Tarefa", que chama a função handleAddTask()
addTaskButton.addEventListener("click", handleAddTask);

// Adiciona um listener para o evento "change" no input, que chama a função handleInputChange()
inputElement.addEventListener("change", handleInputChange);
