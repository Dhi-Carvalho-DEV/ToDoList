/* Elementos */
const searchInput = document.querySelector(".search-box input");
const boardCards = document.querySelectorAll(".board-card");
const addBoardCard = document.querySelector(".add-board");

/* Busca de Quadros */
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    boardCards.forEach((card) => {
      const title = card.querySelector("h3");
      if (!title) return;

      const boardName = title.textContent.toLowerCase();
      if (boardName.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* Criar Novo Quadro (Mock) */
if (addBoardCard) {
  addBoardCard.addEventListener("click", () => {
    const boardName = prompt("Nome do novo quadro:");
    if (!boardName) return;

    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    boards.push({
      id: Date.now(),
      name: boardName,
      tasks: [],
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("boards", JSON.stringify(boards));

    alert(`Quadro "${boardName}" criado!`);
    location.reload();
  });
}

/* Carrega Quadros do Local Storage */
function loadBoards() {
  const boards = JSON.parse(localStorage.getItem("boards")) || [];

  console.log("Quadros", boards);
}

loadBoards();
