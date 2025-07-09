let majorIdToDelete = null;
let majorNameToDelete = null;

function displayForm() {
  const modalCriar = document.getElementById('modal-criar');
  modalCriar.style.display = 'flex';

  const closeButton = modalCriar.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    modalCriar.style.display = 'none';
  });

  // Adiciona evento para fechar quando clicar fora do modal
  modalCriar.addEventListener('click', (e) => {
    if (e.target === modalCriar) {
      modalCriar.style.display = 'none';
    }
  });

  document
    .getElementById('createMajorForm')
    .addEventListener('submit', (event) => {
      //event.preventDefault(); // Impede que a página seja recarregada ao enviar o formulário

      // Obter os valores dos campos do formulário
      const name = document.getElementById('name').value;
      const code = document.getElementById('code').value;
      const description = document.getElementById('description').value;

      // Criar um objeto com os dados do formulário
      const newMajor = {
        name,
        code,
        description,
      };
      console.log('DISPLAY FORM!!! ');
      // Chamar a função de criação do Major (supondo que você tenha implementado essa função)
      createMajor(newMajor);
    });
}

function confirmDeletar(id, name) {
  majorIdToDelete = id; // Salva o id globalmente

  document.getElementById('confirmationMessage').textContent =
    `Deseja mesmo apagar o curso ${name}?`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal-criar').style.display = 'none';
  majorIdToDelete = null; // Limpa o id ao fechar
}

function deletarCurso() {
  if (!majorIdToDelete) return;

  fetch(`/major/remove/${majorIdToDelete}`, { method: 'POST' }).then(
    (response) => {
      if (response.ok) {
        window.alert('Major deletado com sucesso');
        window.location.reload();
      } else {
        window.alert('Erro ao deletar');
      }
    },
  );
  closeModal();
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('confirmDeleteBtn');
  if (btn) {
    btn.onclick = deletarCurso;
  }
});

async function createMajor(newMajor) {
  console.log('oi gata');
  try {
    const majorToSend = { ...newMajor };
    delete majorToSend.id; // Remove o campo 'id'

    const response = await fetch('/major/create', {
      method: 'POST', // Enviar via POST
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo
      },
      body: JSON.stringify(majorToSend), // Converte os dados em JSON e envia
    });

    if (response.ok) {
      window.alert('Curso criado com sucesso!');
      window.location.reload();

      closeModal(); // Fecha o modal após sucesso
      // Atualize a UI ou faça algo após o sucesso
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

/* ----------------------------- INDEX ----------------------------- */
function redirect(page) {
  window.location.href = `/${page}`;

  // Se estiver usando rotas com extensão .hbs ou similar:
  // window.location.href = `/${page}.hbs`;

  // Ou se for um sistema de rotas do seu backend:
  // window.location.href = `/paginas/${page}`;
}

/* ----------------------------- CADASTRO ----------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  axios
    .get('/major')
    .then((response) => {
      const select = document.getElementById('course');
      select.innerHTML =
        '<option value="" selected disabled>Selecione seu curso</option>';

      response.data.majors.forEach((major) => {
        const option = document.createElement('option');
        option.value = major._id;
        option.textContent = major.name;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar cursos:', error);
      document.getElementById('major').innerHTML =
        '<option value="" selected disabled>Erro ao carregar cursos</option>';
    });
});

/* ----------------------------- CADASTRO ----------------------------- */
