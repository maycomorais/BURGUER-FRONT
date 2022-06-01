// Base url
const baseUrl = "http://localhost:3007";
let listaBurguers = [];

// Listar Todos
const listarTodos = async () => {
  const response = await fetch(`${baseUrl}/burguers/todos`);

  const burguers = await response.json();

  listaBurguers = burguers;

  return burguers;
};

// Buscar por Id
const listarPorId = async (id) => {
  const response = await fetch(`${baseUrl}/burguers/burguer/${id}`);

  if (response.status === 404) {
    return "Nenhum Item encontrado";
  }

  const burguer = await response.json();

  return burguer;
};

// criar lanche
const criarNovoBurguer = async (nome, ingredientes, foto, preco, categoria) => {
  const burguer = {
    nome,
    ingredientes,
    foto,
    preco,
    categoria,
  };

  const response = await fetch(`${baseUrl}/burguers/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(burguer),
  });

  const novoBurguer = await response.json();

  return novoBurguer;
};

// atualizar Burguer
const refreshBurguer = async (
  id,
  nome,
  ingredientes,
  foto,
  preco,
  categoria
) => {
  const burguer = {
    nome,
    ingredientes,
    foto,
    preco,
    categoria,
  };

  const response = await fetch(`${baseUrl}/burguers/refresh/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(burguer),
  });

  const burguerRefresh = await response.json();

  return burguerRefresh;
};

const deleteBurguer = async (id) => {
  const response = await fetch(`${baseUrl}/burguers/delete/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

// Manipilação de Documento

const imprimirTodosItems = async () => {
  const burguers = await listarTodos();

  document.getElementById("card").innerHTML = ``;

  burguers.forEach((element) => {
    if (element.categoria == "lanche") {
      document.getElementById("card").insertAdjacentHTML(
        "beforeend",
        `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                    <button class="editar" onclick="mostrarModalEditar('${element._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="deletar" onclick="mostrarModalDeletar('${element._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            `
      );
    }
  });
  burguers.forEach((element) => {
    if (element.categoria == "bebida") {
      document.getElementById("card2").insertAdjacentHTML(
        "beforeend",
        `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                  <button class="editar" onclick="mostrarModalEditar('${element._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="deletar" onclick="mostrarModalDeletar('${element._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            `
      );
    }
  });
  burguers.forEach((element) => {
    if (element.categoria == "porção") {
      document.getElementById("card3").insertAdjacentHTML(
        "beforeend",
        `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                  <button class="editar" onclick="mostrarModalEditar('${element._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="deletar" onclick="mostrarModalDeletar('${element._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            `
      );
    }
  });
  burguers.forEach((element) => {
    if (element.categoria == "sobremesa") {
      document.getElementById("card4").insertAdjacentHTML(
        "beforeend",
        `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                  <button class="editar" onclick="mostrarModalEditar('${element._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="deletar" onclick="mostrarModalDeletar('${element._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            `
      );
    }
  });
};

imprimirTodosItems();

// PRINTAR POR ID
const printarPorId = async () => {
  document.getElementById("pesquisado").innerHTML = "";

  const input = document.getElementById("inputNomeBurguer");
  const nome = input.value;

  const burguerSelecionado = listaBurguers.find((elem) => elem.nome === nome);
  if (burguerSelecionado === undefined) {
    const mensagemDeErro = document.createElement("p");
    mensagemDeErro.id = "mensagemDeErro";
    mensagemDeErro.classList.add("MensagemDeErro");
    mensagemDeErro.innerText = "Nenhum Item Encontrado";

    document.getElementById("pesquisado").appendChild(mensagemDeErro);
  }

  const id = burguerSelecionado._id;

  const burguer = await listarPorId(id);

  if (burguer === false) {
    const mensagemDeErro = document.createElement("p");
    mensagemDeErro.id = "mensagemDeErro";
    mensagemDeErro.classList.add("MensagemDeErro");
    mensagemDeErro.innerText = "Nenhum Item Encontrado";

    document.getElementById("pesquisado").appendChild(mensagemDeErro);
  } else {
    document.getElementById("pesquisado").innerHTML = `
        <div class="box">
            <img src="${burguer.foto}" alt="${burguer.nome}">
            <div class="nome"> ${burguer.nome}</div>
            <div class="descricao"> ${burguer.ingredientes} </div>
            <div class="preco"><span>R$ </span>${burguer.preco}</div>
            <div class="button">
              <button class="editar" onclick="mostrarModalEditar(${burguer._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="deletar" onclick="mostrarModalDeletar('${burguer._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `;
  }
};

// MODAIS

// CHAMAR O MODAL CRIAR
const mostrarModalCriar = () => {
  document.getElementById("fundoModalCriar").style.display = "flex";
};

// ESCONDER O MODAL CRIAR
const esconderModalCriar = () => {
  document.getElementById("inputNome").value = "";
  document.getElementById("inputIngredientes").value = "";
  document.getElementById("inputFoto").value = "";
  document.getElementById("inputPreco").value = "";
  document.getElementById("inputCategoria").value = "";

  document.getElementById("fundoModalCriar").style.display = "none";
};

// CRIAR NOVO ITEM
const cadastrarNovoBurguer = async () => {
  const nome = document.getElementById("inputNome").value;
  const ingredientes = document.getElementById("inputIngredientes").value;
  const foto = document.getElementById("inputFoto").value;
  const preco = document.getElementById("inputPreco").value;
  const categoria = document.getElementById("inputCategoria").value;

  const burguer = await criarNovoBurguer(
    nome,
    ingredientes,
    foto,
    preco,
    categoria
  );

  if (burguer.categoria == "lanche") {
    document.getElementById("card").insertAdjacentHTML(
      "beforeend",
      `
          <div class="box">
              <img src="${burguer.foto}" alt="${burguer.nome}">
              <div class="nome"> ${burguer.nome}</div>
              <div class="descricao"> ${burguer.ingredientes} </div>
              <div class="preco"><span>R$ </span>${burguer.preco}</div>
              <div class="button">
                <button class="editar" onclick="mostrarModalEditar(${burguer._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deletar" onclick="mostrarModalDeletar('${burguer._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
              </div>
          </div>
          `
    );
  }
  if (burguer.categoria == "bebida") {
    document.getElementById("card2").insertAdjacentHTML(
      "beforeend",
      `
          <div class="box">
              <img src="${burguer.foto}" alt="${burguer.nome}">
              <div class="nome"> ${burguer.nome}</div>
              <div class="descricao"> ${burguer.ingredientes} </div>
              <div class="preco"><span>R$ </span>${burguer.preco}</div>
              <div class="button">
                <button class="editar" onclick="mostrarModalEditar(${burguer._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deletar" onclick="mostrarModalDeletar('${burguer._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
              </div>
          </div>
          `
    );
  }
  if (burguer.categoria == "porção") {
    document.getElementById("card3").insertAdjacentHTML(
      "beforeend",
      `
          <div class="box">
              <img src="${burguer.foto}" alt="${burguer.nome}">
              <div class="nome"> ${burguer.nome}</div>
              <div class="descricao"> ${burguer.ingredientes} </div>
              <div class="preco"><span>R$ </span>${burguer.preco}</div>
              <div class="button">
                <button class="editar" onclick="mostrarModalEditar(${burguer._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deletar" onclick="mostrarModalDeletar('${burguer._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
              </div>
          </div>
          `
    );
  }
  if (burguer.categoria == "sobremesa") {
    document.getElementById("card4").insertAdjacentHTML(
      "beforeend",
      `
          <div class="box">
              <img src="${burguer.foto}" alt="${burguer.nome}">
              <div class="nome"> ${burguer.nome}</div>
              <div class="descricao"> ${burguer.ingredientes} </div>
              <div class="preco"><span>R$ </span>${burguer.preco}</div>
              <div class="button">
                <button class="editar" onclick="mostrarModalEditar(${burguer._id}')"><span>EDITAR</span><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deletar" onclick="mostrarModalDeletar('${burguer._id}')" id = "deletarModal"><span>DELETAR</span><i class="fa-solid fa-trash-can"></i></button>
              </div>
          </div>
          `
    );
  }
  mostrarModalNotificacao("sucesso", "Item criado com sucesso!")
  esconderModalCriar();
  imprimirTodosItems();
};

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

// CHAMAR O MODAL DELETAR
const mostrarModalDeletar = (id) => {
  document.getElementById("fundoModalDeletar").style.display = "flex";

  const botaoConfirmar = document.getElementById("confirmarDelete");

  botaoConfirmar.addEventListener("click", async () => {
    const exclusao = await deleteBurguer(id);

    if (exclusao) {
      mostrarModalNotificacao("sucesso", "Item excluído com sucesso!");
    } else {
      mostrarModalNotificacao("erro", "Item não encontrado!");
    }
    esconderModalDeletar();
    imprimirTodosItems();
  });
};

// ESCONDER O MODAL DELETAR
const esconderModalDeletar = () => {
  document.getElementById("fundoModalDeletar").style.display = "none";
};

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

// CHAMAR O MODAL EDITAR
const mostrarModalEditar = (id) => {
  document.getElementById("fundoModalEditar").style.display = "flex";

  const burguer = listaBurguers.find((element) => element._id === id);

  document.getElementById("inputNomeEdicao").value = burguer.nome;
  document.getElementById("inputIngredientesEdicao").value = burguer.ingredientes;
  document.getElementById("inputFotoEdicao").value = burguer.foto;
  document.getElementById("inputPrecoEdicao").value = burguer.preco;
  document.getElementById("inputCategoriaEdicao").value = burguer.categoria;

  const botaoAtualizar = document.getElementById('confirmarAtualizacao');

  botaoAtualizar.addEventListener("click",  async () => {
    const nome = document.getElementById("inputNomeEdicao").value;
    const ingredientes = document.getElementById("inputIngredientesEdicao").value;
    const foto = document.getElementById("inputFotoEdicao").value;
    const preco = document.getElementById("inputPrecoEdicao").value;
    const categoria = document.getElementById("inputCategoriaEdicao").value;


    await refreshBurguer(id,
      nome,
      ingredientes,
      foto,
      preco,
      categoria
      );

      mostrarModalNotificacao("sucesso", "Item atualizado com sucesso!")
      esconderModalEditar()
      imprimirTodosItems();
  });
};

// ESCONDER O MODAL CRIAR
const esconderModalEditar = () => {
  document.getElementById("fundoModalEditar").style.display = "none";
};

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

// MOSTRAR MODAL NOTIFICAÇÃO
const mostrarModalNotificacao = (tipo, frase) => {
  const notificacaoSpan = document.getElementById("notificacaoSpan");
  const notificacaoP = document.getElementById("notificacaoP");

  if(tipo === "sucesso"){
    notificacaoSpan.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    notificacaoSpan.classList.add("notificacao-span-sucesso")
  } else if(tipo === "erro") {
    notificacaoSpan.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
    notificacaoSpan.classList.add("notificacao-span-erro")
  }

  notificacaoP.innerText = frase;

  document.getElementById("notificacao").style.display = "flex";

  setTimeout(() => {
    esconderModalNotificacao();
  }, 3500)
};

// ESCONDER MODAL NOTIFICAÇÃO
const esconderModalNotificacao = () => {
  document.getElementById("notificacao").style.display = "none";
};

