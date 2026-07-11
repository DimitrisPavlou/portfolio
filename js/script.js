// ===== PROJECT DATA =====
// Featured projects (highlighted on the CV) are listed first.
const projects = [
    {
        id: "medical-imaging",
        title: "Computer Vision - Medical Imaging",
        description: "Trained and benchmarked CNN, ResNet-18, and Vision Transformer architectures for classifying medical tissue scans, pushing AUC scores past publicly reported benchmarks on TissueMNIST2D through targeted transfer learning.",
        tech: "PyTorch, ResNets, Vision Transformers",
        github: "https://github.com/DimitrisPavlou/TissueMNIST2D-Classification-CNN-ResNet18-Vision-Transformer-Transfer-Learning",
        markdown: "projects/medical_imaging.md",
        featured: true
    },
    {
        id: "tensor-library",
        title: "tl — Tensor Library",
        description: "A from-scratch, header-only C++20 tensor library built as a NumPy/PyTorch-style numerical core: stride-based views, broadcasting, batched GEMM, reverse-mode autograd and RK4 ODE solvers — validated by 272 unit tests and benchmarked at ~187 GFLOP/s with OpenMP.",
        tech: "C++20, Templates, Autograd",
        github: "https://github.com/DimitrisPavlou/tl",
        markdown: "projects/tensor_library.md",
        featured: true
    },
    {
        id: "helios-rl",
        title: "Helios RL",
        description: "A Reinforcement Learning library of custom agents with a clean, documented API for solving Gymnasium and custom environments, paired with a rule-extraction pipeline that distills trained policies into interpretable decision models.",
        tech: "PyTorch, Gymnasium, Explainable AI",
        github: null,
        markdown: "projects/helios_rl.md",
        featured: true
    },
    {
        id: "optimkit",
        title: "OptimKit",
        description: "A custom optimization toolkit designed for engineering problems, implementing various gradient-based and heuristic algorithms.",
        tech: "NumPy, SciPy, Optimization Theory",
        github: "https://github.com/DimitrisPavlou/OptimKit",
        markdown: "projects/optimkit.md"
    },
    {
        id: "grid-world",
        title: "Grid-World RL",
        description: "A fundamental implementation of Q-Learning and Policy Iteration to solve pathfinding tasks in a controlled grid environment.",
        tech: "Stable Baselines, PyTorch, RL",
        github: "https://github.com/DimitrisPavlou/Grid-World-RL-Project",
        markdown: "projects/gridworld.md"
    },
    {
        id: "mlp-numpy",
        title: "MLP in Python",
        description: "Built a Multi-Layer Perceptron from scratch using only NumPy to demonstrate a deep understanding of backpropagation and weight updates.",
        tech: "NumPy, Python",
        github: "https://github.com/DimitrisPavlou/Python-Implementation-of-an-MLP",
        markdown: "projects/mlp.md"
    },
    {
        id: "dip_suite",
        title: "Digital Image Processing Suite",
        description: "Developed a modular Python library implementing fundamental Digital Image Processing algorithms from first principles.",
        tech: "NumPy, Python, OpenCV",
        github: "https://github.com/DimitrisPavlou/Digital-Image-Processing-Project",
        markdown: "projects/dip_suite.md"
    },
    {
        id: "system_modeling",
        title: "Modeling-and-Simulation-of-Dynamical-Systems",
        description: "A three part poject about adaptive control and system identification for a Dynamical Systems",
        tech: "Matlab",
        github: "https://github.com/DimitrisPavlou/Modeling-and-Simulation-of-Dynamical-Systems",
        markdown: "projects/modeling.md"
    },
];

// ===== THEME MANAGEMENT =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
}

function updateThemeIcons(theme) {
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    
    if (theme === 'dark') {
        lightIcon.classList.remove('active');
        darkIcon.classList.add('active');
    } else {
        lightIcon.classList.add('active');
        darkIcon.classList.remove('active');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// ===== RENDER PROJECTS ON INDEX PAGE =====
function renderProjects() {
    const container = document.getElementById('project-container');
    if (!container) return;

    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = project.featured ? 'project-card featured' : 'project-card';

        // Buttons removed from here as requested
        card.innerHTML = `
            ${project.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> From my CV</span>' : ''}
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.tech.split(', ').map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => {
            navigateToProject(project.id);
        });
        
        container.appendChild(card);
    });
}


// ===== NAVIGATION =====
function navigateToProject(projectId) {
    // Store project ID in sessionStorage for the detail page
    sessionStorage.setItem('currentProject', projectId);
    // Navigate to project detail page
    window.location.href = 'project.html';
}

// ===== LOAD PROJECT DETAILS =====
async function loadProjectDetails() {
    const projectId = sessionStorage.getItem('currentProject');
    if (!projectId) {
        window.location.href = 'index.html';
        return;
    }

    const project = projects.find(p => p.id === projectId);
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${project.title} - Portfolio`;
    document.getElementById('project-title').textContent = project.title;
    
    const techContainer = document.getElementById('project-tech');
    techContainer.innerHTML = project.tech.split(', ')
        .map(t => `<span class="tag">${t}</span>`)
        .join('');

    // Update GitHub link and ensure it is ready for clicks
    const githubLink = document.getElementById('github-link');
    if (project.github) {
        githubLink.href = project.github;
        // We force the target and rel here just in case
        githubLink.setAttribute('target', '_blank');
        githubLink.setAttribute('rel', 'noopener noreferrer');
        githubLink.style.display = '';
    } else {
        githubLink.style.display = 'none';
    }

    await loadMarkdownContent(project.markdown);
}

// ===== LOAD MARKDOWN FROM FILE =====
async function loadMarkdownContent(markdownPath) {
    const contentDiv = document.getElementById('project-content');
    
    try {
        const response = await fetch(markdownPath);
        
        if (!response.ok) {
            throw new Error('Markdown file not found');
        }
        
        const markdownText = await response.text();
        
        // Convert markdown to HTML using marked.js
        const htmlContent = marked.parse(markdownText);
        contentDiv.innerHTML = htmlContent;
        
    } catch (error) {
        console.error('Error loading markdown:', error);
        contentDiv.innerHTML = `
            <div class="content-error">
                <h3><i class="fas fa-exclamation-triangle"></i> Content Not Available</h3>
                <p>The project documentation is currently unavailable. Please visit the GitHub repository for more information.</p>
            </div>
        `;
    }
}

// ===== CONTACT MODAL =====
function setupContactModal() {
    const modal = document.getElementById('contact-modal');
    const btn = document.getElementById('contact-btn');
    const span = document.getElementsByClassName('close')[0];

    if (btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        }
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // FIX: If the link is the GitHub button or an external link, 
            // do NOT prevent default behavior
            if (href === '#' || this.id === 'contact-btn' || this.id === 'github-link') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme before anything else
    initTheme();
    
    // Setup common features
    setupThemeToggle();
    setupContactModal();
    setupNavbarScroll();
    setupSmoothScroll();
    
    // Check which page we're on
    const isProjectPage = document.getElementById('project-content') !== null;
    
    if (isProjectPage) {
        // Project detail page
        loadProjectDetails();
    } else {
        // Index page
        renderProjects();
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});