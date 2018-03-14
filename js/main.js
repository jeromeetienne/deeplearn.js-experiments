const cat = document.getElementById('cat');
const resultElement = document.getElementById('result');
const canvas = document.getElementById('canvas');

var context = canvas.getContext('2d');
var width  = canvas.width;
var height = canvas.height;

const math = dl.ENV.math;
const yoloMobileNet = new yolo_mobilenet.YoloMobileNetDetection(math);

resultElement.innerText = 'Downloading weights ...';
yoloMobileNet.load().then(loadImage);

function loadImage() {
	input = document.getElementById('image');
	cat.src = input.value;
}

cat.onload = async () => {
	resultElement.innerText = 'Predicting...';
	const pixels = dl.Array3D.fromPixels(cat);
	
	var t0 = performance.now();
	const result = await yoloMobileNet.predict(pixels);
	var t1 = performance.now();
	const inferenceTime = t1 - t0
	
	var t0 = performance.now();
	const boxes = await yoloMobileNet.interpretNetout(result);
	var t1 = performance.now();
	const postProcessingTime = t1 - t0
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	
	for (i = 0; i < boxes.length; i++) {
		box = boxes[i];
		
		const x = (box.x - box.w/2) * width;
		const y = (box.y - box.h/2) * height;
		const w = box.w * width;
		const h = box.h * height;
		
		// draw the rectangle bounding box;
		context.strokeStyle = box.getColor();
		context.lineWidth = 5;
		context.rect(x,y,w,h);
		context.stroke();
		
		// draw the label and the probability
		const label = box.getLabel() + ' ' + box.getMaxProb().toFixed(2).toString();
		const font  = '24px serif';
		
		context.font = font;
		context.textBaseline = 'top';
		context.fillStyle = box.getColor();
		const textWidth = context.measureText(label).width;
		context.fillRect(x-2, y-24, textWidth, parseInt(font, 10));
		
		context.fillStyle = 'rgb(255,255,255)';
		context.fillText(label, x-2, y-24);
	}
	
	resultElement.innerText = 'Complete!, Inference time: ' +  Math.round(inferenceTime) + 'ms' +
	', Post precessing time: ' + Math.round(postProcessingTime) + 'ms';
}

// When the user clicks on the button,  toggle between hiding and showing the dropdown content
function toggleList() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
