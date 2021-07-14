

const output = document.querySelector('.output');
console.log(output);
const url = 'list.json'

window.addEventListener('DOMContentLoaded', () => {
    output.textContent = 'loading..';
    fetch(url).then(rep => rep.json())
    .then((data) => {
        console.log(data);
        output.innerHTML = "";
        data.forEach(element => {
            makeList(element)
        });
    })
})

function makeList(element) {
    const div = document.createElement('div')
    div.innerHTML = `${element.name} Number of Guests: ${element.guests}`;
    output.append(div)

    div.classList.add('active');
    
}