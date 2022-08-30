
import '@fortawesome/fontawesome-free/css/all.css'
import './tree.css'


export function renderTree(treeElement,treeData)
{
    const expandAllElement = document.createElement('i')
    const collapseAllElement = document.createElement('i')
    collapseAllElement.classList.add('fa-solid','fa-square-minus','clickable','hover-red','menu-icon')
    expandAllElement.classList.add('fa-solid','fa-square-plus','clickable','hover-green','menu-icon')
    treeElement.appendChild(collapseAllElement)
    treeElement.appendChild(expandAllElement)


    const allElements = []
    // literate over the treeData and create the tree structure in treeElement
    function createTree(data, element) {
        const containerElement = document.createElement('div');
        const titleElement = document.createElement('div');
        titleElement.classList.add('tree-title');
        titleElement.innerHTML = data.name
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
        titleElement.draggable = true 
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


    collapseAllElement.addEventListener('click', function(e) {
        for(const {childrenElement, titleElement} of allElements)
        {
        childrenElement.style.display = 'none';
        titleElement.classList.remove('caret-down');
        titleElement.classList.add('caret-left');
        titleElement.classList.add('tree-title-expand');
        titleElement.classList.remove('tree-title-collapse');
        }
    })


    expandAllElement.addEventListener('click', function(e) {
        for(const {childrenElement, titleElement} of allElements)
        {
        childrenElement.style.display = 'block';
        titleElement.classList.remove('caret-left');
        titleElement.classList.add('caret-down');
        titleElement.classList.add('tree-title-collapse');
        titleElement.classList.remove('tree-title-expand');
        }
    })
}

