// ============================
// STORAGE — persiste no localStorage
// ============================

const DB = {
  getVendas() {
    return JSON.parse(localStorage.getItem('vendas') || '[]');
  },
  salvarVenda(venda) {
    const vendas = this.getVendas();
    venda.id = Date.now();
    venda.hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    venda.data = new Date().toLocaleDateString('pt-BR');
    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));
  },
  getMovimentos() {
    return JSON.parse(localStorage.getItem('movimentos') || '[]');
  },
  salvarMovimento(mov) {
    const movs = this.getMovimentos();
    mov.id = Date.now();
    mov.hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    mov.data = new Date().toLocaleDateString('pt-BR');
    movs.push(mov);
    localStorage.setItem('movimentos', JSON.stringify(movs));
  },
  getHoje() {
    return new Date().toLocaleDateString('pt-BR');
  },
  getVendasHoje() {
    const hoje = this.getHoje();
    return this.getVendas().filter(v => v.data === hoje);
  },
  getMovimentosHoje() {
    const hoje = this.getHoje();
    return this.getMovimentos().filter(m => m.data === hoje);
  }
};

// ============================
// UTILITÁRIOS
// ============================

function formatBRL(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function totalPorCategoria(vendas, categoria) {
  return vendas
    .filter(v => v.categoria === categoria)
    .reduce((acc, v) => acc + Number(v.valor), 0);
}

function totalEntradas(movimentos) {
  return movimentos
    .filter(m => m.tipo === 'entrada')
    .reduce((acc, m) => acc + Number(m.valor), 0);
}

function totalSaidas(movimentos) {
  return movimentos
    .filter(m => m.tipo === 'saida')
    .reduce((acc, m) => acc + Number(m.valor), 0);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function dataFormatada() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });
}
