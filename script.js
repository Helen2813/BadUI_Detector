const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasOverlay = document.getElementById('canvas-overlay');
const ctxOverlay = canvasOverlay.getContext('2d');

let blocks = [];
let scale = 1;

upload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://127.0.0.1:5000/process_image', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    blocks = data.blocks;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        scale = Math.min(canvas.clientWidth / img.width, canvas.clientHeight / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvasOverlay.width = canvas.width;
        canvasOverlay.height = canvas.height;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        blocks.forEach(block => {
            const [x1, y1, x2, y2] = block.coordinates;
            const width = (x2 - x1) * scale;
            const height = (y2 - y1) * scale;
            
            if (width >= 10 && height >= 20) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                ctx.strokeRect(x1 * scale, y1 * scale, width, height);
            }
        });
    };
});

canvasOverlay.addEventListener('mousemove', (e) => {
    const x = e.offsetX / scale;
    const y = e.offsetY / scale;

    ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
    
    const block = blocks.find(b => {
        const [x1, y1, x2, y2] = b.coordinates;
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    });

    if (block) {
        const [x1, y1, x2, y2] = block.coordinates;
        ctxOverlay.strokeStyle = 'blue';
        ctxOverlay.lineWidth = 2;
        ctxOverlay.strokeRect(x1 * scale, y1 * scale, (x2 - x1) * scale, (y2 - y1) * scale);
    }
});
