import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'


var treeData = 
  [
    {
      "name": "Level 1: A",
      "children": [
        {
          "name": "Son of A",
          "children": [
            {
              "name": "Grandson of A"
            }
          ]
        },
        {
          "name": "Daughter of A"
        }
      ]
    },
    {
      "name": "Level 1: B",
      "children": [
        {
          "name": "Son of B"
        },
        {
          "name": "Daughter of B"
        }
      ]
    }
  ];


var treeElement = document.getElementById('tree');
const allElements = []
// literate over the treeData and create the tree structure in treeElement
function createTree(data, element) {
  var namedContainer = document.createElement('div');
  namedContainer.style.paddingLeft = '15px';
  namedContainer.innerHTML = data.name
  namedContainer.draggable = true
  const childContainer = document.createElement('div');
  namedContainer.appendChild(childContainer);
  
  element.appendChild(namedContainer);
  if(!data.children){
    namedContainer.style.cursor = 'default'
    namedContainer.addEventListener('click', function(e){
      e.stopPropagation()
    })
    return 
  } 
  allElements.push({childContainer, namedContainer})
  data.children.forEach(child => {
    createTree(child, childContainer)
  })
    namedContainer.style.cursor = 'pointer';
    namedContainer.classList.add('caret-down');
    namedContainer.addEventListener('click', function(e) {
    e.stopPropagation();
    if(!childContainer) return
    if(childContainer.style.display === 'none')
    {
      childContainer.style.display = 'block';
      this.classList.remove('caret-left');
      this.classList.add('caret-down');
    }
    else
    {
      childContainer.style.display = 'none';
      this.classList.remove('caret-down');
      this.classList.add('caret-left');
    }
  })
}
for(const element of treeData)
{
  createTree(element, treeElement);
}

const collapseAllElement = document.getElementById('collapse-all');

collapseAllElement.addEventListener('click', function(e) {
  for(const {childContainer, namedContainer} of allElements)
  {
    childContainer.style.display = 'none';
    namedContainer.classList.remove('caret-down');
    namedContainer.classList.add('caret-left');
  }
})

const expandAllElement = document.getElementById('expand-all');

expandAllElement.addEventListener('click', function(e) {
  for(const {childContainer, namedContainer} of allElements)
  {
    childContainer.style.display = 'block';
    namedContainer.classList.remove('caret-left');
    namedContainer.classList.add('caret-down');
  }
})
