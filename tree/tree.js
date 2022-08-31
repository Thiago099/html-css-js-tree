
import '@fortawesome/fontawesome-free/css/all.css'
import './tree.css'

function expand(childrenElement, titleElement)
{
    childrenElement.style.display = 'block';
    titleElement.classList.add('caret-down');
    titleElement.classList.add('tree-title-collapse');
    titleElement.classList.remove('caret-left');
    titleElement.classList.remove('tree-title-expand');
}
function collapse(childrenElement, titleElement)
{
    childrenElement.style.display = 'none';
    titleElement.classList.add('caret-left');
    titleElement.classList.add('tree-title-expand');
    titleElement.classList.remove('caret-down');
    titleElement.classList.remove('tree-title-collapse');
}

export function renderTree(treeElement,treeData,defaultCollapsed=false)
{
    treeElement.classList.add('tree')
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
            return 
        } 
        titleElement.draggable = true 
        allElements.push({childrenElement, titleElement})

        data.children.forEach(child => {
            createTree(child, childrenElement)
        })
        if(defaultCollapsed)
        {
            collapse(childrenElement, titleElement)
        }
        else
        {
            expand(childrenElement, titleElement)
        }
        titleElement.addEventListener('click', function(e) {
            e.stopPropagation();
            if(!childrenElement) return
            if(childrenElement.style.display === 'none')
            {
                expand(childrenElement, titleElement)
            }
            else
            {
                collapse(childrenElement, titleElement)
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
            collapse(childrenElement, titleElement)
        }
    })


    expandAllElement.addEventListener('click', function(e) {
        for(const {childrenElement, titleElement} of allElements)
        {
            expand(childrenElement, titleElement)
        }
    })
}

