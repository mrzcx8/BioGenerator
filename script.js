// Dapatkan elemen-elemen DOM
const nameInput = document.getElementById('name');
const profilePicInput = document.getElementById('profile-pic');
const bioInput = document.getElementById('bio');
const linksInput = document.getElementById('links');
const generateBioButton = document.getElementById('generate-bio');
const bioLinkElement = document.getElementById('bio-link');
const qrCodeCanvas = document.getElementById('qr-code');

let profilePicUrl = ''; // Untuk menyimpan URL gambar

// Fungsi untuk menukar fail gambar kepada URL Base64
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicUrl = e.target.result; // Simpan URL gambar
    };
    reader.readAsDataURL(file);
  }
}

// Fungsi untuk hasilkan URL bio dengan parameter
function generateBioPage() {
  const name = encodeURIComponent(nameInput.value.trim());
  const bio = encodeURIComponent(bioInput.value.trim());
  const links = encodeURIComponent(linksInput.value.trim());

  if (!name || !bio) {
    alert('Sila isi semua medan wajib!');
    return;
  }

  // Buat URL dengan parameter
  const bioPageUrl = `${window.location.origin}/?name=${name}&bio=${bio}&links=${links}`;
  bioLinkElement.href = bioPageUrl;
  bioLinkElement.textContent = bioPageUrl;

  // Hasilkan kod QR untuk pautan bio
  QRCode.toCanvas(qrCodeCanvas, bioPageUrl, { width: 200 }, function (error) {
    if (error) {
      console.error('Ralat:', error);
      alert('Gagal menghasilkan kod QR.');
    }
  });
}

// Tambah event listener untuk upload gambar
profilePicInput.addEventListener('change', handleImageUpload);

// Tambah event listener untuk butang "Hasilkan Link Bio"
generateBioButton.addEventListener('click', generateBioPage);