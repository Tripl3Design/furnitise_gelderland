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

    // Add mouse event listeners
    objectReplica.addEventListener('mousemove', function(ev) {
        objectCloneDrag(ev, element);
    }, false);

    objectReplica.addEventListener('mouseup', function(ev) {
        objectCloneDrop(ev, element);
    }, false);

    // Add touch event listeners
    objectReplica.addEventListener('touchmove', function(ev) {
        ev.preventDefault(); // Prevent scrolling on touch devices
        var touch = ev.touches[0];
        objectCloneDrag(touch, element);
    }, false);

    objectReplica.addEventListener('touchend', function(ev) {
        var touch = ev.changedTouches[0];
        objectCloneDrop(touch, element);
    }, false);
}

function objectCloneDrag(ev, element) {
    if (isDragging) {
        var dragImage = document.getElementById('dragImage');

        // Determine if the element is being dragged to the original or a destination
        var destinationElement = determineDestinationElement(ev);
        if (destinationElement) {
            if (!ghostImage.isAppendedToDestination) {
                destinationElement.appendChild(dragImage);
                ghostImage.isAppendedToDestination = true;
                ghostImage.isAppendedToOrigin = false;
            }
        } else {
            if (!ghostImage.isAppendedToOrigin) {
                element.appendChild(dragImage);
                ghostImage.isAppendedToOrigin = true;
                ghostImage.isAppendedToDestination = false;
            }
        }

        dragImage.setAttribute('x', ev.offsetX);
        dragImage.setAttribute('y', ev.offsetY);
    }
}

function determineDestinationElement(ev) {
    // Implement logic to determine if the dragged object is over a valid destination element
    // Example: Check if ev.target is a valid drop zone
    var dropzone = document.getElementById('validDropzoneId');
    if (dropzone && dropzone.contains(ev.target)) {
        return dropzone;
    }
    return null;
}

function objectCloneDrop(ev, dropzone) {
    if (isDragging) {
        var objectReplica = objectToClone.cloneNode(true);

        // Snap to grid
        var snappedPosition = snapToGrid(ev.pageX, ev.pageY);
        objectReplica.setAttribute('x', snappedPosition.x);
        objectReplica.setAttribute('y', snappedPosition.y);

        objectReplica.removeAttribute('onmousedown');
        objectReplica.removeAttribute('onmousemove');
        objectReplica.removeAttribute('onmouseup');
        objectReplica.removeAttribute('onmouseleave');
        objectReplica.setAttribute('ontouchstart', 'enableMove(this)');
        objectReplica.setAttribute('ontouchend', 'disableMove(this)');
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

function moveObject(ev, target) {
    if (targetObject.isMoveable) {
        if (targetObject.isClickedOnce) {
            var touch = ev.changedTouches[0];
            offx = touch.pageX - targetObject.toRePosition.getAttribute('x');
            offy = touch.pageY - targetObject.toRePosition.getAttribute('y');
            targetObject.isClickedOnce = false;
        }

        var touch = ev.changedTouches[0];
        objx = (touch.pageX - offx);
        objy = (touch.pageY - offy);

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
    var gridSize = 3; // Adjust grid size as needed
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

// Event listeners for touch events
document.addEventListener('touchstart', function(event) {
    var touch = event.touches[0];
    // Implement touch start logic if needed
}, false);

document.addEventListener('touchend', function(event) {
    var touch = event.changedTouches[0];
    // Implement touch end logic if needed
}, false);

document.addEventListener('touchmove', function(event) {
    var touch = event.touches[0];
    moveObject(touch, targetObject.toRePosition);
}, false);
