function draw() {
    // Get the canvas element
    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');
    
    // Get input values
    const altura1 = parseInt(document.getElementById('b1').value);
    const altura2 = parseInt(document.getElementById('b2').value);
    const altura3 = parseInt(document.getElementById('b3').value);
    const altura4 = parseInt(document.getElementById('b4').value);
    const altura5 = parseInt(document.getElementById('b5').value);
    const largura = parseInt(document.getElementById('larg').value);
    
    // Clear previous canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set bar color
    ctx.fillStyle = 'red';

    // Draw the bars
    ctx.fillRect(50, 300 - altura1, largura, altura1);  // Bar 1
    ctx.fillRect(120, 300 - altura2, largura, altura2); // Bar 2
    ctx.fillRect(190, 300 - altura3, largura, altura3); // Bar 3
    ctx.fillRect(260, 300 - altura4, largura, altura4); // Bar 4
    ctx.fillRect(330, 300 - altura5, largura, altura5); // Bar 5
}
