class TodoList {
	constructor() {
		this.input = document.querySelector("input[type='text']")
		this.ul = document.querySelector('ul')
		this.spans = document.getElementsByTagName('span')
		this.pencil = document.querySelector('#pencil')
		this.saveBtn = document.querySelector('.save')
		this.clearBtn = document.querySelector('.clear')
		this.tipsBtn = document.querySelector('.tipBtn')
		this.closeBtn = document.querySelector('.closeBtn')
		this.overlay = document.getElementById('overlay')

		this.loadTodo()
		this.attachEventListeners()
	}

	deleteTodo() {
		for (const span of this.spans) {
			span.addEventListener('click', event => {
				span.parentElement.remove()
				event.stopPropagation()
			})
		}
	}

	loadTodo() {
		if (localStorage.getItem('todoList')) {
			this.ul.innerHTML = localStorage.getItem('todoList')
			this.deleteTodo()
		}
	}

	addTodo(event) {
		if (event.which === 13) {
			const li = document.createElement('li')
			const spanElement = document.createElement('span')
			const icon = document.createElement('i')

			const newTodo = this.input.value
			this.input.value = ' '

			icon.classList.add('fas', 'fa-trash-alt')
			spanElement.append(icon)
			this.ul.appendChild(li).append(spanElement, newTodo)

			this.deleteTodo()
		}
	}

	toggleTodoState(ev) {
		if (ev.target.tagName === 'LI') {
			ev.target.classList.toggle('checked')
		}
	}

	toggleInputVisibility() {
		this.input.classList.toggle('display')
	}

	saveTodoList() {
		localStorage.setItem('todoList', this.ul.innerHTML)
	}

	clearTodoList() {
		this.ul.innerHTML = ''
		localStorage.removeItem('todoList')
	}

	displayOverlay() {
		this.overlay.style.height = '100%'
	}

	closeOverlay() {
		event.preventDefault
		this.overlay.style.height = '0'
	}

	attachEventListeners() {
		this.input.addEventListener('keypress', this.addTodo.bind(this))
		this.ul.addEventListener('click', this.toggleTodoState.bind(this), false)
		this.pencil.addEventListener('click', this.toggleInputVisibility.bind(this))
		this.saveBtn.addEventListener('click', this.saveTodoList.bind(this))
		this.clearBtn.addEventListener('click', this.clearTodoList.bind(this))
		this.tipsBtn.addEventListener('click', this.displayOverlay.bind(this))
		this.closeBtn.addEventListener('click', this.closeOverlay.bind(this))
		this.deleteTodo()
	}

	async fetchData() {
		const response = await fetch('https://example.com/api/data')
		const data = await response.json()
		console.log(data)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const todoList = new TodoList()
	todoList.fetchData()
})
