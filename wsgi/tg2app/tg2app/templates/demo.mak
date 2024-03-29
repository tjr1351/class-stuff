﻿<%inherit file="local:templates.master"/>

<%def name="title()">Programming Assignment 1 - Building Demo</%def>

<%def name="meta()">
		<meta charset="UTF-8" />
		
		<!-- We'll take care of the zoom ourselves -->
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

		<!-- iPhone icon + chromeless browser -->
		<meta name="apple-mobile-web-app-capable" content="yes" />

		<!-- iPhone homescreen icon -->
		<link rel="apple-touch-icon" href="images/touristResortIcon.png" /> 
		<link rel="apple-touch-icon-precomposed" href="images/touristResortIcon.png"/>

		<!-- Chrome Frame -->
		<meta http-equiv="X-UA-Compatible" content="chrome=1" />
		
		<script type="text/javascript" src="js/jquery.js" charset="utf-8"></script>
		<script type="text/javascript" src="js/mousewheel/jquery.mousewheel.js" charset="utf-8"></script>
		<link rel="stylesheet" href="css/ui-style.css" charset="utf-8"/>
		<script type="text/javascript" src="js/UIFunctions.js"charset="utf-8" ></script>
		<script type="text/javascript" src="js/modernizr-1.7.min.js" charset="utf-8"></script>
		<script type="text/javascript" src="js/game-ex14.js" charset="utf-8"></script>
</%def>
	<body>
		<canvas id="gameCanvas" width="1" height="1"></canvas>
		<div id="ui">
				<div id="top">
					Account Balance: <span id="balance">0</span> Coins
				</div>
				<div id="tools">
					<ul>
						<li id="select" class="active"></li>
						<li id="move"></li>
						<li id="zoomIn"></li>
						<li id="zoomOut"></li>
						<li id="rotate"></li>
						<li id="demolish"></li>
					</ul>
				</div>
				<div id="panel-container" class="hidden">
					<a href="javascript:void(0)" id="panel-toggle">Build</a>
					<div id="panel">
						<h3>Choose a building:</h3>
						<ul id="buildings">
							<li id="tree">
								<h2 id="tree">Tree</h2>
								<p id="tree">
									A small tree.
									<br />
									<span id="treecost">$0</span>
								</p>
							</li>

							<li id="icecream">
								<h2 id="icecream">Ice Cream Parlor</h2>
								<p id="icecream">
									Over 50 flavors.
									<br />
									<span id="icecreamcost">$0</span>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</div>
	</body>
