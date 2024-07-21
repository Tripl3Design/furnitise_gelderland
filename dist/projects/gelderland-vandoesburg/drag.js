var isDragging = false;
var objectToClone, objectReplica;
var ghostImage = { 'isAppendedToOrigin': false, 'isAppendedToDestination': false };

function objectCloneGet(element) {
    objectToClone = element;
    isDragging = true;

    objectReplica = objectToClone.cloneNode(true);
    objectReplica.style.opacity = "0.5";
    objectReplica.id = "dragImage";
    objectReplica.style.position = "absolute";

    document.getElementById('svgContainer').appendChild(objectReplica);

    // Remove 'selected' class from any previously selected element
    var previouslySelected = document.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }

    // Add 'selected' class to the element being cloned
    element.classList.add('selected');
}

function objectCloneDragOrigin(ev, element) {
    if (isDragging) {
        var dragImage = document.getElementById('dragImage');

        if (!ghostImage.isAppendedToOrigin) {
            element.appendChild(dragImage);
            ghostImage.isAppendedToOrigin = true;
            ghostImage.isAppendedToDestination = false;
        }

        dragImage.setAttribute('x', ev.offsetX);
        dragImage.setAttribute('y', ev.offsetY);
    }
}

function objectCloneDragDestination(ev, element) {
    if (isDragging) {
        var dragImage = document.getElementById('dragImage');

        if (!ghostImage.isAppendedToDestination) {
            element.appendChild(dragImage);
            ghostImage.isAppendedToDestination = true;
            ghostImage.isAppendedToOrigin = false;
        }

        dragImage.setAttribute('x', ev.offsetX);
        dragImage.setAttribute('y', ev.offsetY);
    }
}

function objectCloneDrop(ev, dropzone) {
    if (isDragging) {
        var objectReplica = objectToClone.cloneNode(true);

        // Snap to grid
        var snappedPosition = snapToGrid(ev.offsetX, ev.offsetY);
        objectReplica.setAttribute('x', snappedPosition.x);
        objectReplica.setAttribute('y', snappedPosition.y);

        objectReplica.removeAttribute('onmousedown');
        objectReplica.removeAttribute('onmousemove');
        objectReplica.removeAttribute('onmouseup');
        objectReplica.removeAttribute('onmouseleave');
        objectReplica.setAttribute('onmousedown', 'enableMove(this)');
        objectReplica.setAttribute('onmouseup', 'disableMove(this)');
        objectReplica.id = 'appendedObject';

        // Remove 'selected' class from any previously selected element
        var previouslySelected = document.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }

        // Add class for selection
        objectReplica.classList.add('selectable');

        // Add 'selected' class to the objectReplica
        objectReplica.classList.add('selected');

        document.getElementById('svgDragzone').removeChild(document.getElementById('dragImage'));
        dropzone.appendChild(objectReplica);

        isDragging = false;
    }
}

function disableDrag(e) {
    if (isDragging) {
        e.removeChild(document.getElementById('dragImage'));
        isDragging = false;
        ghostImage.isAppendedToOrigin = false;
        ghostImage.isAppendedToDestination = false;
    }
}

function indicateDrag(dropzone) {
    if (isDragging) {
        dropzone.style.cursor = "pointer";
    } else {
        dropzone.style.cursor = "auto";
    }
}

var targetObject = {
    'isMoveable': false,
    'isClickedOnce': false,
    'toReAppend': null,
    'toRePosition': null
};

function enableMove(ele) {
    // Deselect all other elements
    var selectedObjects = document.querySelectorAll('.selectable');
    selectedObjects.forEach(function (obj) {
        obj.classList.remove('selected');
    });

    // Select the current element
    ele.classList.add('selected');

    targetObject.isMoveable = true;
    targetObject.toReAppend = ele;
    targetObject.toRePosition = ele;
}

function reAppend(dropzone) {
    if (targetObject.toReAppend && !targetObject.toReAppend.parentNode) {
        dropzone.appendChild(targetObject.toReAppend);
    }
}

function moveObject(ev, target) {
    if (targetObject.isMoveable) {
        if (targetObject.isClickedOnce) {
            offx = ev.pageX - targetObject.toRePosition.getAttribute('x');
            offy = ev.pageY - targetObject.toRePosition.getAttribute('y');
            targetObject.isClickedOnce = false;
        }

        objx = (ev.pageX - offx);
        objy = (ev.pageY - offy);

        // Snap to grid
        var snappedPosition = snapToGrid(objx, objy);
        targetObject.toRePosition.setAttribute('x', snappedPosition.x);
        targetObject.toRePosition.setAttribute('y', snappedPosition.y);
    }
}

function disableMove() {
    targetObject.isMoveable = false;
    targetObject.isClickedOnce = true;
}

function snapToGrid(x, y) {
    var gridSize = 6; // 6cm in pixels (1cm = 1px)
    return {
        x: Math.round(x / gridSize) * gridSize,
        y: Math.round(y / gridSize) * gridSize
    };
}

function deleteSelected() {
    var selectedObject = document.querySelector('.selected');
    if (selectedObject) {
        selectedObject.parentNode.removeChild(selectedObject);
        // Clear the reference to the deleted object
        targetObject.toReAppend = null; // Assuming targetObject.toReAppend was defined somewhere else
    }
}

function rotateSelected() {
    var selectedObject = document.querySelector('.selected');
    if (selectedObject) {
        var rotationGroup = selectedObject.querySelector('g');
        if (rotationGroup) {
            var currentTransform = rotationGroup.getAttribute('transform');
            var currentRotation = parseFloat(currentTransform.match(/rotate\(([-]*\d+)/)[1]) || 0;
            var newRotation = (currentRotation + 90) % 360; // Rotate by 90 degrees clockwise
            var newTransform = currentTransform.replace(/rotate\(([-]*\d+)/, 'rotate(' + newRotation);

            rotationGroup.setAttribute('transform', newTransform);
        }
    }
}

// Event listener for keydown events to handle delete and rotate functionalities
document.addEventListener('keydown', function (event) {
    if (event.key === 'Delete' || event.key === 'Backspace' || event.keyCode === 46) {
        deleteSelected();
    } else if (event.key === 'r' || event.key === 'R') {
        rotateSelected();
    }
});
