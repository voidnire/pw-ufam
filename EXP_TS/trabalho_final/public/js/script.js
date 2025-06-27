let majorIdToDelete = null;
let majorNameToDelete = null;

function displayForm() {
  document.getElementById('modal-criar').style.display = 'flex';

  document
    .getElementById('createMajorForm')
    .addEventListener('submit', (event) => {
      event.preventDefault(); // Impede que a página seja recarregada ao enviar o formulário

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
  document.getElementById('confirmationMessage').textContent =
    `Deseja mesmo apagar o curso ${name}?`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal-criar').style.display = 'none';
}

function deletarCurso(majorIdToDelete) {
  console.log({ majorIdToDelete });

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

async function createMajor(newMajor) {
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
    } else {
      window.alert('Erro ao criar o curso');
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}
