const foodList = document.getElementById("food-list")
const addItem = document.getElementById("add-item")
const items = JSON.parse(localStorage.getItem('items')) || [];

function add(e){
    e.preventDefault();
    const text = (document.querySelector("[name = item]")).value
    const itemObj = {
        text,
        done: false
    }

    items.push(itemObj)
    populateList(items, foodList);
    localStorage.setItem("items", JSON.stringify(items))
    this.reset()
    console.log(items)
}

function populateList(elements = [], list) {
    list.innerHTML = elements.map((elements, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${elements.done ? 'checked' : ''} />
          <label for="item${i}">${elements.text}</label>
        </li>
      `;
    }).join('');
}

function toggle(e){
    if (!e.target.matches('input')) return; 
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items))
    populateList(items, foodList);
}

addItem.addEventListener("submit", add)
foodList.addEventListener("click", toggle)

populateList(items, foodList);