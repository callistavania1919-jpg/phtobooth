const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const filterBtn = document.getElementById('filterBtn');
const stickerBtn = document.getElementById('stickerBtn');
const frameBtn = document.getElementById('frameBtn');
const downloadBtn = document.getElementById('downloadBtn');
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const context = canvas.getContext('2d');

let stream = null;
let currentFilter = 'none';
let stickerIndex = 0;
let frameColor = '#ffb6c1';

const filters = [
  'none',
  'grayscale(1)',
  'sepia(1)',
  'contrast(1.5)',
  'brightness(1.3)',
  'hue-rotate(45deg)'
];

const stickers = ['💖', '🌈', '✨', '😎', '🌸', '💫'];
const frames = ['#ffb6c1', '#a6c1ee', '#fbc2eb', '#ffd6a5', '#bde0fe'];

// 🔹 Nyalakan kamera
startBtn.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    captureBtn.disabled = false;
    filterBtn.disabled = false;
    stickerBtn.disabled = false;
    frameBtn.disabled = false;
  } catch (err) {
    alert('Kamera tidak bisa diakses 😢. Coba izinkan akses kamera.');
  }
});

// 🔹 Ganti filter
filterBtn.addEventListener('click', () => {
  const currentIndex = filters.indexOf(currentFilter);
  const nextIndex = (currentIndex + 1) % filters.length;
  currentFilter = filters[nextIndex];
  video.style.filter = currentFilter;
});

// 🔹 Ganti warna bingkai
frameBtn.addEventListener('click', () => {
  const frame = document.querySelector('.frame');
  const nextColor = frames[Math.floor(Math.random() * frames.length)];
  frame.style.borderColor = nextColor;
  frameColor = nextColor;
});

// 🔹 Ambil foto
captureBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.filter = currentFilter;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Tambahkan bingkai
  context.lineWidth = 50;
  context.strokeStyle = frameColor;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  photo.src = imageData;
  downloadBtn.disabled = false;
});

// 🔹 Tambah stiker lucu
stickerBtn.addEventListener('click', () => {
  const sticker = stickers[stickerIndex];
  stickerIndex = (stickerIndex + 1) % stickers.length;

  context.font = '80px Arial';
  context.fillText(sticker, 50, 100);
  const imageData = canvas.toDataURL('image/png');
  photo.src = imageData;
  downloadBtn.disabled = false;
});

// 🔹 Download hasil foto
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'pixbooth-foto.png';
  link.href = photo.src;
  link.click();
});
