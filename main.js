
import '@fortawesome/fontawesome-free/css/all.css'
import { renderTree } from './tree/tree';

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


const treeElement = document.getElementById('tree');


renderTree(treeElement, treeData);