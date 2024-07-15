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

    // Mouse events
    objectReplica.onmousedown = function(ev) {
        ev.preventDefault(); // Prevent default behavior to avoid selection
        objectCloneDragOrigin(ev, this.parentNode);
    };

    // Touch events
    objectReplica.ontouchstart = function(ev) {
        ev.preventDefault(); // Prevent default behavior like scrolling
        var touch = ev.touches[0];
        objectCloneDragOrigin(touch, this.parentNode);
    };

    document.getElementById('svgContainer').appendChild(objectReplica);
}

function objectCloneDragOrigin(ev, element) {
    if (isDragging) {
        var dragImage = document.getElementById('dragImage');

        if (!ghostImage.isAppendedToOrigin) {
            element.appendChild(dragImage);
            ghostImage.isAppendedToOrigin = true;
            ghostImage.isAppendedToDestination = false;
        }

        var x, y;
        if (ev.type === 'touchmove') {
            var touch = ev.touches[0];
            x = touch.pageX;
            y = touch.pageY;
        } else {
            x = ev.pageX;
            y = ev.pageY;
        }

        dragImage.setAttribute('x', x);
        dragImage.setAttribute('y', y);
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

        // Mouse events
        objectReplica.onmousedown = function(ev) {
            ev.preventDefault(); // Prevent default behavior to avoid selection
            enableMove(this);
        };

        // Touch events
        objectReplica.ontouchstart = function(ev) {
            ev.preventDefault(); // Prevent default behavior like scrolling
            enableMove(this);
        };

        // Snap to grid
        var snappedPosition = snapToGrid(ev.pageX, ev.pageY);
        objectReplica.setAttribute('x', snappedPosition.x);
        objectReplica.setAttribute('y', snappedPosition.y);

        objectReplica.removeAttribute('onmousedown');
        objectReplica.removeAttribute('onmousemove');
        objectReplica.removeAttribute('onmouseup');
        objectReplica.removeAttribute('onmouseleave');
        objectReplica.setAttribute('onmousedown', 'enableMove(this)');
        objectReplica.setAttribute('onmouseup', 'disableMove(this)');
        objectReplica.id = 'appendedObject';

        // Add class for selection
        objectReplica.classList.add('selectable');

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
        var x, y;
        if (ev.type === 'touchmove') {
            var touch = ev.touches[0];
            x = touch.pageX;
            y = touch.pageY;
        } else {
            x = ev.pageX;
            y = ev.pageY;
        }

        if (targetObject.isClickedOnce) {
            offx = x - targetObject.toRePosition.getAttribute('x');
            offy = y - targetObject.toRePosition.getAttribute('y');
            targetObject.isClickedOnce = false;
        }

        objx = (x - offx);
        objy = (y - offy);

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
    var gridSize = 3; // 6cm in pixels (1cm = 1px) 3 because 50% in size
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

// Event listeners for mouse events
document.addEventListener('mousedown', function(ev) {
    objectCloneGet(ev.target);
});

document.addEventListener('mousemove', function(ev) {
    objectCloneDragOrigin(ev, document.body);
});

document.addEventListener('mouseup', function(ev) {
    objectCloneDrop(ev, document.body);
});

// Event listeners for touch events
document.addEventListener('touchstart', function(ev) {
    objectCloneGet(ev.targetTouches[0].target);
});

document.addEventListener('touchmove', function(ev) {
    objectCloneDragOrigin(ev, document.body);
});

document.addEventListener('touchend', function(ev) {
    objectCloneDrop(ev.changedTouches[0], document.body);
});