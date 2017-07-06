/*jshint esversion: 6 */

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteButton = document.querySelector('#deleteItem');
const checkAllItems = document.querySelector('#checkAllItems');


function addItem(e) {
    e.preventDefault(); //prevents page from reloading after form submit
    const text = this.querySelector('input[name=item]').value; //"this" referst to the form submit that calls addItem
    const item = {
        text: text,
        done: false
    };
    this.reset(); //clear form
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        console.log("hitting");
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</ label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; //skip this unless it's an input
    console.log(e.target.dataset.index);
    items[e.target.dataset.index].done = !items[e.target.dataset.index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);

}

function clearLocalStorage() {
    localStorage.clear();
}

function checkAll() {
    items.forEach(function(item) {
        item.done = true;
    });
}

populateList(items, itemsList);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
deleteButton.addEventListener('click', clearLocalStorage)
checkAllItems.addEventListener('click', checkAll)
