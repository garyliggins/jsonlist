

const output = document.querySelector('.output');
const btn1 = document.createElement('button');
btn1.textContent = "Reload JSON Data"

btn1.addEventListener('click', reloader)

const input1 = document.createElement('input');
const input2 = document.createElement('input');
const btn2 = document.createElement('button');

const div1 = document.createElement('div')
div1.append(input1);
div1.append(input2);
div1.append(btn2);
btn2.textContent = 'Add to List';
input1.setAttribute('placeholder', 'Name')
input2.setAttribute('type', 'number')
input2.value = '1'
document.body.append(div1)
document.body.append(btn1)
btn2.addEventListener('click', addToList);



document.body.append(btn1);



const url = 'list.json'
let myList = [];
let localData = localStorage.getItem('myList')
console.log(localData)

window.addEventListener('DOMContentLoaded', () => {
    // output.textContent = 'loading..';
    if(localData){
        myList = JSON.parse(localStorage.getItem('myList'))
        maker();
    } else {
    fetch(url).then(rep => rep.json())
    .then((data) => {
        myList = data;
        // console.log(data);
       maker()
       saveToStorage();
    })
}
    
})

function reloader(){
    fetch(url).then(rep => rep.json())
    .then((data) => {
        myList = data;
        // console.log(data);
       maker()
       saveToStorage();
    })
}

function maker() {
    myList.forEach((element,index) => {
        makeList(element,index)
    });
}

function makeList(element,index) {
    const div = document.createElement('div')
    div.classList.add('box')
    div.innerHTML = `${element.name} Number of Guests: ${element.guests}`;
    output.append(div)

    

    if(element.status){
    div.classList.add('active');}
    else  { element.status = false 
        div.classList.add('notActive');
        }
    div.addEventListener('click', (e)=> {

        div.classList.toggle('active');
        div.classList.toggle('notActive')
        console.log(div.classList.contains('active'));
        if(div.classList.contains('active')){
            myList[index].status = true }
            else {
                myList[index].status = false
            }
            saveToStorage()
    })
    const span = document.createElement('span');
    span.textContent = 'X';
    div.append(span)
    span.addEventListener('click',(e) => {
        console.log(e)
            console.log(index)
        e.stopPropagation();
        div.remove();
        myList.splice(index,1)
       saveToStorage();
    })


    }

    function saveToStorage(){
        console.log(myList)
        localStorage.setItem('myList',JSON.stringify(myList))
    }

    function addToList() {
        console.log(input1.value);
        console.log(input2.value);
        const myObj ={
            'name': input1.value,
            'guests': input2.value,
            'status': false

        }
        const val = myList.length;
        myList.push(myObj);
        saveToStorage();
        makeList(myObj,val)
    }