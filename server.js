const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for contact form (if you want to add contact functionality)
app.post('/api/contact', express.json(), (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically save to database or send email
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Pesan berhasil dikirim!' 
    });
});

// API route to get portfolio data (if you want to make it dynamic)
app.get('/api/portfolio', (req, res) => {
    const portfolioData = {
        name: "Nama Anda",
        title: "Frontend Developer",
        description: "Saya adalah seorang pengembang yang bersemangat dalam menciptakan antarmuka pengguna yang dapat diakses dan sempurna.",
        skills: [
            "JavaScript (ES6+)",
            "React",
            "Node.js",
            "TypeScript",
            "Tailwind CSS",
            "Next.js"
        ],
        experience: [
            {
                title: "Frontend Developer",
                company: "Nama Perusahaan",
                period: "2023 - Sekarang",
                description: "Mengembangkan dan memelihara aplikasi web modern menggunakan React, TypeScript, dan Tailwind CSS."
            },
            {
                title: "Junior Web Developer",
                company: "Nama Perusahaan",
                period: "2021 - 2023",
                description: "Membantu dalam pengembangan website dan aplikasi web."
            }
        ],
        hobbies: [
            {
                icon: "🎵",
                title: "Musik",
                description: "Saya suka mendengarkan berbagai genre musik dan terkadang bermain gitar untuk bersantai."
            },
            {
                icon: "📚",
                title: "Membaca",
                description: "Saya gemar membaca buku teknologi, fiksi, dan biografi untuk memperluas wawasan."
            }
        ],
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#",
            instagram: "#"
        }
    };
    
    res.json(portfolioData);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Terjadi kesalahan pada server!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Halaman tidak ditemukan!' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🌐 Buka browser dan kunjungi: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server dihentikan dengan SIGTERM');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Server dihentikan dengan SIGINT');
    process.exit(0);
});
