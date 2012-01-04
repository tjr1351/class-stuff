
// Enums
var Keys = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	Z: 90,
	X: 88,
	R: 82
}

var Tools = {
	current: 4, // Default tool
	/* - */
	MOVE: 0,
	ZOOM_IN: 1,
	ZOOM_OUT: 2,
	DEMOLISH: 3,
	SELECT: 4,
	BUILD: 5
}

var Buildings = {
	current: 10, //Default
	
	TREE: 10,
	ICECREAM: 50,
}

window.onload = function () {

	var canvas = document.getElementById('gameCanvas');
	var game = document.getElementById('game');

	// Initialize the game object
	var g = new Game(canvas, game, 100, 100);

	var pointer = {
		DOWN: 'mousedown',
		UP: 'mouseup',
		MOVE: 'mousemove'
	};

	if (Modernizr.touch){
		pointer.DOWN = 'touchstart';
		pointer.UP = 'touchend';
		pointer.MOVE = 'touchmove';
	}

	// Set up the event listeners
	$(window).resize(function() {
		g.doResize();
	});
	$('#gameCanvas').mousedown(function(e) {
		g.handleMouseDown(e);
	});
	$('#gameCanvas').mousemove(function(e) {
		g.handleDrag(e);
	});
	$(document.body).mouseup(function(e) {
		g.handleMouseUp(e);
	});
	
	if (Modernizr.touch){
		// Detect gestures
		document.body.addEventListener('gestureend', function(e) { g.handleGestureEnd(e); }, false);
	} else {
		$(document.body).keydown(function(e) {
			g.handleKeyDown(e);
		});

		// Detect mousewheel scrolling
		jQuery(function($) {
			$(document.body).bind('mousewheel', function(e, delta) {
				g.handleScroll(delta);
			});
		});
		jQuery(function($) {
			$(document.body).bind('DOMMouseScroll', function(e, delta) { 
				g.handleScroll(delta); 
			});
		});
	}
	
	// Listen for GUI events
	var ui = document.getElementById('ui');
	$('#ui').mouseup(function(e) {
		var id = e.target.getAttribute('id');
		//alert(id);
		switch(id) {
			case 'panel-toggle':
				var panelContainer = document.getElementById('panel-container');
				var classes = panelContainer.getAttribute('class');

				if (classes != null && classes.length > 0) {
					panelContainer.setAttribute('class', '');
					document.getElementById('panel-toggle').innerHTML = 'Cancel';
				} else {
					panelContainer.setAttribute('class', 'hidden');
					document.getElementById('panel-toggle').innerHTML = 'Build';
				}
				break;
			case 'select':
				selectTool(Tools.SELECT, document.getElementById('select'));
				break;
			case 'move':
				selectTool(Tools.MOVE, document.getElementById('move'));
				break;
			case 'zoomIn':
				selectTool(Tools.ZOOM_IN, document.getElementById('zoomIn'));
				break;
			case 'zoomOut':
				selectTool(Tools.ZOOM_OUT, document.getElementById('zoomOut'));
				break;
			case 'rotate':
				g.rotateGrid();
				g.draw();
				break;
			case 'demolish':
				selectTool(Tools.DEMOLISH, document.getElementById('demolish'));
				break;
			case 'tree':
				selectTool(Tools.BUILD, document.getElementById('tree'));
				selectBuilding('tree');
				break;
			case 'icecream':
				selectTool(Tools.BUILD, document.getElementById('icecream'));
				selectBuilding('icecream');
				break;
			default:
			
				// He didn't click on any option and actually click on an empty section of the UI, fallback to the canvas.
				e.srcElement = canvas;
				e.target = canvas;
				e.toElement = canvas;

				g.handleMouseDown(e);

				break;
		}
	});
}

function selectTool(tool, elem) {

	// Remove the "active" class from any element inside the div#tools ul
	for (var i = 0, x = elem.parentNode.childNodes.length; i < x; i++) {
		if (elem.parentNode.childNodes[i].tagName == "LI") {
			elem.parentNode.childNodes[i].className = null;
		}
	}
		
	elem.className += "active";

	switch(tool) {
		case Tools.BUILD:
			Tools.current = Tools.BUILD;
			break;
		case Tools.SELECT:
			Tools.current = Tools.SELECT;
			break;
		case Tools.MOVE:
			Tools.current = Tools.MOVE;
			break;
		case Tools.ZOOM_IN:
			Tools.current = Tools.ZOOM_IN;
			break;
		case Tools.ZOOM_OUT:
			Tools.current = Tools.ZOOM_OUT;
			break;
		case Tools.DEMOLISH:
			Tools.current = Tools.DEMOLISH;
			break;
	}

	if (Tools.current == Tools.BUILD) {
		//unselect other tools
		var t = document.getElementById('select');
		for (var i = 0, x = t.parentNode.childNodes.length; i < x; i++) {
			if (t.parentNode.childNodes[i].tagName == "LI") {
				t.parentNode.childNodes[i].className = null;
			}
		}
	}
}


	function selectBuilding(id) {

		switch (id) {
			case 'tree':
				Buildings.current = Buildings.TREE;
				//g.building = new Building(id);
				break;
			case 'icecream':
				Buildings.current = Buildings.ICECREAM;
				//g.building = new Building(id);
				break;
			default:
				break;
		}
	}
