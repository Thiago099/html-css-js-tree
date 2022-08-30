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
  const containerElement = document.createElement('div');
  const titleElement = document.createElement('div');
  titleElement.classList.add('tree-title');
  titleElement.innerHTML = data.name
  titleElement.draggable = true
  containerElement.appendChild(titleElement)
  containerElement.style.paddingLeft = '15px';
  const childrenElement = document.createElement('div');
  element.appendChild(containerElement);
  containerElement.appendChild(childrenElement);
  if(!data.children){
    containerElement.style.cursor = 'default'
    containerElement.addEventListener('click', function(e){
      e.stopPropagation()
    })
    return 
  } 
  allElements.push({childrenElement, titleElement})
  data.children.forEach(child => {
    createTree(child, childrenElement)
  })
    titleElement.classList.add('caret-down');
    titleElement.classList.add('tree-title-collapse')
    titleElement.addEventListener('click', function(e) {
    e.stopPropagation();
    if(!childrenElement) return
    if(childrenElement.style.display === 'none')
    {
      childrenElement.style.display = 'block';
      this.classList.remove('caret-left');
      this.classList.add('caret-down');
      this.classList.add('tree-title-collapse');
      this.classList.remove('tree-title-expand');
    }
    else
    {
      childrenElement.style.display = 'none';
      this.classList.remove('caret-down');
      this.classList.add('caret-left');
      this.classList.add('tree-title-expand');
      this.classList.remove('tree-title-collapse');
    }
  })
}
for(const element of treeData)
{
  createTree(element, treeElement);
}

const collapseAllElement = document.getElementById('collapse-all');

collapseAllElement.addEventListener('click', function(e) {
  for(const {childrenElement, titleElement} of allElements)
  {
    childrenElement.style.display = 'none';
    titleElement.classList.remove('caret-down');
    titleElement.classList.add('caret-left');
  }
})

const expandAllElement = document.getElementById('expand-all');

expandAllElement.addEventListener('click', function(e) {
  for(const {childrenElement, titleElement} of allElements)
  {
    childrenElement.style.display = 'block';
    titleElement.classList.remove('caret-left');
    titleElement.classList.add('caret-down');
  }
})
