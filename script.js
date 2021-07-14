

const output = document.querySelector('.output');
console.log(output);
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
        localStorage.setItem('myList',JSON.stringify(myList))
    })
}
    
})

function maker() {
    myList.forEach((element,index) => {
        makeList(element,index)
    });
}

function makeList(element,index) {
    const div = document.createElement('div')
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
            localStorage.setItem('myList',JSON.stringify(myList))
        console.log(myList)
    })


    }
