// Variável global para o modo (add/edit)
let currentMode = 'add';

// Função para carregar e exibir produtos na tabela
async function loadAndDisplayProducts() {
  try {
    const products = await loadProducts();
    updateProductTable(products);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    showError('Erro ao carregar lista de produtos');
  }
}

// Função para carregar produtos da API
async function loadProducts() {
  const response = await fetch('/product');
  if (!response.ok) throw new Error('Erro na requisição');
  return await response.json();
}

// Função para atualizar a tabela de produtos
function updateProductTable(products) {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  tbody.innerHTML = products
    .map(
      (product) => `
    <tr>
      <td>${product.name}</td>
      <td>R$ ${product.price.toFixed(2)}</td>
      <td>
        <div class='btn-options'>
          <button class='btn btn-sm btn-warning edit-btn' data-id='${product.id}'>✏️</button>
          <button class='btn btn-sm btn-danger delete-btn' data-id='${product.id}'>🗑️</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join('');
}

// Função para mostrar erros
function showError(message) {
  // Implemente uma forma de exibir erros para o usuário
  console.error(message);
}

// Função para carregar um produto específico
async function loadProduct(productId) {
  const response = await fetch(`/product/${productId}`);
  if (!response.ok) throw new Error('Produto não encontrado');
  return await response.json();
}

// Função para configurar os event listeners
function setupEventListeners() {
  // Botão de adicionar
  const addButton = document.querySelector('[data-bs-target="#productModal"]');
  if (addButton) {
    addButton.addEventListener('click', () => {
      currentMode = 'add';
      document.getElementById('modalTitle').textContent =
        'Adicionar Novo Produto';
      document.getElementById('productForm').reset();
      document.getElementById('productId').value = '';
    });
  }

  // Delegação de eventos para editar e deletar
  document.body.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit-btn');
    const deleteBtn = e.target.closest('.delete-btn');

    if (editBtn) handleEditProduct(editBtn);
    if (deleteBtn) handleDeleteProduct(deleteBtn);
  });

  // Salvar produto
  const saveButton = document.getElementById('saveProduct');
  if (saveButton) {
    saveButton.addEventListener('click', handleSaveProduct);
  }
}

// Função para lidar com a edição de produto
async function handleEditProduct(button) {
  currentMode = 'edit';
  const productId = button.dataset.id;

  try {
    const product = await loadProduct(productId);

    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    showError('Erro ao carregar dados do produto');
  }
}

// Função para lidar com a exclusão de produto
async function handleDeleteProduct(button) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  const productId = button.dataset.id;
  try {
    const response = await fetch(`/product/${productId}`, { method: 'DELETE' });
    if (response.ok) {
      loadAndDisplayProducts();
    } else {
      throw new Error('Falha ao excluir produto');
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    showError('Erro ao excluir produto');
  }
}

// Função para lidar com o salvamento de produto
async function handleSaveProduct() {
  const productData = {
    name: document.getElementById('productName').value.trim(),
    price: parseFloat(document.getElementById('productPrice').value),
  };

  // Validação básica
  if (!productData.name || isNaN(productData.price)) {
    showError('Nome e preço são obrigatórios');
    return;
  }

  const productId = document.getElementById('productId').value;
  const url =
    currentMode === 'add' ? '/product/create' : `/product/update/${productId}`;
  const method = 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error('Falha ao salvar produto');

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('productModal'),
    );
    if (modal) modal.hide();

    loadAndDisplayProducts();
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    showError('Erro ao salvar produto');
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadAndDisplayProducts();
});
