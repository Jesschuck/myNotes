const addBtn = document.getElementById('add')
const removeAllBtn = document.getElementById('clear')

/* Recupera as notas do localStorage convertendo a string JSON armazenada em 'notes' para um array. 
Se houver notas, a função addNewNote é chamada para cada nota, adicionando-as à interface. */
const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach((note) => addNewNote(note))
}

//Quando o botão é clicado, a função addNewNote é chamada criando assim uma nova nota.
addBtn.addEventListener('click', () => addNewNote())

//Cria uma nova nota com botões de edição e exclusão.
function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    `

  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLS() //atualiza o localStorage
  })

  //A função removeAllNotes é chamada quando o botão "Remover Todas as Notas" é clicado. A nota é adicionada ao corpo do documento.
  removeAllBtn.addEventListener('click', () => removeAllNotes())

  //Remove todas as notas presentes. Ela seleciona todas as notas, itera sobre elas e as remove.
  function removeAllNotes() {
    const notes = document.querySelectorAll('.note')

    notes.forEach((note) => {
      note.remove()
    })

    updateLS()
  }

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target

    main.innerHTML = marked(value)

    updateLS()
  })

  document.body.appendChild(note)
}

/*Esta função obtém todos os elementos <textarea> presentes no documento, extrai seus valores para um array (notes), 
converte esse array para uma string JSON e armazena no localStorage com a chave 'notes'. */
function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach((note) => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}
