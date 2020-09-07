let store
    :{
    isOpen:boolean,
    data:{
        id:string,
        name:string,
        checked:boolean
        }[],
    date:number }
    = {
    isOpen: true,
    data :[],
    date:0
}
enum day {SUNDAY,MONDAY ,TUESDAY,WENSDAY,THUESDAY,FIRDAY,SATURADAY}

const button = document.querySelector('button') as HTMLElement
const list = document.querySelector('.list-box') as HTMLElement
const list_add = document.querySelector('.list-add') as HTMLElement
const date_number = document.querySelector('.date-number') as HTMLElement
const dayEle = document.querySelector('.day') as HTMLElement
const monthEle = document.querySelector('.month') as HTMLElement
const yearEle = document.querySelector('.year') as HTMLElement
const add_list_button = document.querySelector('.add-list-btn') as HTMLElement
const input = document.getElementById('todo-input') as HTMLInputElement

const starting = ()=>{
    const todo = localStorage.getItem('todo')
    if(todo)
        store.data = JSON.parse(todo)
    displayTodo()
}
const setDate = ()=>{
    if(new Date().getDate().toString() !== localStorage.getItem('date'))
        localStorage.removeItem('todo')
    date_number.textContent = new Date().getDate().toString();
    dayEle.textContent = day[new Date().getDay()];
    monthEle.textContent = new Date().toDateString().split(' ')[1]
    yearEle.textContent = new Date().getFullYear().toString()
}
const openInput = () => {
    if(list_add) {
        list_add.classList.toggle('hide')
    }
}
const randomIdGenerator = ()=>{
    return Math.floor(Math.random()*1000000000000).toString();
}
const checked = (e:MouseEvent)=>{
    const selected = store.data.filter(todo=>{
        if(todo.id === (e.target as Element ).id){
            if(todo.checked)
                todo.checked =false
            else
                todo.checked = true
        }
        return todo
    })
    store.data = selected;
    localStorage.setItem('todo',JSON.stringify(store.data))
    displayTodo()
}
const displayTodo = ()=>{
    list.innerHTML = ''
    store.data.map(todo=>{
        const div = document.createElement('div')
        const li = document.createElement('li')
        const input = document.createElement('input')
        div.classList.add('todo-list')
        input.setAttribute('type','checkbox')
        input.classList.add('option-input','checkbox')
        input.addEventListener('click',checked)
        console.log(todo,'sdfd')
        li.innerText = todo.name
        if(todo.checked)
             li.classList.add('line')
        else
            li.classList.remove('line')
        input.checked = todo.checked
        input.id = todo.id.toString();
        div.append(li,input)
        list.append(div)
    })
}
const addTodo = ()=>{
    if(input.value){
        const newlist = {
            id:randomIdGenerator(),
            name:input.value,
            checked:false
        }
        store.data.push(newlist)
        displayTodo()
        localStorage.setItem('todo',JSON.stringify(store.data))
        input.value = '';
    }
    else {
        alert('No null allow')
    }

}

starting()
setDate()

button.addEventListener('click',openInput)
add_list_button.addEventListener('click',addTodo)
localStorage.setItem('date',new Date().getDate().toString())
