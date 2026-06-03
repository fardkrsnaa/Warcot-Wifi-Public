# Warcot Wifi Public

Website informasi WiFi publik yang sederhana dan ringan. Dibangun dengan HTML, CSS, dan JavaScript vanilla.

## Fitur

- Menampilkan informasi WiFi (SSID & Password)
- Status jaringan real-time
- Pengumuman
- Aturan penggunaan
- Last updated timestamp
- Footer dengan watermark

## Cara Penggunaan

1. Edit file `config.json` sesuai dengan informasi WiFi Anda:

```json
{
  "wifi": {
    "ssid": "Nama_WiFi_Anda",
    "password": "Password_WiFi_Anda"
  },
  "network": {
    "status": "online",
    "speed": "50 Mbps",
    "connected_users": 12
  },
  "announcement": "Pesan pengumuman Anda",
  "rules": [
    "Aturan 1",
    "Aturan 2",
    "Aturan 3"
  ],
  "last_updated": "2026-06-03"
}
```

2. Upload semua file ke hosting atau deploy ke Vercel.

## Deploy ke Vercel

1. Install Vercel CLI (opsional):
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Atau gunakan tombol "Deploy to Vercel" di GitHub repository.

## Struktur File

```
/
├── index.html      # Halaman utama
├── style.css       # Styling CSS
├── script.js       # JavaScript untuk load config
├── config.json     # File konfigurasi data
└── README.md       # Dokumentasi
```

## Teknologi

- HTML5
- CSS3 (Responsive design)
- JavaScript (ES6+)
- Fetch API

## Lisensi

Free to use.

---

Ide Web by @fardkrsna_